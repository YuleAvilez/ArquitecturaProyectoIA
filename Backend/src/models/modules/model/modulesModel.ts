import { AutoMap } from "@automapper/classes";
import { DataTypes } from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";

@Table({ tableName: "Modules", timestamps: true })
export class Modules extends Model {
  @AutoMap()
  @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true })
  declare moduleId?: number;

  @AutoMap()
  @Column({ type: DataTypes.STRING })
  declare name?: string;

  @AutoMap()
  @Column({ type: DataTypes.STRING, allowNull: true })
  declare route?: string;
}
