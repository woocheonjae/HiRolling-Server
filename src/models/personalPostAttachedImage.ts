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

import PersonalPost from "./personalPost";

// 테이블에 대한 설정
@Table({
  modelName: "PersonalPostAttachedImage",
  tableName: "personal_post_attached_image",
  timestamps: true,
  paranoid: true,
  underscored: true,
  charset: "utf8mb4",
  collate: "utf8mb4_general_ci",
})
export default class PersonalPostAttachedImage extends Model {
  /*
   * 컬럼에 대한 설정
   */
  @PrimaryKey
  @AllowNull(false)
  @Default(UUIDV4)
  @Column(DataType.UUID)
  public personal_post_image_id!: string;

  @ForeignKey(() => PersonalPost)
  @AllowNull(false)
  @Default(UUIDV4)
  @Column(DataType.UUID)
  public personal_post_id!: string;

  @AllowNull(true)
  @Default("default.jpg")
  @Column(DataType.STRING(200))
  public personal_post_image!: string;

  /*
   * 관계에 대한 설정
   */
  // PersonalPostAttachedImage(1) : PersonalPost(1)
  @BelongsTo(() => PersonalPost)
  personalPost: PersonalPost;
}
