import { AutoMap } from "@automapper/classes";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { UserVocationalCreateRequestDto } from "../../userVocationalResponses/dto/userVocationalCreateRequestDto";

export class VocationalSurveyProcessingRequestDto {
  @AutoMap()
  @IsNumber()
  @IsNotEmpty()
  public userId?: number;

  @AutoMap()
  @IsArray()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @Type(() => UserVocationalCreateRequestDto)
  public surveyAnswers?: UserVocationalCreateRequestDto[];
}
