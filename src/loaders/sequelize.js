import config from "../config/config.js";
import Group from "../models/group.js";
import GroupMember from "../models/groupMember.js";
import GroupPost from "../models/groupPost.js";
import GroupPostAttachedImage from "../models/groupPostAttachedImage.js";
import GroupRollingPaper from "../models/groupRollingPaper.js";
import PersonalPost from "../models/personalPost.js";
import PersonalPostAttachedImage from "../models/personalPostAttachedImage.js";
import PersonalRollingPaper from "../models/personalRollingPaper.js";
import User from "../models/user.js";
import { Sequelize } from "sequelize";

let sequelize;
sequelize = new Sequelize(
  config.databaseName,
  config.databaseUser,
  config.databasePassword,
  { host: config.databaseURL, dialect: config.databaseDialect }
);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 모델 추가
db.User = User;
db.PersonalRollingPaper = PersonalRollingPaper;
db.PersonalPost = PersonalPost;
db.PersonalPostAttachedImage = PersonalPostAttachedImage;
db.Group = Group;
db.GroupMember = GroupMember;
db.GroupRollingPaper = GroupRollingPaper;
db.GroupPost = GroupPost;
db.GroupPostAttachedImage = GroupPostAttachedImage;

// 초기화 작업
User.init(sequelize);
PersonalRollingPaper.init(sequelize);
PersonalPost.init(sequelize);
PersonalPostAttachedImage.init(sequelize);
Group.init(sequelize);
GroupMember.init(sequelize);
GroupRollingPaper.init(sequelize);
GroupPost.init(sequelize);
GroupPostAttachedImage.init(sequelize);

// 관계 설정
User.associate(db);
PersonalRollingPaper.associate(db);
PersonalPost.associate(db);
PersonalPostAttachedImage.associate(db);
Group.associate(db);
GroupMember.associate(db);
GroupRollingPaper.associate(db);
GroupPost.associate(db);
GroupPostAttachedImage.associate(db);

export default db;
