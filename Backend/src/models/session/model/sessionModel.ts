import { AutoMap } from "@automapper/classes";
import { DataTypes } from "sequelize";
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../user/model/userModel";

@Table({ tableName: "Sessions", timestamps: true })
/**
 * Definición de la clase Session como un modelo Sequelize
 */
export class Session extends Model {
  /**
   * Definición de la columna id
   */
  @AutoMap()
  @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true })
  declare sessionId?: number;

  /**
   * Definición del identificador con la tabla User
   */
  @AutoMap()
  @ForeignKey(() => User)
  @Column({ type: DataTypes.INTEGER })
  declare userId?: number;

  /**
   * Definición de la columna refreshToken
   */
  @AutoMap()
  @Column({ type: DataTypes.STRING })
  declare refreshToken?: string;

  /**
   * Definición de la columna expiresIn
   */
  @AutoMap()
  @Column({ type: DataTypes.DATE })
  declare expiresIn?: Date;

  /**
   * Relaciones
   */
  @BelongsTo(() => User)
  declare user?: User;
}
