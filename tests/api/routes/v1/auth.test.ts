import express from "express";
import request from "supertest";

import expressLoader from "../../../../src/loaders/express";
import sequelize from "../../../../src/loaders/sequelize";

const app = express();

/**
 * Unit Test
 *
 * auth API 테스트 코드
 */
describe("auth API test", () => {
  // 테스트 수행 전 실행할 사전 작업
  beforeAll(async () => {
    // 테스트 ORM 생성
    await sequelize.sync();

    // express 객체 로드
    await expressLoader({ app: app });
  });

  // 테스트 수행 후 실행할 마무리 작업
  afterAll(async () => {
    /**
     * 테이블 재생성
     * 테스트 시 충돌을 방지하기 위해서 매 테스트 종료 시 데이터베이스 초기화
     */
    await sequelize.sync({ force: true });
  });

  it("should return 200 if request is valid", async () => {
    await request(app).get("/api/v1/auth/kakao").expect(200, { test: "good" });
  });
});
