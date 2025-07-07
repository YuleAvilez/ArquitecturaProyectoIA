import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, IsNumber } from "class-validator";

export class QuestionSectionRequestDto {
  @AutoMap()
  @IsNumber()
  @IsNotEmpty()
  public questionSection?: number;
}
