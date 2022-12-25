import config from "../config/config.js";
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

export default sequelize;
