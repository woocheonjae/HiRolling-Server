import Sequelize from "sequelize";

const personalPostAttachedImage = class PersonalPostAttachedImage extends Sequelize.Model {
  // 테이블에 대한 설정
  static init(sequelize) {
    return super.init(
      // 컬럼에 대한 설정
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
      // 테이블에 대한 설정
      {
        sequelize,
        timestamps: true,
        paranoid: true,
        underscored: true,
        modelName: "PersonalPostAttachedImage",
        tableName: "personal_post_attached_image",
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
