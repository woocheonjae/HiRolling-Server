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

import User from "./user";
import PersonalPost from "./personalPost";

// 테이블에 대한 설정
@Table({
  modelName: "PersonalRollingPaper",
  tableName: "personal_rolling_paper",
  timestamps: true,
  underscored: true,
  paranoid: true,
  charset: "utf8mb4",
  collate: "utf8mb4_general_ci",
})
export default class PersonalRollingPaper extends Model {
  /*
   * 컬럼에 대한 설정
   */
  @PrimaryKey
  @AllowNull(false)
  @Default(UUIDV4)
  @Column(DataType.UUID)
  public personal_rolling_paper_id!: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Default(UUIDV4)
  @Column(DataType.UUID)
  public user_id!: string;

  @AllowNull(true)
  @Column(DataType.STRING(40))
  public title!: string;

  @AllowNull(false)
  @Column(DataType.STRING(200))
  public export_url!: string;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  public public_type!: boolean;

  /*
   * 관계에 대한 설정
   */
  // PersonalRollingPaper(1) : User(1)
  @BelongsTo(() => User)
  user: User;

  // PersonalRollingPaper(1) : PersonalPost(N)
  @HasMany(() => PersonalPost)
  PersonalPost: PersonalPost[];
}
