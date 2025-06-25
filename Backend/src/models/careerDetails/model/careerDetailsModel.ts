import { AutoMap } from "@automapper/classes";
import { DataTypes } from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";

@Table({ tableName: "CareerDetails", timestamps: true })
export class CareerDetails extends Model {
  @AutoMap()
  @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true })
  declare careerDetailId?: number;

  @AutoMap()
  @Column({ type: DataTypes.STRING })
  declare careerName?: string;

  @AutoMap()
  @Column({ type: DataTypes.STRING })
  declare careerNameNormalize?: string;

  @AutoMap()
  @Column({ type: DataTypes.STRING })
  declare salary?: string;

  @AutoMap()
  @Column({ type: DataTypes.TEXT })
  declare trends?: string;

  @AutoMap()
  @Column({ type: DataTypes.TEXT })
  declare sources?: string;

  @AutoMap()
  @Column({ type: DataTypes.DATE })
  declare createdAt?: Date;
}
