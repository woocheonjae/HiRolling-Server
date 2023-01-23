import { Model } from "sequelize-typescript";
import { Service, Inject } from "typedi";

import config from "@/config/config";

import {
  GroupPost,
  GroupPostInputDTO,
  GroupPostDTO,
  GroupPostEmojiDTO,
} from "@/interfaces/GroupPost";
import { group } from "console";


@Service()
export default class GroupService {
  constructor(
    @Inject("groupPostModel") private groupPostModel,
    @Inject("logger") private logger,
  ) {}

  

  // ! 페이퍼 주인은 안돼, 그룹원인지는 해당 그룹롤링페이퍼에 들어왔을 때 확인
  // 포스트 생성해주는 함수
  public async createGroupPost(
    groupPostDTO: GroupPostDTO,
  ): Promise<{ groupPost: GroupPost }> {
    try {
      const groupPost = await this.groupPostModel.create(groupPostDTO);

      if (!groupPost) {
        throw new Error("Unable to create post");
      }

      return { groupPost };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

   // 포스트 아이디(UUID)를 DB에서 찾은 후 JSON으로 전달해주는 함수
  public async getDetailGroupPost(
    groupPostInputDTO: GroupPostInputDTO,
  ): Promise<{ groupPostDetail : GroupPost }> {
    try {
      const groupPostId = groupPostInputDTO.groupPostId;
      const groupPostDetail = await this.groupPostModel.findOne({
        where: { group_post_id: groupPostId },
      });

      if (!groupPostDetail) {
        throw new Error("Post does not exist");
      }

      return { groupPostDetail};
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  //  롤링페이퍼 작성자만 가능 
  // 포스트 수정 함수
  public async updateGroupPost(
    groupPostInputDTO: GroupPostInputDTO,
    groupPostDTO: GroupPostDTO,
  ): Promise<{ groupUpdatedPostResult: GroupPost }> {
    try {
      const groupPostId = groupPostInputDTO.groupPostId;

     // ! 수정한 사람 누구인지 확인 로직 필요, 비로그인 유저면 비밀번호 확인해줘야해! 
     // 이건 로그인 회원
      const groupUpdatedPostResult= await this.groupPostModel.update(
        {
          content:groupPostDTO.content,
          post_color:groupPostDTO.postColor,
          anonymous_type: groupPostDTO.anonymousType,
        },
        { where:  { group_post_id: groupPostId } },
      );
      // 비로그인 회원은 필요한 거- 비밀번호 확인

      if (groupUpdatedPostResult[0]===0) {
        throw new Error("Unable to update post");
      }

      return { groupUpdatedPostResult };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
  
  // ! 삭제- 유저, 작성자 확인
  public async deleteGroupPost(
    groupPostInputDTO: GroupPostInputDTO,
  ): Promise<{groupDeletedPostResult: GroupPost }> {
    try {
      const groupPostId = groupPostInputDTO.groupPostId;

      const groupDeletedPostResult= await this.groupPostModel.destroy({
        where: { group_post_id: groupPostId},
      });

      if (!groupDeletedPostResult) {
        throw new Error("Unable to delete post");
      }

      return { groupDeletedPostResult };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

// TODO: 롤링페이퍼 주인만 이모지 수정 가능! 
  public async updateEmojiForPost(
    groupPostInputDTO: GroupPostInputDTO,
    groupPostEmojiDTO: GroupPostEmojiDTO,
  ): Promise<{ groupUpdatedEmojiResult: GroupPost}> {
    try {
      const groupPostId = groupPostInputDTO.groupPostId;

      const groupUpdatedEmojiResult= await this.groupPostModel.update(
        {
          emoji_type : groupPostEmojiDTO.emojiType,
        },
        { where:  { group_post_id: groupPostId } },
      );
      
      if (groupUpdatedEmojiResult[0]=== 0) {
        throw new Error("Unable to update emoji for a post");
      }

      return { groupUpdatedEmojiResult};
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
