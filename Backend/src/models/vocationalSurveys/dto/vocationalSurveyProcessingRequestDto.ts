import { AutoMap } from "@automapper/classes";
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { UserVocationalRequestDto } from "../../userVocationalResponses/dto/userVocationalRequestDto";
import { Type } from "class-transformer";

export class VocationalSurveyProcessingRequestDto {
  @AutoMap()
  @IsNumber()
  @IsNotEmpty()
  public userId?: number;

  @AutoMap()
  @IsArray()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @Type(() => UserVocationalRequestDto)
  public surveyAnswers?: UserVocationalRequestDto[];
}
