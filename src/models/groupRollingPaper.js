import Sequelize from "sequelize";

const groupRollingPaper = class GroupRollingPaper extends Sequelize.Model {
  //테이블에 대한  설정
  static init(sequelize) {
    return super.init(
      //컬럼에 대한 설정
      {
        groupRollingPaperId: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING(40),
          allowNull: true,
        },
      },
      //테이블에 대한 설정
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "GroupRollingPaper",
        tableName: "group_rolling_paper",
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  // 관계에 대한 설정
  static associate(db) {
    // GroupRollingPaper(1) : GroupPost(N)
    db.GroupRollingPaper.hasMany(db.GroupPost, {
      foreignKey: "group_rolling_paper_id",
      sourceKey: "groupRollingPaperId",
    });

    /*
     * GroupRollingPaper(1) : GroupMember(1)
     *
     * GroupRollingPaper 테이블의 PrimaryKey를 GroupMember 테이블이 외래로 참조하고 있다.
     * GroupRollingPaper(부모 테이블) <-> GroupMember(자식 테이블)
     *
     * 따라서, hasOne으로 1:1 관계를 설정
     * foreignKey를 GroupRollingPaper 테이블의 primaryKey로 지정
     * sourceKey를 GroupRollingPaper 클래스에서 primaryKey로 지정한 groupRollingPaperId로 설정
     */
    db.GroupRollingPaper.hasOne(db.GroupMember, {
      foreignKey: "group_rolling_paper_id",
      sourceKey: "groupRollingPaperId",
    });
  }
};

export default groupRollingPaper;
