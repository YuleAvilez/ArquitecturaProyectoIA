import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, IsNumber } from "class-validator";

export class VocationalSurveyRequestDto {
  @AutoMap()
  @IsNumber()
  @IsNotEmpty()
  public userId?: number;
}
