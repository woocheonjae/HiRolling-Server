import Sequelize from "sequelize";

const groupPostAttachedImage = class GroupPostAttachedImage extends Sequelize.Model {
  // 테이블에 대한 설정
  static init(sequelize) {
    return super.init(
      // 컬럼에 대한 설정
      {
        groupPostImageId: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        groupPostImage: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
      },
      // 테이블에 대한 설정
      {
        sequelize,
        timestamps: true,
        paranoid: true,
        underscored: true,
        modelName: "GroupPostAttachedImage",
        tableName: "group_post_attached_image",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  // 관계에 대한 설정
  static associate(db) {
    // GroupPostAttachedImage(1) : GroupPost(1)
    db.GroupPostAttachedImage.belongsTo(db.GroupPost, {
      foreignKey: "group_post_id",
      targetKey: "groupPostId",
    });
  }
};

export default groupPostAttachedImage;
