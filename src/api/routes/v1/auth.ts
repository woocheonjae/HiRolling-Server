import asyncHandler from "@/api/middlewares/asyncHandler";
import { Request, Response, Router, NextFunction } from "express";
import logger from "winston";
import AuthService from "@/services/auth";
import { Container } from "typedi";
import { UserInputDTO } from "@/interfaces/User";

const route = Router();

export default (app: Router) => {
  app.use("/auth", route);

  route.post(
    "/kakaotest",
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      logger.debug(req.body);
      console.log("🚀 ~ file: auth.ts:17 ~ asyncHandler ~ body", req.body);

      const authServiceInstance = Container.get(AuthService);
      const { user } = await authServiceInstance.test(req.body as UserInputDTO);

      return res.status(201).json({ result: user });
    }),
  );
  
  route.get(
    "/kakao",
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      logger.debug(req.body);

      return res.status(200).json({ test: "good" });
    }),
  );
};
