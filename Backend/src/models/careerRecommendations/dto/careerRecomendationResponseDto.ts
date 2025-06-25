import { AutoMap } from "@automapper/classes";
import { VocationalSurveyResponseDto } from "../../vocationalSurveys/dto/vocationalSurveyResponseDto";

export class CareerRecommendationResponseDto {
  @AutoMap()
  public careerName?: string;

  @AutoMap()
  public description?: string;

  @AutoMap()
  public vocationalSurvey?: VocationalSurveyResponseDto;
}
