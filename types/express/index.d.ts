import session from "express-session";

export = session;

// process.d.ts
// interface ProcessEnv extends Dict<string> {
//   env: ProcessEnv;
// }

// global.d.ts
// interface Dict<T> {
//   [key: string]: T | undefined;
// }

// ?: 지금은 필요 없는 것 같음. 관련 에러 any 타입 선언으로 해결
declare module "express-session" {
  // interface SessionData {
  //   host: string;
  //   port: string;
  //   user: string;
  //   password: string;
  //   database: string;
  // }
  interface SessionData {
    cookie: Cookie;
  }
}
