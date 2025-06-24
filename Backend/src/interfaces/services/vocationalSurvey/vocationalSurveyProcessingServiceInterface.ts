import { VocationalSurveyProcessingResponseDto } from "../../../models/vocationalSurveys/dto/vocationalSurveyProcessingResponseDto";
import { VocationalSurveyRequestDto } from "../../../models/vocationalSurveys/dto/vocationalSurveyRequestDto";

export interface VocationalSurveyProcessingServiceInterface {
  handle(
    request: VocationalSurveyRequestDto
  ): Promise<VocationalSurveyProcessingResponseDto>;
}
