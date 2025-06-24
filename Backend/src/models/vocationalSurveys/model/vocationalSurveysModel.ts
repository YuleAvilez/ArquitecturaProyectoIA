import { AutoMap } from "@automapper/classes";
import { DataTypes } from "sequelize";
import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { CareerRecommendations } from "../../careerRecommendations/model/careerRecommendationsModel";
import { User } from "../../user/model/userModel";
import { UserVocationalResponses } from "../../userVocationalResponses/model/userVocationalResponsesModel";

@Table({ tableName: "VocationalSurveys", timestamps: true })
export class VocationalSurveys extends Model {
  @AutoMap()
  @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true })
  declare vocationalSurveyId?: number;

  @AutoMap()
  @ForeignKey(() => User)
  @Column({ type: DataTypes.INTEGER })
  declare userId?: number;

  @AutoMap()
  @Column({ type: DataTypes.DATE, defaultValue: DataTypes.NOW })
  declare createdAt?: Date;

  @AutoMap()
  @BelongsTo(() => User)
  declare user?: User;

  @AutoMap()
  @HasMany(() => UserVocationalResponses)
  declare responses?: UserVocationalResponses[];

  @AutoMap()
  @HasMany(() => CareerRecommendations)
  declare recommendations?: CareerRecommendations[];
}
