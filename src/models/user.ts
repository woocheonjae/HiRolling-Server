import { UUIDV4 } from "sequelize";
import {
  AllowNull,
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";
import PersonalRollingPaper from "./personalRollingPaper";
import Group from "./group";
import GroupMember from "./groupMember";
import GroupPost from "./groupPost";
import PersonalPost from "./personalPost";

enum LoginType {
  KAKAO = "KAKAO",
  NAVER = "NAVER",
  GOOGLE = "GOOGLE",
}
// 테이블에 대한 설정
@Table({
  modelName: "User",
  tableName: "user",
  timestamps: true,
  underscored: true,
  paranoid: true,
  charset: "utf8mb4",
  collate: "utf8mb4_general_ci",
})
export default class User extends Model {
  /*
   * 컬럼에 대한 설정
   */
  @PrimaryKey
  @AllowNull(false)
  @Default(UUIDV4)
  @Column(DataType.UUID)
  public user_id!: string;
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(40))
  public email!: string;
  @AllowNull(true)
  @Column(DataType.STRING(128))
  public password!: string;
  @AllowNull(false)
  @Column(DataType.STRING(40))
  public name!: string;
  @AllowNull(false)
  @Default("default.jpg")
  @Column(DataType.STRING(200))
  public user_profile_image!: string;
  @AllowNull(false)
  @Column(DataType.ENUM(...Object.values(LoginType)))
  public login_type!: LoginType;
  /*
   * 관계에 대한 설정
   */
  // User(1) : PersonalRollingPaper(N)
  @HasMany(() => PersonalRollingPaper)
  personalRollingPapers: PersonalRollingPaper[];

  // User(1) : Group(N)
  @HasMany(() => Group)
  Groups: Group[];

  // User(1) : GroupMember(N)
  @HasMany(() => GroupMember)
  GroupMembers: GroupMember[];

  // User(1) : GroupPost(N)
  @HasMany(() => GroupPost)
  GroupPosts: GroupPost[];

  // User(1) : PersonalPost(N)
  @HasMany(() => PersonalPost)
  PersonalPosts: PersonalPost[];
}
