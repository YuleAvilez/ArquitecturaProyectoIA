import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserVocationalCreateRequestDto {
  @AutoMap()
  @IsNumber()
  @IsNotEmpty()
  public surveyQuestionId?: number;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  public answer?: string;
}
