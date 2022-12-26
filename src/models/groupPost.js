import Sequelize from "sequelize";

const groupPost = class GroupPost extends Sequelize.Model {
  // 테이블에 대한 설정
  static init(sequelize) {
    return super.init(
      // 컬럼에 대한 설정
      {
        groupPostId: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        anonymousType: {
          type: Sequelize.STRING(40),
          allowNull: true,
          defaultValue: null,
          comment: "친구, 동료, 애인, 가족",
        },
        postColor: {
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        emojiType: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
      },
      // 테이블에 대한 설정
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "GroupPost",
        tableName: "group_post",
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  // 관계에 대한 설정
  static associate(db) {
    // GroupPost(1) : User(1)
    db.GroupPost.belongsTo(db.User, {
      foreignKey: "user_id",
      targetKey: "userId",
    });

    // GroupPost(1) : GroupRollingPaper(1)
    db.GroupPost.belongsTo(db.GroupRollingPaper, {
      foreignKey: "group_rolling_paper_id",
      targetKey: "groupRollingPaperId",
    });

    // GroupPost(1) : GroupPostAttachedImage(N)
    db.GroupPost.hasMany(db.GroupPostAttachedImage, {
      foreignKey: "group_post_id",
      sourceKey: "groupPostId",
    });
  }
};

export default groupPost;
