import Sequelize from "sequelize";

const groupPostAttachedImage = class GroupPostAttachedImage extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
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
      {
        sequelize,
        timestamps: true,
        paranoid: true,
        underscored: true,
        modelName: "GroupPostAttachedImage",
        tableName: "groupPostAttachedImage",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    // GroupPostAttachedImage(1) : GroupPost(1)
    db.GroupPostAttachedImage.belongsTo(db.GroupPost, {
      foreignKey: "group_post_id",
      targetKey: "groupPostId",
    });
  }
};

export default groupPostAttachedImage;
