import { UUIDV4 } from "sequelize";
import {
  AllowNull,
  Column,
  DataType,
  Default,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

import GroupMember from "./groupMember";
import GroupPost from "./groupPost";

// 테이블에 대한 설정
@Table({
  modelName: "GroupRollingPaper",
  tableName: "group_rolling_paper",
  timestamps: true,
  underscored: true,
  paranoid: true,
  charset: "utf8mb4",
  collate: "utf8mb4_general_ci",
})
export default class GroupRollingPaper extends Model {
  /*
   * 컬럼에 대한 설정
   */
  @PrimaryKey
  @AllowNull(false)
  @Default(UUIDV4)
  @Column(DataType.UUID)
  public group_rolling_paper_id!: string;

  @AllowNull(true)
  @Column(DataType.STRING(40))
  public title!: string;

  /*
   * 관계에 대한 설정
   */
  // GroupRollingPaper(1) : GroupPost(N)
  @HasMany(() => GroupPost)
  grouPosts: GroupPost[];

  /*
   * GroupRollingPaper(1) : GroupMember(1)
   *
   * GroupRollingPaper 테이블의 PrimaryKey를 GroupMember 테이블이 외래로 참조하고 있다.
   * GroupRollingPaper(부모 테이블) <-> GroupMember(자식 테이블)
   *
   * 따라서, hasOne으로 1:1 관계를 설정
   * foreignKey를 GroupRollingPaper 테이블의 primaryKey로 지정
   * sourceKey를 GroupRollingPaper 클래스에서 primaryKey로 지정한 groupRollingPaperId로 설정
   */
  @HasOne(() => GroupMember)
  groupMember: GroupMember;
}
