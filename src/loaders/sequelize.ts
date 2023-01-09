import { Sequelize } from "sequelize-typescript";

import config from "@/config/config";
import Group from "@/models/group";
import GroupMember from "@/models/groupMember";
import GroupPost from "@/models/groupPost";
import GroupPostAttachedImage from "@/models/groupPostAttachedImage";
import GroupRollingPaper from "@/models/groupRollingPaper";
import PersonalPost from "@/models/personalPost";
import PersonalPostAttachedImage from "@/models/personalPostAttachedImage";
import PersonalRollingPaper from "@/models/personalRollingPaper";
import User from "@/models/user";

const env = process.env.NODE_ENV || "development";
const sequelizeConfig = config[env];

const sequelize = new Sequelize(
  sequelizeConfig.databaseName,
  sequelizeConfig.databaseUser,
  sequelizeConfig.databasePassword,
  {
    host: sequelizeConfig.databaseURL,
    dialect: sequelizeConfig.databaseDialect,
    models: [__dirname + "/models"],
  },
);

sequelize.addModels([
  Group,
  GroupMember,
  GroupPost,
  GroupPostAttachedImage,
  GroupRollingPaper,
  PersonalPost,
  PersonalPostAttachedImage,
  PersonalRollingPaper,
  User,
]);

export {
  Group,
  GroupMember,
  GroupPost,
  GroupPostAttachedImage,
  GroupRollingPaper,
  PersonalPost,
  PersonalPostAttachedImage,
  PersonalRollingPaper,
  User,
};

export default sequelize;
