import Sequelize from "sequelize";

const user = class User extends Sequelize.Model {
  // 테이블에 대한 설정
  static init(sequelize) {
    return super.init(
      {
        // 컬럼에 대한 설정
        userId: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        email: {
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(128),
          allowNull: true,
        },
        name: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        userProfileImage: {
          type: Sequelize.STRING(200),
          allowNull: false,
          defaultValue: "default.jpg",
        },
        loginType: {
          type: Sequelize.STRING(10),
          allowNull: true,
        },
      },
      {
        // 테이블에 대한 설정
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "User",
        tableName: "user",
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    // User(1) : PersonalRollingPaper(N)
    db.User.hasMany(db.PersonalRollingPaper, {
      foreignKey: "user_id",
      sourceKey: "userId",
    });

    // User(1) : PersonalPost(N)
    db.User.hasMany(db.PersonalPost, {
      foreignKey: "user_id",
      sourceKey: "userId",
    });

    // User(1) : GroupPost(N)
    db.User.hasMany(db.GroupPost, {
      foreignKey: "user_id",
      sourceKey: "userId",
    });

    // User(1) : Group(N)
    db.User.hasMany(db.Group, {
      foreignKey: "user_id",
      sourceKey: "userId",
    });

    // User(1) : GroupMember(N)
    db.User.hasMany(db.GroupMember, {
      foreignKey: "user_id",
      sourceKey: "userId",
    });
  }
};

export default user;
