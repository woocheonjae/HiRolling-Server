import { Model } from "sequelize-typescript";
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
} from "@/interfaces/PersonalPost";

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
  public async viewPersonalRollingPaper(
    personalRollingPaperInputDTO: PersonalRollingPaperInputDTO,
  ): Promise<{ personalRollingPaper: PersonalRollingPaper }> {
    try {
      const personalRollingPaperId =
        personalRollingPaperInputDTO.paperId;

      const personalRollingPaper = await this.personalRollingPaperModel.findOne(
        {
          where: { personal_rolling_paper_id: personalRollingPaperId },
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
  public async viewAllPosts(
    personalRollingPaperInputDTO: PersonalRollingPaperInputDTO,
  ): Promise<{ personalPosts: PersonalPost[] }> {
    try {
      const personalRollingPaperId =
        personalRollingPaperInputDTO.paperId;

      const personalPosts = await this.personalPostModel.findAll({
        where: { personal_rolling_paper_id: personalRollingPaperId },
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
  // ? 아마 title, public_type만 수정할수있을듯
  public async updatePersonalRollingPaper() {
    // TODO
  }

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

  // 포스트 아이디(UUID)를 DB에서 찾은 후 JSON으로 전달해주는 함수
  public async viewDetailPost(
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

  // 포스트 생성해주는 함수
  public async createPost(
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
}
