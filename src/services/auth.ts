import { Service, Inject } from "typedi";
import jwt from "jsonwebtoken";
import config from "@/config/config";
import { User, UserInputDTO } from "@/interfaces/User";
import { Model } from "sequelize-typescript";

@Service()
export default class AuthService {
  constructor(
    @Inject("userModel") private userModel,
    @Inject("logger") private logger,
  ) {}

  /**
   * 테스트 함수
   * body로 요청 받은 유저 아이디(UUID)를 DB에서 찾은 후 JSON으로 전달해주는 함수수
   */
  public async test(userInputDTO: UserInputDTO): Promise<{ user: User }> {
    try {
      console.log(
        "🚀 ~ file: auth.ts:17 ~ AuthService ~ test ~ userModel",
        this.userModel,
      );
      console.log(
        "🚀 ~ file: auth.ts:21 ~ AuthService ~ test ~ userInputDTO",
        userInputDTO,
      );

      const userId = userInputDTO.userId;
      console.log(
        "🚀 ~ file: auth.ts:27 ~ AuthService ~ test ~ userId",
        userId,
      );

      const userRecord = await this.userModel.findOne({
        where: { user_id: userId },
      });

      if (!userRecord) {
        throw new Error("User doesn't exist");
      }

      const user = userRecord;
      console.log("🚀 ~ file: auth.ts:40 ~ AuthService ~ test ~ user", user);

      return { user };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
