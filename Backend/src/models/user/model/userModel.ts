import { AutoMap } from "@automapper/classes";
import { DataTypes } from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";

@Table({ tableName: "Users", timestamps: true })
/**
 * Definición de la clase User como un modelo Sequelize
 */
export class User extends Model {
  /**
   * Definición de la columna id
   */
  @AutoMap()
  @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true })
  declare userId?: number;

  /**
   * Definición de la columna userName
   */
  @AutoMap()
  @Column({ type: DataTypes.STRING })
  declare userName?: string;

  /**
   * Definición de la columna email
   */
  @AutoMap()
  @Column({ type: DataTypes.STRING })
  declare email?: string;

  /**
   * Definición de la columna password
   */
  @AutoMap()
  @Column({ type: DataTypes.STRING })
  declare password?: string;
}
