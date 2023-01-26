import jwt from "jsonwebtoken";

import config from "@/config/config";

const secret = config.jwtSecret;

// access token 발급
export const createAccessToken = (user) => {
  const payload = {
    userId: user.user_id,
    email: user.email,
    name: user.name,
  };

  const accessToken = jwt.sign({ payload }, config.jwtSecret, {
    expiresIn: "30m",
    issuer: "woocheonjae",
  });

  return accessToken;
};

// refresh token 발급
export const createRefreshToken = (user) => {
  const refreshToken = jwt.sign({}, config.jwtSecret, {
    expiresIn: "14d",
    issuer: "woocheonjae",
  });

  return refreshToken;
};

// access token 검증
export const verifyAccessToken = (accessToken) => {
  let decoded = null;
  try {
    // 토큰 확인
    decoded = jwt.verify(accessToken, secret);

    return {
      success: true,
      userId: decoded.payload.userId,
      email: decoded.payload.email,
      name: decoded.payload.name,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// TODO: refresh token 검증 함수 구현
export const verifyRefreshToken = (token) => {
  return null;
};
