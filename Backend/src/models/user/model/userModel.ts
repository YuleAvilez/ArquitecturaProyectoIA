import { AutoMap } from "@automapper/classes";
import { Column, Model, Table } from "sequelize-typescript";
import { DataTypes } from "sequelize";

@Table({ tableName: "Users", timestamps: true })
export class User extends Model {   
  @AutoMap()
  @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true })
  declare IdUsuario?: number;

  @AutoMap()
  @Column({ type: DataTypes.STRING })
  declare Nombres: string;

  @AutoMap()
  @Column({ type: DataTypes.STRING })
  declare Apellidos: string;

  @AutoMap()
  @Column({ type: DataTypes.STRING, unique: true })
  declare Correo: string;

  @AutoMap()
  @Column({ type: DataTypes.STRING })
  declare Contraseña: string;
}
