import passport from "passport";

import kakao from "./kakaoStrategy"; // 카카오 로그인

import User from "@/models/user";

export default () => {
  /**
   * Serialization: 객체를 직렬화하여 전송 가능한 형태로 만드는 것
   * Deserialization: 직렬화된 파일 등을 역으로 직렬화하여 다시 객체 형태로 만드는 것
   */
  /*
  type User = {
    user_id?: string;
  };

  // 로그인 시 serializeUser 함수 실행
  passport.serializeUser((user: User, done) => {
    console.log("확인");
    console.log(user.user_id);
    done(null, user.user_id);
  });

  // 넘어온 id에 해당하는 데이터가 있으면, 데이터베이스에서 검색
  passport.deserializeUser((user_id, done) => {
    console.log(user_id);
    User.findOne({ where: { user_id: user_id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
  */

  kakao();
};
