import { CareerRecomendationCreateRequestDto } from "../../../models/careerRecommendations/dto/careerRecomendationCreateRequestDto";
import { CareerRecommendationResponseDto } from "../../../models/careerRecommendations/dto/careerRecomendationResponseDto";

export interface ChatGptSurveyServiceInterface {
  handle(
    request: CareerRecomendationCreateRequestDto[]
  ): Promise<CareerRecommendationResponseDto[]>;
}
