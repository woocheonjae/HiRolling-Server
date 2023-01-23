import { Service, Inject } from "typedi";

import config from "@/config/config";
import {
  PersonalRollingPaper,
  PersonalRollingPaperInputDTO,
  PersonalRollingPaperDTO,
} from "@/interfaces/PersonalRollingPaper";

import {
  PersonalPost,
  PersonalPostInputDTO,
  PersonalPostDTO,
  PersonalPostEmojiDTO,
} from "@/interfaces/PersonalPost";

import {
  UserInputDTO,
} from "@/interfaces/User";

@Service()
export default class PersonalService {
  constructor(
    @Inject("personalRollingPaperModel") private personalRollingPaperModel,
    @Inject("personalPostModel") private personalPostModel,
    @Inject("logger") private logger,
  ) {}

  // 개인 롤링페이퍼 생성해주는 함수
  public async createPersonalRollingPaper(
    personalRollingPaperDTO: PersonalRollingPaperDTO,
  ): Promise<{ personalRollingPaper: PersonalRollingPaper }> {
    try {
      const personalRollingPaper = await this.personalRollingPaperModel.create(
        personalRollingPaperDTO,
      );

      if (!personalRollingPaper) {
        throw new Error("Unable to create rolling paper");
      }

      return { personalRollingPaper };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // 개인 롤링페이퍼 조회해주는 함수
  // 롤링페이퍼 id로 찾는다.
  public async getPersonalRollingPaper(
    personalRollingPaperInputDTO: PersonalRollingPaperInputDTO,
  ): Promise<{ personalRollingPaper: PersonalRollingPaper }> {
    try {
      const personalRollingPaperId =
        personalRollingPaperInputDTO.paperId;

      const personalRollingPaper = await this.personalRollingPaperModel.findOne(
        {
          where: { personal_rolling_paper_id: personalRollingPaperId, deleted_at: null },
        },
      );

      if (!personalRollingPaper) {
        throw new Error("Paper does not exist");
      }

      return { personalRollingPaper };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // 포스트 전부 조회해주는 함수
  public async getAllPersonalPosts(
    personalRollingPaperInputDTO: PersonalRollingPaperInputDTO,
  ): Promise<{ personalPosts: PersonalPost[] }> {
    try {
      const personalRollingPaperId =
        personalRollingPaperInputDTO.paperId;

      const personalPosts = await this.personalPostModel.findAll({
        where: { personal_rolling_paper_id: personalRollingPaperId , deleted_at:null},
      });

      if (!personalPosts) {
        throw new Error("Post does not exist");
      }

      return { personalPosts };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // 개인 롤링페이퍼 수정해주는 함수
  // TODO
  
  // 개인 롤링페이퍼 삭제해주는 함수
  public async deletePersonalRollingPaper(
    personalRollingPaperInputDTO: PersonalRollingPaperInputDTO,
  ) {
    try {
      const personalRollingPaperId = 
        personalRollingPaperInputDTO.paperId;
      
      await this.personalRollingPaperModel.destroy({
        where: { personal_rolling_paper_id: personalRollingPaperId },
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // 개인 롤링페이퍼 목록 조회해주는 함수
  public async getListPersonalRollingPaper(
    userInputDTO: UserInputDTO,
  ): Promise<{ personalRollingPapers: PersonalRollingPaper[] }> {
    try {
      const userId = userInputDTO.userId;

      const personalRollingPapers = await this.personalRollingPaperModel.findAll({
        where: { user_id: userId },
      });

      if(!personalRollingPapers) {
        throw new Error("This user does not have any papers"); 
      }

      return { personalRollingPapers };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // 포스트 아이디(UUID)를 DB에서 찾은 후 JSON으로 전달해주는 함수
  public async getDetailPost(
    personalPostInputDTO: PersonalPostInputDTO,
  ): Promise<{ personalPost: PersonalPost }> {
    try {
      const personalPostId = personalPostInputDTO.personalPostId;
      const personalPost = await this.personalPostModel.findOne({
        where: { personal_post_id: personalPostId },
      });

      if (!personalPost) {
        throw new Error("Post does not exist");
      }

      return { personalPost };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // TODO: 삭제, 유저, 작성자 확인, 비밀번호 
  public async deletePersonalPost(
    personalPostInputDTO: PersonalPostInputDTO,
  ): Promise<{ personalPost: PersonalPost }> {
    try {
      const personalPostId = personalPostInputDTO.personalPostId;

      const personalPost = await this.personalPostModel.destroy({
        where: { personal_post_id: personalPostId },
      });

      if (!personalPost) {
        throw new Error("Post does not exist");
      }

      return { personalPost };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // TODO: 페이퍼 주인은 안돼, 로그인 or 비로그인 확인 
  // 포스트 생성해주는 함수
  public async createPersonalPost(
    personalPostDTO: PersonalPostDTO,
  ): Promise<{ personalPost: PersonalPost }> {
    try {
      const personalPost = await this.personalPostModel.create(personalPostDTO);

      if (!personalPost) {
        throw new Error("Unable to create post");
      }

      return { personalPost };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // TODO: 롤링페이퍼 주인인지 작성자인지 확인 + 작성자라면 로그인인지 비로그인인지 확인 > 이건 server에서, 로그인 로직 완료 후 수정하기
  // 포스트 수정 함수
  public async updatePersonalPost(
    personalPostInputDTO: PersonalPostInputDTO,
    personalPostDTO: PersonalPostDTO,
  ): Promise<{ personalPost: PersonalPost }> {
    try {
      const personalPostId = personalPostInputDTO.personalPostId;

     // ! 수정한 사람 누구인지 확인 로직 필요, 비로그인 유저면 비밀번호 확인해줘야해! 
     // 이건 로그인 회원
      const personalPost = await this.personalPostModel.update(
        {
          content:personalPostDTO.content,
          post_color:personalPostDTO.postColor,
          anonymous_type: personalPostDTO.anonymousType,
        },
        { where:  { personal_post_id: personalPostId } },
      );
      // 비로그인 회원은 필요한 거- 비밀번호 확인

      if (!personalPost) {
        throw new Error("Unable to update post");
      }

      return { personalPost };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // TODO: 롤링페이퍼 주인만 이모지 수정 가능! 
  public async updateEmojiForPost(
    personalPostInputDTO: PersonalPostInputDTO,
    personalPostEmojiDTO: PersonalPostEmojiDTO,
  ): Promise<{ personalUpdatedEmojiResult: PersonalPost}> {
    try {
      const personalPostId = personalPostInputDTO.personalPostId;

      const personalUpdatedEmojiResult= await this.personalPostModel.update(
        {
          emoji_type : personalPostEmojiDTO.emojiType,
        },
        { where:  { personal_post_id: personalPostId } },
      );
      if (personalUpdatedEmojiResult[0]=== 0) {
        throw new Error("Unable to update emoji for a post");
      }
      return { personalUpdatedEmojiResult};
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
