import express from "express";
import "reflect-metadata";

import config from "./config/config";
import Logger from "./loaders/logger";

/*
 * 서버 설정
 */
async function startServer() {
  const app = express();

  // ?: 이해 못 함
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  await require("./loaders").default({ expressApp: app });

  app
    .listen(config.port, () => {
      Logger.info(`
      ################################################
      📡 Server listening on port: ${config.port} 📡
      ################################################
    `);
    })
    .on("error", (err) => {
      Logger.error(err);
      process.exit(1);
    });
}

startServer();
