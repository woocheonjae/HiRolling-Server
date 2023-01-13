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
import { UserInputDTO } from "@/interfaces/User";

// ? routes에선 model 안쓰이는데 뺄까요??
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

      return res.status(201).json({ result: true });
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
          await personalServiceInstance.getPersonalRollingPaper(
            req.params as PersonalRollingPaperInputDTO,
          );

        // 포스트 전부 조회
        const { personalPosts } = await personalServiceInstance.getAllPersonalPosts(
          req.params as PersonalRollingPaperInputDTO,
        );
        return res
          .status(200)
          .json({ title: personalRollingPaper.title, posts: personalPosts });
      },
    ),
  );

  // 개인 롤링페이퍼 수정
  // TODO

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

  // 개인 롤링페이퍼 목록 조회
  route.get(
    "/papers/list/:userId",
    asyncHandler(async (req: Request<UserInputDTO>, res: Response) => {
        logger.debug(req.params);

        // 비즈니스 로직을 처리할 service객체 받아오기
        const personalServiceInstance = Container.get(PersonalService);

        const { personalRollingPapers } = await personalServiceInstance.getListPersonalRollingPaper(
          req.params as UserInputDTO,
        );

        return res.status(200).json({ result: personalRollingPapers });
      }),
  );

  // 개인 롤링페이퍼 포스트 디테일 조회
  route.get(
    "/posts/:personalPostId",

    asyncHandler(async (req: Request<PersonalPostInputDTO>, res: Response) => {
      logger.debug(req.params);
      const personalServiceInstance = Container.get(PersonalService);
      const { personalPost } = await personalServiceInstance.getDetailPost(
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
      const { personalPost } = await personalServiceInstance.createPersonalPost(
        req.body as PersonalPostDTO,
      );

      return res.status(201).json({ result: personalPost });
    }),
  );

  // ? 수정 화면에서는 전에 포스트 정보 불러오기인데 그건 url 뭐일까여? 
  // 개인 포스트 수정
  route.put(
    "/posts",
    asyncHandler(async (req: Request, res: Response) => {
      logger.debug(req.body);
      const personalServiceInstance = Container.get(PersonalService);
      const { personalPost } = await personalServiceInstance.updatePersonalPost(
        req.body as PersonalPostInputDTO,
        req.body as PersonalPostDTO,
      );
      // ! 수정한 후 디테일 뷰로 이동!
      // 수정한 포스트 결과
      return res.status(201).json({ result: personalPost });
    }),
  );

  // 개인 포스트 삭제
  route.delete(
    "/posts",
    asyncHandler(async (req: Request, res: Response) => {
      logger.debug(req.body);
      const personalServiceInstance = Container.get(PersonalService);
      const { personalPost } = await personalServiceInstance.deletePersonalPost(
        req.body as PersonalPostInputDTO,
      );
      // 수정한 포스트 결과
      return res.status(200).json({ result: personalPost });
    }),
  );
};
