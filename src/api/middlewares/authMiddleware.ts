import { verifyToken } from "@/utils/jwtUtil";

export const verifyAccessToken = (req, res, next) => {
  // 헤더에 토큰이 존재할 경우
  if (req.headers.authorization) {
    /**
     * Http Header에 담긴 JWT: { "Authorization": "Bearer jwt-token" }
     * 위와 같이 헤더에 담긴 access token을 가져오기 위해 문자열 분리
     */
    const token = req.headers.authorization.split("Bearer ")[1];

    // 토큰 검증
    const result = verifyToken(token);

    /**
     * 토큰 검증 성공 시,
     * req에 값 저장 후 콜백 함수 호출
     */
    if (result.success) {
      req.userId = result.userId;
      req.email = result.email;
      req.name = result.name;
      next();
    }

    /**
     * 토큰 검증 실패 시,
     * 클라이언트에 에러 코드와 함께 에러 메시지 응답
     */
    if (!result.success) {
      return res.status(401).json({
        code: 401,
        message: "Invalid Token",
      });
    }

    /**
     * 토큰 토큰 만료 시,
     * 클라이언트에 에러 코드와 함께 에러 메시지 응답
     */
    if (result.message === "TokenExpiredError") {
      return res.status(403).json({
        code: 403,
        message: "Token has expired",
      });
    }
  }

  // 헤더에 토큰이 존재하지 않는 경우
  if (!req.headers.authorization) {
    return res.status(404).json({
      code: 404,
      message: "Token does not exist",
    });
  }
};

export const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("로그인이 필요한 서비스입니다.");
  }
};

export const isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    // 메시지를 생성하는 Query String(parameter)으로 사용할 것이기 때문에 Encoding을 해주어야 한다.
    const message = encodeURIComponent("이미 로그인 상태입니다.");

    // 이전 request 객체의 내용을 모두 삭제하고,
    // 새로운 요청 흐름을 만드는 것으로 새로고침을 하면 결과 화면만 새로고침 된다.
    res.redirect(`/?error=${message}`);
    console.log(message);
  }
};
