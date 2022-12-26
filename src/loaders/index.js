import expressLoader from "./express.js";
import Logger from "./logger.js";
import db from "./sequelize.js";

const expressApp = async (expressApp) => {
  db.sequelize
    .sync({ force: false })
    .then(() => {
      console.log("🎉 DB Connected!");
      Logger.info("🏗️  DB loaded and connected!");
    })
    .catch((error) => {
      console.error("🚀 ~ file: index.js:14 ~ error", error);
    });

  await expressLoader(expressApp);
  Logger.info("🏗️  Express loaded");
};

export default expressApp;
