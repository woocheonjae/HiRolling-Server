import asyncHandler from "../../middlewares/asyncHandler.js";
// TODO isLoggedIn 미들웨어 설정
//import { PersonalRollingPaper } from "../../models";
import { Router } from "express";
import logger from "winston";

const router = Router();

const individual = (app) => {
  app.use("/individual", router);

  // 개인 롤링페이퍼 생성
  router.post(
    "/papers",
    //isLoggedIn,
    asyncHandler(async (req, res) => {
      logger.debug(req.body);

      // 비즈니스 로직을 처리할 service에 req.body를 넘겨주기
      //const paperDTO = req.body;
      //const { paper } = await PersonalRollingPaperService.Signup(paperDTO); // TODO: PersonalRollingPaperService 만들기

      res.status(201).json({ result: true });
    })
  );

  // 여기부터 필요한 라우터들 작성 하면 됩니다.
};

export default individual;
