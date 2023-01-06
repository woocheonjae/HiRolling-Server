// TODO: isLoggedIn 미들웨어 설정
import asyncHandler from "@/api/middlewares/asyncHandler";
import { Router, Request, Response, NextFunction } from "express";
import logger from "winston";
import PersonalPost from "@/models/personalPost";
import PersonalRollingPaper from "@/models/personalRollingPaper";

import PersonalService from "@/services/individual";
import { Container } from "typedi";
import { PersonalPostInputDTO } from "@/interfaces/PersonalPost";
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
    })
  );

  // TODO: 의존성 주입
  // 개인 롤링페이퍼 조회
  route.get(
    "/papers/:paperId",
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      logger.debug(req.body);
      const paperId = req.params.paperId;
      // 페이퍼 정보 조회
      const paper = await PersonalRollingPaper.findOne({
        where: {
          personal_rolling_paper_id: paperId,
        },
      });
      // 포스트 전부 조회
      const posts = await PersonalPost.findAll({
        where: {
          personal_rolling_paper_id: paperId,
        },
      });
      return res.status(200).json(posts);
    })
  );

  // ! GET, req 참고하세요!
  // 개인 롤링포스트 디테일 조회
  route.get(
    "/posts/:postid",
    asyncHandler(async (req: Request<PersonalPostInputDTO>, res: Response, next: NextFunction) => {
      logger.debug(req.params);
      const personalServiceInstance = Container.get(PersonalService);
      const { personalPost } = await personalServiceInstance.viewDetailPost(
        req.params as PersonalPostInputDTO
      );

      return res.status(201).json({ result: personalPost });
    })
  );

  // TODO: 의존성 주입
  // 개인 롤링페이퍼 포스트 생성
  route.post(
    "/posts",
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      logger.debug(req.body);
      const post = await PersonalPost.create({
        personal_rolling_paper_id: req.body.pageId,
        content: req.body.content,
        img: req.body.url,
        post_color: req.body.postColor,
        // Optional
        //userId:req.user.id,
        user_id: req.body.id,
        anonymous_type: req.body.anonymousType,
        non_member_password: req.body.password,
      });
      // 페이퍼 페이지로 이동
      res.redirect("/papers/" + req.body.pageId);

      return res.status(201).json({ result: true });
    })
  );


};
