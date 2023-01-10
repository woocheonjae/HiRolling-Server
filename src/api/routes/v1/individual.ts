// TODO: isLoggedIn 미들웨어 설정
import asyncHandler from "@/api/middlewares/asyncHandler";
import {
  PersonalPostInputDTO,
  PersonalPostDTO,
} from "@/interfaces/PersonalPost";
import {
  PersonalRollingPaperInputDTO,
  PersonalRollingPaperDTO,
} from "@/interfaces/PersonalRollingPaper";
import PersonalPost from "@/models/personalPost";
import PersonalRollingPaper from "@/models/personalRollingPaper";
import PersonalService from "@/services/individual";
import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import logger from "winston";

const route = Router();

export default (app: Router) => {
  app.use("/individual", route);

  // 개인 롤링페이퍼 생성
  route.post(
    "/papers",
    //isLoggedIn,
    asyncHandler(async (req: Request, res: Response) => {
      logger.debug(req.body);

      // 비즈니스 로직을 처리할 service객체 받아오기
      const personalServiceInstance = Container.get(PersonalService);

      // service에 req.body를 넘겨주고 생성
      const { personalRollingPaper } =
        await personalServiceInstance.createPersonalRollingPaper(
          req.body as PersonalRollingPaperDTO,
        );

      return res.status(201).json({ result: personalRollingPaper });      
    }),
  );

  // TODO: isLoggedIn 미들웨어 만들어지면 모든 api에 isLoggedIn 추가하기
  // 개인 롤링페이퍼 조회
  route.get(
    "/papers/:paperId",
    asyncHandler(
      async (req: Request<PersonalRollingPaperInputDTO>, res: Response) => {
        logger.debug(req.params);

        // 비즈니스 로직을 처리할 service객체 받아오기
        const personalServiceInstance = Container.get(PersonalService);

        // 페이퍼 정보 조회
        const { personalRollingPaper } =
          await personalServiceInstance.viewPersonalRollingPaper(
            req.params as PersonalRollingPaperInputDTO,
          );

        // 포스트 전부 조회
        const { personalPosts } = await personalServiceInstance.viewAllPosts(
          req.params as PersonalRollingPaperInputDTO,
        );
        return res
          .status(200)
          .json({ title: personalRollingPaper.title, posts: personalPosts });
      },
    ),
  );

  // 개인 롤링페이퍼 수정

  // 개인 롤링페이퍼 삭제
  route.delete(
    "/papers/:paperId", 
    asyncHandler(
      async (req: Request<PersonalRollingPaperInputDTO>, res: Response) => {
        logger.debug(req.params);

        // 비즈니스 로직을 처리할 service객체 받아오기
        const personalServiceInstance = Container.get(PersonalService);

        personalServiceInstance.deletePersonalRollingPaper(
          req.params as PersonalRollingPaperInputDTO,
        );

        return res
          .status(200)
          .json({ result: "personal rolling paper deleted" });
      },
    ),
  );

  // !GET, req 참고하세요!
  // 개인 롤링페이퍼 포스트 디테일 조회
  route.get(
    "/posts/:postid",

    asyncHandler(async (req: Request<PersonalPostInputDTO>, res: Response) => {
      logger.debug(req.params);
      const personalServiceInstance = Container.get(PersonalService);
      const { personalPost } = await personalServiceInstance.viewDetailPost(
        req.params as PersonalPostInputDTO,
      );
      return res.status(200).json({ result: personalPost });
    }),
  );

  // 개인 롤링페이퍼 포스트 생성
  route.post(
    "/posts",
    asyncHandler(async (req: Request, res: Response) => {
      logger.debug(req.body);
      const personalServiceInstance = Container.get(PersonalService);
      const { personalPost } = await personalServiceInstance.createPost(
        req.body as PersonalPostDTO,
      );

      return res.status(201).json({ result: personalPost });
    }),
  );
};
