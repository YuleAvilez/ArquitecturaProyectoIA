import { AutoMap } from "@automapper/classes";
import { SurveyQuestionResponseDto } from "../../surveyQuestions/dto/surveyQuestionResponseDto";

export class UserVocationalResponseDto {
  @AutoMap()
  public surveyQuestionId?: number;

  @AutoMap()
  public answer?: string;

  @AutoMap()
  public question?: SurveyQuestionResponseDto;
}
