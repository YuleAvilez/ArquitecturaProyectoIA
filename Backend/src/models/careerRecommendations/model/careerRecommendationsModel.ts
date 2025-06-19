import { AutoMap } from "@automapper/classes";
import { DataTypes } from "sequelize";
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { VocationalSurveys } from "../../vocationalSurveys/model/vocationalSurveysModel";

@Table({ tableName: "CareerRecommendations", timestamps: true })
export class CareerRecommendations extends Model {
  @AutoMap()
  @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true })
  declare careerRecommendationsId?: number;

  @AutoMap()
  @ForeignKey(() => VocationalSurveys)
  @Column({ type: DataTypes.INTEGER })
  declare vocationalSurveyId?: number;

  @AutoMap()
  @Column({ type: DataTypes.STRING })
  declare careerName?: string;

  @AutoMap()
  @Column({ type: DataTypes.STRING })
  declare description?: string;

  @AutoMap()
  @Column({ type: DataTypes.DATE })
  declare createdAt?: Date;
}
