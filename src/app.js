import config from "./config/config.js";
import expressApp from "./loaders/index.js";
import Logger from "./loaders/logger.js";
import express from "express";

/*
 * 서버 설정
 */
async function startServer() {
  const app = express();

  await expressApp(app);

  app
    .listen(config.port, () => {
      Logger.info(`
      ################################################
      📡 Server listening on port: ${app.get("port")} 📡
      ################################################
    `);
    })
    .on("error", (err) => {
      Logger.error(err);
      process.exit(1);
    });
}

startServer();
