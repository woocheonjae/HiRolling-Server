import { Request, Response, Router, NextFunction } from "express";
import passport from "passport";
import { Container } from "typedi";
import { Logger } from "winston";

import asyncHandler from "@/api/middlewares/asyncHandler";
import {
  verifyAccessToken,
  isLoggedIn,
  isNotLoggedIn,
} from "@/api/middlewares/authMiddleware";
import { UserInputDTO } from "@/interfaces/User";
import AuthService from "@/services/auth";

const route = Router();

export default (app: Router) => {
  const logger: Logger = Container.get("logger");
  app.use("/auth", route);

  route.post(
    "/kakaotest",
    verifyAccessToken,
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      logger.debug(req.body);
      console.log("🚀 ~ file: auth.ts:17 ~ asyncHandler ~ body", req.body);

      const authServiceInstance = Container.get(AuthService);
      const { user } = await authServiceInstance.test(req.body as UserInputDTO);

      return res.status(201).json({ result: user });
    }),
  );

  /**
   ** 로그아웃 처리
   *
   * TODO: DB에서 refresh token 삭제
   */
  route.get(
    "/logout",
    verifyAccessToken,
    asyncHandler(async (req: Request, res: Response) => {
      res.cookie("refreshToken", "", {
        maxAge: 0,
      });
      return res.status(200).json({
        success: true,
      });
    }),
  );

  // 카카오 로그인 페이지
  route.get(
    "/kakao",
    passport.authenticate("kakao", { session: false, failureRedirect: "/" }),
  );

  // 카카오 로그인 리다이렉트 URI
  route.get(
    "/kakao/callback",
    passport.authenticate("kakao", { session: false, failureRedirect: "/" }),
    asyncHandler(async (req: Request, res: Response) => {
      const user = req.user;

      const authServiceInstance = Container.get(AuthService);
      const { token } = await authServiceInstance.createJwt(user);
      logger.debug({ label: "JWT", message: token });

      res.cookie("refreshToken", token.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 14 * 24 * 60 * 60 * 1000, // 14 day
      });

      return res
        .status(200)
        .json({ success: true, accessToken: token.accessToken });
    }),
  );
};
