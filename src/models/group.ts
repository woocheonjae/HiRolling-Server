import { UUIDV4 } from "sequelize";
import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

import GroupMember from "./groupMember";
import User from "./user";

// 테이블에 대한 설정
@Table({
  modelName: "Group",
  tableName: "group",
  timestamps: true,
  underscored: true,
  paranoid: true,
  charset: "utf8mb4",
  collate: "utf8mb4_general_ci",
})
export default class Group extends Model {
  /*
   * 컬럼에 대한 설정
   */
  @PrimaryKey
  @AllowNull(false)
  @Default(UUIDV4)
  @Column(DataType.UUID)
  public group_id!: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Default(UUIDV4)
  @Column(DataType.UUID)
  public user_id!: string;

  @AllowNull(false)
  @Column(DataType.STRING(40))
  public group_name!: string;

  @AllowNull(false)
  @Column(DataType.STRING(200))
  public invite_url!: string;

  @AllowNull(false)
  @Default("default.jpg")
  @Column(DataType.STRING(200))
  public group_profile_image!: string;

  /*
   * 관계에 대한 설정
   */
  // Group(1) : User(1)
  @BelongsTo(() => User)
  user: User;

  // Group(1) : GroupMember(N)
  @HasMany(() => GroupMember)
  groupMembers: GroupMember[];
}
