import { createMap } from "@automapper/core";
import { mapper } from "../../../config/mapper";
import { CareerRecommendationResponseDto } from "../../../models/careerRecommendations/dto/careerRecomendationResponseDto";
import { CareerRecommendations } from "../../../models/careerRecommendations/model/careerRecommendationsModel";
import { UserVocationalRequestDto } from "../../../models/userVocationalResponses/dto/userVocationalRequestDto";

export class CareerRecommendationMapper {
  static defineMapper(): void {
    createMap(mapper, UserVocationalRequestDto, CareerRecommendations);
    createMap(mapper, CareerRecommendations, CareerRecommendationResponseDto);
    createMap(mapper, CareerRecommendationResponseDto, CareerRecommendations);
    createMap(mapper, CareerRecommendations, UserVocationalRequestDto);
  }
}
