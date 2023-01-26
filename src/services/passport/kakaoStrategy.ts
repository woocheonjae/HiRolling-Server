import passport from "passport";
import KakaoStrategy from "passport-kakao";

import config from "@/config/config";
import Logger from "@/loaders/logger";
import User from "@/models/user";

export default () => {
  passport.use(
    new KakaoStrategy(
      {
        // 카카오 로그인 REST API 키
        clientID: config.kakaoId,
        // 카카오 로그인 Redirect URI 경로
        callbackURL: config.kakaoRedirectUri,
      },
      async (accessToken, refreshToken, profile, done) => {
        // 로그인 성공 시 정보 출력
        Logger.verbose({ label: "KAKAO Profile", message: profile._json });
        try {
          /**
           * 로그인 히스토리 조회
           * 로그인 타입이 KAKAO이고, 카카오 아이디가 존재하는지 확인
           */
          const exUser = await User.findOne({
            where: {
              email: profile._json.kakao_account.email,
              login_type: "KAKAO",
            },
          });

          // 가입 여부 확인
          if (exUser) {
            // 로그인 인증 완료
            done(null, exUser);
          } else {
            // 가입하지 않은 유저인 경우 회원가입 후 로그인
            const newUser = await User.create({
              email: profile._json.kakao_account.email,
              name: profile.displayName,
              password: null,
              login_type: "KAKAO",
            });
            // 회원가입 후 로그인 인증 완료
            done(null, newUser);
          }
        } catch (error) {
          Logger.error(error);
          done(error);
        }
      },
    ),
  );
};
