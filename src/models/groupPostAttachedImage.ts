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

import GroupPost from "./groupPost";

// 테이블에 대한 설정
@Table({
  modelName: "GroupPostAttachedImage",
  tableName: "group_post_attached_image",
  timestamps: true,
  paranoid: true,
  underscored: true,
  charset: "utf8mb4",
  collate: "utf8mb4_general_ci",
})
export default class GroupPostAttachedImage extends Model {
  /*
   * 컬럼에 대한 설정
   */
  @PrimaryKey
  @Default(UUIDV4)
  @Column(DataType.UUID)
  public group_post_image_id: string;

  @ForeignKey(() => GroupPost)
  @AllowNull(false)
  @Default(UUIDV4)
  @Column(DataType.UUID)
  public group_post_id: string;

  @AllowNull(true)
  @Default("default.jpg")
  @Column(DataType.STRING(200))
  public group_post_image: string;

  /*
   * 관계에 대한 설정
   */
  // GroupPostAttachedImage(1) : GroupPost(1)
  @BelongsTo(() => GroupPost)
  groupPost: GroupPost;
}
