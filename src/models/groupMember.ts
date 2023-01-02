import { UUIDV4 } from "sequelize";
import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

import Group from "./group";
import GroupRollingPaper from "./groupRollingPaper";
import User from "./user";

// 테이블에 대한 설정
@Table({
  modelName: "GroupMember",
  tableName: "group_member",
  timestamps: true,
  underscored: true,
  paranoid: true,
  charset: "utf8mb4",
  collate: "utf8mb4_general_ci",
})
export default class GroupMember extends Model {
  /*
   * 컬럼에 대한 설정
   */
  @PrimaryKey
  @Default(UUIDV4)
  @Column(DataType.UUID)
  public group_member_id!: string;

  @ForeignKey(() => Group)
  @AllowNull(false)
  @Default(UUIDV4)
  @Column(DataType.UUID)
  public group_id!: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Default(UUIDV4)
  @Column(DataType.UUID)
  public user_id!: string;

  @ForeignKey(() => GroupRollingPaper)
  @AllowNull(false)
  @Default(UUIDV4)
  @Column(DataType.UUID)
  public group_rolling_paper_id!: string;

  /*
   * 관계에 대한 설정
   */
  // GroupMember(1) : User(1)
  @BelongsTo(() => User)
  user: User;

  // GroupMember(1) : Group(1)
  @BelongsTo(() => Group)
  group: Group;

  /*
   * GroupMember(1) : GroupRollingPaper(1)
   *
   * GroupMember 테이블은 GroupRollingPaper 테이블의 PrimaryKey를 외래로 참조하고 있다.
   * GroupMember(자식 테이블) <-> GroupRollingPaper(부모 테이블)
   *
   * 따라서, belongTo로 1:1 관계를 설정
   * foreignKey를 GroupRollingPaper 테이블의 primaryKey로 지정
   * targetKey를 GroupRollingPaper 클래스에서 primaryKey로 지정한 groupRollingPaperId로 설정
   */
  @BelongsTo(() => GroupRollingPaper)
  groupRollingPaper: GroupRollingPaper;
}
