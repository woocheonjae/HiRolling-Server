import Sequelize from "sequelize";

const personalRollingPaper = class PersonalRollingPaper extends Sequelize.Model {
  // 테이블에 대한 설정
  static init(sequelize) {
    return super.init(
      // 컬럼에 대한 설정
      {
        personalRollingPaperId: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        exportUrl: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        publicType: {
          type: Sequelize.BOOLEAN(true),
          allowNull: false,
        },
      },
      // 테이블에 대한 설정
      {
        sequelize,
        modelName: "PersonalRollingPaper",
        tableName: "personal_rolling_paper",
        timestamps: true,
        underscored: true,
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  // 관계에 대한 설정
  static associate(db) {
    // PersonalRollingPaper(1) : User(1)
    db.PersonalRollingPaper.belongsTo(db.User, {
      foreignKey: "user_id",
      targetKey: "userId",
    });

    // PersonalRollingPaper(1) : PersonalPost(N)
    db.PersonalRollingPaper.hasMany(db.PersonalPost, {
      foreignKey: "personal_rolling_paper_id",
      sourceKey: "personalRollingPaperId",
    });
  }
};

export default personalRollingPaper;
