import Sequelize from "sequelize";

const groupMember = class GroupMember extends Sequelize.Model {
  // 테이블에 대한 설정
  static init(sequelize) {
    return super.init(
      {
        //컬럼에 대한 설정
        groupMemberId: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
      },
      {
        // 테이블에 대한 설정
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "GroupMember",
        tableName: "group_member",
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  // 관계에 대한 설정
  static associate(db) {
    // GroupMember(1) : User(1)
    db.GroupMember.belongsTo(db.User, {
      foreignKey: "user_id",
      targetKey: "userId",
    });

    // GroupMember(1) : Group(1)
    db.GroupMember.belongsTo(db.Group, {
      foreignKey: "group_id",
      targetKey: "groupId",
    });

    // GroupMember(1) : GroupRollingPaper(1)
    db.GroupMember.belongsTo(db.GroupRollingPaper, {
      // 1:1 관계에서 belongsTo로 연결하면 GroupMember에 groupRollingPaperId가 들어감
      foreignKey: "group_rolling_paper_id",
      targetKey: "groupRollingPaperId",
    });
  }
};

export default groupMember;
