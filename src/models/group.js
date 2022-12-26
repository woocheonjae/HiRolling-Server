import Sequelize from "sequelize";

const group = class Group extends Sequelize.Model {
  //테이블에 대한 설정
  static init(sequelize) {
    return super.init(
      {
        //컬럼에 대한 설정
        groupId: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        groupName: {
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        inviteUrl: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        groupProfileImage: {
          type: Sequelize.STRING(200),
          allowNull: false,
          defaultValue: "default.jpg",
        },
      },
      {
        //테이블에 대한 설정
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "Group",
        tableName: "group",
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  // 관계에 대한 설정
  static associate(db) {
    // Group(1) : User(1)
    db.Group.belongsTo(db.User, {
      foreignKey: "user_id",
      targetKey: "userId",
    });

    // Group(1) : GroupMember(N)
    db.Group.hasMany(db.GroupMember, {
      foreignKey: "group_id",
      sourceKey: "groupId",
    });
  }
};

export default group;
