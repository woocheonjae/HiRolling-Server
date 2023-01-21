import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import expressMySQLSession from "express-mysql-session";
import session from "express-session";
import morgan from "morgan";
import nunjucks from "nunjucks";
import passport from "passport";

import Logger from "./logger";

import routes from "@/api/index";
import config from "@/config/config";
import passportConfig from "@/services/passport";

export default ({ app }: { app: express.Application }) => {
  app.set("port", config.port);

  /*
   * Health Check endpoints
   */
  app.get("/status", (req, res) => {
    res.status(200).json({ test: "good" }).end();
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable("trust proxy");

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // View Template
  app.set("view engine", "html");
  nunjucks.configure("src/views", {
    express: app,
    watch: true,
  });

  // 로그 설정
  const httpLogStream = {
    write: (message) => {
      Logger.http(message);
    },
  };
  app.use(morgan("dev", { stream: httpLogStream }));

  const MySQLStore = expressMySQLSession(session as any); // TODO: any 고쳐야 함
  // 세션 설정
  app.use(
    session({
      secret: config.cookieSecret,
      resave: false,
      saveUninitialized: true,
      store: new MySQLStore(config.expressSession as any), // TO DO: any 고쳐야 함
      cookie: {
        httpOnly: true,
        secure: false,
      },
    }),
  );

  /**
   *! express-session에 의존하기 때문에 세션 설정 코드보다 아래에 위치
   * passport.session()이 실행되면 세션 쿠키 정보를 바탕으로
   * /services/passport/index.ts의 deserializeUser 함수가 실행된다.
   */
  passportConfig(); // passport 설정
  app.use(passport.initialize()); // 요청 객체에 passport 설정 사용
  // app.use(passport.session()); // req.session 객체에 passport 정보를 추가로 저장

  // POST 방식의 파라미터 읽기
  app.use(bodyParser.json()); // to support JSON-encoded bodies
  app.use(
    bodyParser.urlencoded({
      // to support URL-encoded bodies
      extended: true,
    }),
  );

  // 쿠키 설정
  app.use(cookieParser(config.cookieSecret));

  // Load API routes
  app.use(config.api.prefix, routes());

  // ! 404 에러가 발생한 경우 처리
  app.use((req, res, next) => {
    const err = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    err["status"] = 404;
    next(err);
  });

  // ! 404 이외의 에러가 발생한 경우 처리
  app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
    res.status(err.status || 500);
    res.render("error");
  });
};
