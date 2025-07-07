import { AutoMap } from "@automapper/classes";
import { DataTypes } from "sequelize";
import { Column, ForeignKey, Model, Table, BelongsTo } from "sequelize-typescript";
import { QuestionSectionModel } from "../../QuestionSection/model/QuestionSectionModel";

@Table({ tableName: "SurveyQuestions", timestamps: true })
export class SurveyQuestions extends Model {
  @AutoMap()
  @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true })
  declare surveyQuestionId?: number;

  @AutoMap()
  @Column({ type: DataTypes.STRING })
  declare questionText?: string;

  @AutoMap()
  @Column({ type: DataTypes.INTEGER })
  declare order?: number;

  @AutoMap()
  @ForeignKey(() => QuestionSectionModel)
  @Column({ type: DataTypes.INTEGER, allowNull: true })
  declare questionSectionId?: number;

  @AutoMap()
  @Column({ type: DataTypes.BOOLEAN, defaultValue: true})
  declare systemDefined?: boolean;

  @AutoMap()
  @BelongsTo(() => QuestionSectionModel)
  declare QuestionSection?: QuestionSectionModel;
}
