import { Model } from "sequelize-typescript";
import { Service, Inject } from "typedi";

import config from "@/config/config";
import {
  PersonalPost,
  PersonalPostInputDTO,
  PersonalPostDTO,
} from "@/interfaces/PersonalPost";

@Service()
export default class PersonalService {
  constructor(
    @Inject("personalPostModel") private personalPostModel,
    @Inject("logger") private logger,
  ) {}

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
        throw new Error("Post  doesn't exist");
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
