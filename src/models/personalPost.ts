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

import personalPostAttachedImage from "./personalPostAttachedImage";
import PersonalRollingPaper from "./personalRollingPaper";
import User from "./user";

enum AnonymousType {
  친구 = "친구",
  동료 = "동료",
  애인 = "애인",
  가족 = "가족",
}

// 테이블에 대한 설정
@Table({
  modelName: "PersonalPost",
  tableName: "personal_post",
  timestamps: true,
  paranoid: true,
  underscored: true,
  charset: "utf8mb4",
  collate: "utf8mb4_general_ci",
})
export default class PersonalPost extends Model {
  /*
   * 컬럼에 대한 설정
   */
  @PrimaryKey
  @AllowNull(false)
  @Default(UUIDV4)
  @Column(DataType.UUID)
  public personal_post_id!: string;

  @ForeignKey(() => PersonalRollingPaper)
  @AllowNull(false)
  @Default(UUIDV4)
  @Column(DataType.UUID)
  public personal_rolling_paper_id!: string;

  @ForeignKey(() => User)
  @AllowNull(true)
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

  @AllowNull(true)
  @Column(DataType.STRING(200))
  public non_member_password!: string;

  /*
   * 관계에 대한 설정
   */
  // PersonalPost(1) : User(1)
  @BelongsTo(() => User)
  user: User;

  // PersonalPost(1) : PersonalRollingPaper(1)
  @BelongsTo(() => PersonalRollingPaper)
  personalRollingPaper: PersonalRollingPaper;

  // PersonalPost(1) : PersonalPostAttachedImage(N)
  @HasMany(() => personalPostAttachedImage)
  personalPostAttachedImages: personalPostAttachedImage[];
}
