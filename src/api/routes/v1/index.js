import auth from "./auth.js";
import { Router } from "express";

/*
 * API Version: v1
 *
 * v1 디렉토리 내 모든 API를 내보내는 함수
 *
 * 이 함수에 각자 만든 API를 추가해주시면 됩니다.
 */
export default () => {
  const app = Router();

  auth(app);

  return app;
};
