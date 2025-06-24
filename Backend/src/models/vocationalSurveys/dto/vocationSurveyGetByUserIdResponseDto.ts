import { AutoMap } from "@automapper/classes";

export class VocationSurveyGetByUserIdResponseDto {
  @AutoMap()
  public surveyQuestionId?: number;

  @AutoMap()
  public question?: string;

  @AutoMap()
  public answer?: string;
}
