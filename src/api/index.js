import v1 from "./routes/v1/index.js";
import { Router } from "express";

/*
 * API Version: v1
 *
 * routes 디렉토리 내 모든 API를 내보내는 함수
 */
export default () => {
  const app = Router();

  // app.use("/API Version", 버저닝 디렉토리 내 index.js가 내보내는 함수를 인자로 전달)
  app.use("/v1", v1());

  return app;
};
