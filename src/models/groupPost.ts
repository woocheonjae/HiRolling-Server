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

import GroupPostAttachedImage from "./groupPostAttachedImage";
import GroupRollingPaper from "./groupRollingPaper";
import User from "./user";

enum AnonymousType {
  친구 = "친구",
  동료 = "동료",
  애인 = "애인",
  가족 = "가족",
}

// 테이블에 대한 설정
@Table({
  modelName: "GroupPost",
  tableName: "group_post",
  timestamps: true,
  underscored: true,
  paranoid: true,
  charset: "utf8mb4",
  collate: "utf8mb4_general_ci",
})
export default class GroupPost extends Model {
  /*
   * 컬럼에 대한 설정
   */
  @PrimaryKey
  @AllowNull(false)
  @Default(UUIDV4)
  @Column(DataType.UUID)
  public group_post_id!: string;

  @ForeignKey(() => GroupRollingPaper)
  @AllowNull(false)
  @Default(UUIDV4)
  @Column(DataType.UUID)
  public group_rolling_paper_id!: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Default(UUIDV4)
  @Column(DataType.UUID)
  public user_id!: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  public content!: string;

  @AllowNull(false)
  @Column(DataType.ENUM(...Object.values(AnonymousType)))
  public anonymous_type!: AnonymousType;

  @AllowNull(true)
  @Column(DataType.STRING(40))
  public post_color!: string;

  @AllowNull(true)
  @Column(DataType.STRING(255))
  public emoji_type!: string;

  /*
   * 관계에 대한 설정
   */
  // GroupPost(1) : User(1)
  @BelongsTo(() => User)
  user: User;

  // GroupPost(1) : GroupRollingPaper(1)
  @BelongsTo(() => GroupRollingPaper)
  groupRollingPaper: GroupRollingPaper;

  // GroupPost(1) : GroupPostAttachedImage(N)
  @HasMany(() => GroupPostAttachedImage)
  groupPostAttachedImages: GroupPostAttachedImage[];
}
