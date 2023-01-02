import expressLoader from "./express";
import Logger from "./logger";
import sequelize from "./sequelize";

export default async ({ expressApp }) => {
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log("🎉 DB Connected!");
      Logger.info("🏗️  DB loaded and connected!");
    })
    .catch((error) => {
      console.error("🚀 ~ file: index.js:13 ~ error", error);
    });

  await expressLoader({ app: expressApp });
  Logger.info("🏗️  Express loaded");
};
