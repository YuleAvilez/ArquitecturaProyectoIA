import { AutoMap } from "@automapper/classes";
import { DataTypes } from "sequelize";
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { SurveyQuestions } from "../../surveyQuestions/model/surveyQuestionsModel";
import { VocationalSurveys } from "../../vocationalSurveys/model/vocationalSurveysModel";

@Table({ tableName: "UserVocationalResponses", timestamps: true })
export class UserVocationalResponses extends Model {
  @AutoMap()
  @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true })
  declare userVocationalResponseId?: number;

  @AutoMap()
  @ForeignKey(() => VocationalSurveys)
  @Column({ type: DataTypes.INTEGER })
  declare vocationalSurveyId?: number;

  @AutoMap()
  @ForeignKey(() => SurveyQuestions)
  @Column({ type: DataTypes.INTEGER })
  declare surveyQuestionId?: number;

  @AutoMap()
  @Column({ type: DataTypes.STRING })
  declare answer?: string;

  @AutoMap()
  @BelongsTo(() => VocationalSurveys)
  declare vocationalSurvey?: VocationalSurveys;

  @AutoMap()
  @BelongsTo(() => SurveyQuestions)
  declare question?: SurveyQuestions;
}
