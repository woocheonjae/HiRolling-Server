import session from "express-session";

import IUser from "../../src/models/user";

export = session;

/**
process.d.ts
interface ProcessEnv extends Dict<string> {
  env: ProcessEnv;
}

global.d.ts
interface Dict<T> {
  [key: string]: T | undefined;
}
*/

declare global {
  namespace Express {
    interface User {
      user_id?: string;
      email: string;
      name: string;
    }
  }
}

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
