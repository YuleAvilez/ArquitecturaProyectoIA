import { AutoMap } from "@automapper/classes";
import { DataTypes } from "sequelize";
import { Column, Model, Table} from "sequelize-typescript";

@Table({ tableName: "SectionsQuestions", timestamps: false })
export class QuestionSectionModel extends Model {
  @AutoMap()
  @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true })
  declare idSection?: number;

  @AutoMap()
  @Column({ type: DataTypes.STRING })
  declare titleSection?: string;
}
