import path from "path";

import winston from "winston";

import config from "@/config/config";

const transports = [];
const logFormat = winston.format.printf(
  ({ timestamp, label, level, message, ...rest }) => {
    let restString = JSON.stringify(rest, null, 2);
    restString = restString === "{}" ? "" : restString;

    // 날짜 [시스템이름] 로그레벨 메세지
    return `${timestamp} [${
      label || path.basename(process.mainModule.filename)
    }] ${level}: ${message || ""} ${restString}`;
  },
);

if (process.env.NODE_ENV !== "development") {
  transports.push(new winston.transports.Console());
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.cli(),
        winston.format.errors({ stack: true }),
        winston.format.prettyPrint(),
        winston.format.splat(),
        winston.format.json(),
        logFormat,
      ),
    }),
  );
}

const LoggerInstance = winston.createLogger({
  level: config.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.colorize({ all: true }),
    winston.format.cli(),
    winston.format.errors({ stack: true }),
    winston.format.prettyPrint({ colorize: true }),
    winston.format.splat(),
    winston.format.json(),
  ),
  transports: transports,
});

export default LoggerInstance;
