import Sequelize from "sequelize";

const personalPostAttachedImage = class PersonalPostAttachedImage extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        personalPostImageId: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        personalPostImage: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        paranoid: true,
        underscored: true,
        modelName: "PersonalPostAttachedImage",
        tableName: "personalPostAttachedImage",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    // PersonalPostAttachedImage(1) : PersonalPost(1)
    db.PersonalPostAttachedImage.belongsTo(db.PersonalPost, {
      foreignKey: "personal_post_id",
      targetKey: "personalPostId",
    });
  }
};

export default personalPostAttachedImage;
