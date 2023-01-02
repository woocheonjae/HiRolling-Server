// TODO: isLoggedIn 미들웨어 설정
import asyncHandler from "@/api/middlewares/asyncHandler";
import { Router, Request, Response, NextFunction } from "express";
import logger from "winston";

const route = Router();

export default (app: Router) => {
  app.use("/individual", route);

  // 개인 롤링페이퍼 생성
  route.post(
    "/papers",
    //isLoggedIn,
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      logger.debug(req.body);

      // 비즈니스 로직을 처리할 service에 req.body를 넘겨주기
      //const paperDTO = req.body;
      //const { paper } = await PersonalRollingPaperService.Signup(paperDTO); // TODO: PersonalRollingPaperService 만들기

      return res.status(201).json({ result: true });
    }),
  );

  // 여기부터 필요한 라우터들 작성 하면 됩니다.
};
