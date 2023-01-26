import jwt from "jsonwebtoken";
import { Model } from "sequelize-typescript";
import { Service, Inject } from "typedi";

import config from "@/config/config";
import { User, UserInputDTO, TokenDTO } from "@/interfaces/User";
import { createAccessToken, createRefreshToken } from "@/utils/jwtUtil";

@Service()
export default class AuthService {
  constructor(
    @Inject("userModel") private userModel,
    @Inject("logger") private logger,
  ) {}

  /**
   * 테스트 함수
   * body로 요청 받은 유저 아이디(UUID)를 DB에서 찾은 후 JSON으로 전달해주는 함수
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

  // JWT(access token, refresh token) 발급 메서드
  public async createJwt(user): Promise<{ token: TokenDTO }> {
    try {
      // access token 발급
      const accessToken = createAccessToken(user);
      // refresh token 발급
      const refreshToken = createRefreshToken(user);
      // token 변수에 access token과 refresh token을 객체로 담아 저장
      const token = { accessToken, refreshToken };

      return { token };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // DB에 refresh token 저장하는 메서드
  public async updateRefreshToken(user, refreshToken) {
    try {
      // 매개변수로 받은 user의 id를 기준으로 refresh token을 저장
      const updateRefreshToken = await this.userModel.update(
        {
          refresh_token: refreshToken,
        },
        {
          where: { user_id: user.user_id },
        },
      );

      /*
       * updateRefreshToken의 리턴값: [영향받은 행의 개수]
       * update에 성공: [1]
       * update에 실패: [0]
       */
      const canUpdateRefreshToken = updateRefreshToken[0];

      // canUpdateRefreshToken의 값이 0(false)이면, 에러 발생
      if (!canUpdateRefreshToken) {
        throw new Error("Unable to update refresh token");
      }
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // DB에서 refresh token 삭제하는 메서드
  public async deleteRefreshToken(userId) {
    try {
      // 매개변수로 받은 userId를 기준으로 refresh token을 삭제
      const deleteRefreshToken = await this.userModel.update(
        {
          refresh_token: null,
        },
        { where: { user_id: userId } },
      );

      /*
       * deleteRefreshToken의 리턴값: [영향받은 행의 개수]
       * update에 성공: [1]
       * update에 실패: [0]
       */
      const canDeleteRefreshToken = deleteRefreshToken[0];

      // canDeleteRefreshToken의 값이 0(false)이면, 에러 발생
      if (!canDeleteRefreshToken) {
        throw new Error("Unable to delete refresh token");
      }
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  /**
   * TODO 2: 토큰 재발급 메서드 구현
   ** access token이 만료된 경우,
   ** refresh token을 이용해 access token 재발급
   ** 이후 refresh token도 재발급
   ** RTR(Refresh Token Rotation) -> refresh token은 일회성
   */
  public async reCreateJwt(
    accessToken,
    refreshToken,
  ): Promise<{ token: TokenDTO }> {
    try {
      const token = { accessToken, refreshToken };
      return { token };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
