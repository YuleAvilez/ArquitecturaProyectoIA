import { AutoMap } from "@automapper/classes";
import { CareerRecommendationResponseDto } from "../../careerRecommendations/dto/careerRecomendationResponseDto";
import { CareerDetailResponseDto } from "../../careerDetails/dto/careerDetailResponseDto";

export class VocationalSurveyProcessingResponseDto {
  @AutoMap()
  public vocationalSurveyId?: number;

  @AutoMap()
  public careerRecommendations?: CareerRecommendationResponseDto[];

  @AutoMap()
  public careerDetails?: CareerDetailResponseDto[];
}
