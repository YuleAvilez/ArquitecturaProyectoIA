import { AutoMap } from "@automapper/classes";
import { DataTypes } from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";

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
  @Column({ type: DataTypes.BOOLEAN, defaultValue: true})
  declare systemDefined?: boolean;
}
