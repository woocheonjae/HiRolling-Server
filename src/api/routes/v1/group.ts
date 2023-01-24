// TODO: isLoggedIn 미들웨어 설정
import asyncHandler from "@/api/middlewares/asyncHandler";
import {
  GroupPostDTO,

  GroupPostInputDTO,
  GroupPostEmojiDTO,

} from "@/interfaces/GroupPost";

import GroupService from "@/services/group";
import { Router, Request, Response} from "express";
import { Container } from "typedi";
import logger from "winston";

const route = Router();

export default (app: Router) => {
  app.use("/groups", route);

  // 개인 롤링페이퍼 포스트 생성
  route.post(
    "/posts",
    asyncHandler(async (req: Request, res: Response) => {
      logger.debug(req.body);
      const groupServiceInstance = Container.get(GroupService);
      const { groupPost } = await groupServiceInstance.createGroupPost(
        req.body as GroupPostDTO,
      );

      return res.status(201).json({ result: groupPost });
    }),
  );

  // 그룹 롤링페이퍼 포스트 디테일 조회
  route.get(
    "/posts/:groupPostId",

    asyncHandler(async (req: Request<GroupPostInputDTO>, res: Response) => {
      logger.debug(req.params);
      const groupServiceInstance = Container.get(GroupService);
      const { groupPostDetail} = await groupServiceInstance.getDetailGroupPost(
        req.params as GroupPostInputDTO,
      );
      return res.status(200).json({ result: groupPostDetail});
    }),
  );

  // 그룹 포스트 수정
  route.put(
    "/posts",
    asyncHandler(async (req: Request, res: Response) => {
      logger.debug(req.body);
      const groupServiceInstance = Container.get(GroupService);

      const { groupUpdatedPostResult} = await groupServiceInstance.updateGroupPost(
        req.body as GroupPostInputDTO,
        req.body as GroupPostDTO,
      );
       // 포스트 수정을 성공했다면 디테일 뷰 
      const { groupPostDetail} = await groupServiceInstance.getDetailGroupPost(
        req.body as GroupPostInputDTO,
      );
      // 수정한 포스트 결과
      return res.status(201).json({ result: groupUpdatedPostResult, post: groupPostDetail});

    }),
  );

  // 그룹 포스트 삭제
  route.delete(
    "/posts",
    asyncHandler(async (req: Request, res: Response) => {
      logger.debug(req.body);
      const groupServiceInstance = Container.get(GroupService);
      const { groupDeletedPostResult } = await groupServiceInstance.deleteGroupPost(
        req.body as GroupPostInputDTO,
      );
      // 삭제한 포스트 결과
      return res.status(200).json({ result: groupDeletedPostResult });
    }),
  );

  // 그룹 포스트 이모지 수정
  route.put(
    "/posts/emoji",
    asyncHandler(async (req: Request, res: Response) => {
      logger.debug(req.body);
      const groupServiceInstance = Container.get(GroupService);
      const { groupUpdatedEmojiResult} = await groupServiceInstance.updateEmojiForPost(
        req.body as GroupPostInputDTO,
        req.body as   GroupPostEmojiDTO,
      );

      // 이모지 수정을 성공했다면 디테일 뷰 
      const { groupPostDetail} = await groupServiceInstance.getDetailGroupPost(
        req.body as GroupPostInputDTO,
      );

      // ! 수정한 후 디테일 뷰로 이동!
      // 수정한 포스트 결과
      return res.status(201).json({ result: groupUpdatedEmojiResult , post: groupPostDetail});
    }),
  );

};
