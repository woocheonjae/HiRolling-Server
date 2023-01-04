import expressLoader from "./express";
import Logger from "./logger";
import sequelize from "./sequelize";
import {
  Group,
  GroupMember,
  GroupPost,
  GroupPostAttachedImage,
  GroupRollingPaper,
  PersonalPost,
  PersonalPostAttachedImage,
  PersonalRollingPaper,
  User,
} from "./sequelize";
import dependencyInjectorLoader from "./dependencyInjector";

export default async ({ expressApp }) => {
  // 의존성 추가할 모델을 변수로 생성
  const userModel = {
    name: "userModel",
    model: User,
  };

  // 위에서 생성한 변수를 배열 안에 대
  await dependencyInjectorLoader({
    models: [userModel],
  });
  Logger.info("🏗️  Dependency Injector loaded");

  await sequelize
    .sync({ force: false })
    .then(() => {
      console.log("🎉 DB Connected!");
      Logger.info("🏗️  DB loaded and connected!");
    })
    .catch((error) => {
      console.error("🚀 ~ file: index.js:35 ~ error", error);
    });

  await expressLoader({ app: expressApp });
  Logger.info("🏗️  Express loaded");
};
