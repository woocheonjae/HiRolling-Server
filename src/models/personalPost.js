import Sequelize from "sequelize";

const personalPost = class PersonalPost extends Sequelize.Model {
  // 테이블에 대한 설정
  static init(sequelize) {
    return super.init(
      {
        // 칼럼에 대한 설정
        personalPostId: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        anonymousType: {
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        postColor: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        nonMemberPassword: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        emojiType: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
      },
      {
        // 테이블에 대한 설정
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "PersonalPost",
        tableName: "personal_post",
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  // 관계에 대한 설정
  static associate(db) {
    // PersonalPost(1) : User(1)
    db.PersonalPost.belongsTo(db.User, {
      foreignKey: "user_id",
      targetKey: "userId",
    });

    // PersonalPost(1) : PersonalRollingPaper(1)
    db.PersonalPost.belongsTo(db.PersonalRollingPaper, {
      foreignKey: "personal_rolling_paper_id",
      targetKey: "personalRollingPaperId",
    });

    // PersonalPost(1) : PersonalPostAttachedImage(N)
    db.PersonalPost.hasMany(db.PersonalPostAttachedImage, {
      foreignKey: "personal_post_id",
      sourceKey: "personalPostId",
    });
  }
};

export default personalPost;
