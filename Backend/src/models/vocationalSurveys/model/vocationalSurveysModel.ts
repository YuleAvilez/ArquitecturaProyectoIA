import { AutoMap } from "@automapper/classes";
import { DataTypes } from "sequelize";
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../../user/model/userModel";

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
  @Column({ type: DataTypes.DATE })
  declare createdAt?: Date;
}
