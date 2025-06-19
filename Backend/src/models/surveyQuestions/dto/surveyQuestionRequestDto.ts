import { AutoMap } from "@automapper/classes";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SurveyQuestionRequestDto {
  @AutoMap()
  @IsNumber()
  @IsNotEmpty()
  public surveyQuestionsId?: number;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  public questionText?: string;

  @AutoMap()
  @IsNumber()
  @IsNotEmpty()
  public order?: number;

  @AutoMap()
  @IsBoolean()
  @IsNotEmpty()
  public systemDefined?: boolean;
}
