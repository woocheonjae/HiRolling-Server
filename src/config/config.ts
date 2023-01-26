import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️ Couldn't find .env file  ⚠️");
}

const env = process.env;

export default {
  // 포트 번호 설정
  port: parseInt(env.PORT, 10),

  // 데이터베이스 주소
  databaseURL: env.DB_URI,

  // 데이터베이스 포트
  databasePort: env.DB_PORT,

  // 데이터베이스 사용자
  databaseUser: env.DB_USERNAME,

  // 데이터베이스 비밀번호
  databasePassword: env.DB_PASSWORD,

  // 데이터베이스 이름
  databaseName: env.DATABASE_DEV,

  // 데이터베이스 종류
  databaseDialect: env.DIALECT,

  // 쿠키
  cookieSecret: env.COOKIE_SECRET,

  development: {
    databaseUser: env.DB_USERNAME,
    databasePassword: env.DB_PASSWORD,
    databaseName: env.DATABASE_DEV,
    databaseURL: env.DB_URI,
    databaseDialect: env.DIALECT,
  },

  test: {
    databaseUser: env.DB_USERNAME,
    databasePassword: env.DB_PASSWORD,
    databaseName: env.DATABASE_TEST,
    databaseURL: env.DB_URI,
    databaseDialect: env.DIALECT,
  },

  production: {
    databaseUser: env.DB_USERNAME,
    databasePassword: env.DB_PASSWORD,
    databaseName: env.DATABASE_PRODUCTION,
    databaseURL: env.DB_URI,
    databaseDialect: env.DIALECT,
  },

  // 세션 옵션
  expressSession: {
    host: env.DB_URI,
    port: env.DB_PORT,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DATABASE_DEV,
  },

  // Used by winston logger
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },

  // API configs
  api: {
    prefix: "/api",
  },

  // JWT
  jwtSecret: env.JWT_SECRET,

  // 카카오 로그인
  kakaoId: env.KAKAO_REST_API_KEY,
  kakaoRedirectUri: env.KAKAO_REDIRECT_URI,
};
