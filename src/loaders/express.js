import routes from "../api/index.js";
import config from "../config/config.js";
import Logger from "./logger.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import MySQLStore from "express-mysql-session";
import session from "express-session";
import morgan from "morgan";

const expressLoader = (app) => {
  app.set("port", config.port);

  /*
   * Health Check endpoints
   */
  app.get("/status", (req, res) => {
    res.status(200).end();
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable("trust proxy");

  // 로그 설정
  const httpLogStream = {
    write: (message) => {
      Logger.http(message);
    },
  };
  app.use(morgan("dev", { stream: httpLogStream }));

  // 세션 설정
  app.use(
    session({
      secret: config.cookieSecret,
      resave: false,
      saveUninitialized: true,
      store: new MySQLStore(config.sessionOptions),
    })
  );

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // POST 방식의 파라미터 읽기
  app.use(bodyParser.json()); // to support JSON-encoded bodies
  app.use(
    bodyParser.urlencoded({
      // to support URL-encoded bodies
      extended: true,
    })
  );

  // 쿠키 설정
  app.use(cookieParser(config.cookieSecret));

  // Load API routes
  app.use(config.api.prefix, routes());

  // ! 404 에러가 발생한 경우 처리
  app.use((req, res, next) => {
    const err = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    err.status = 404;
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

export default expressLoader;
