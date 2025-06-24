import { VocationalSurveyProcessingResponseDto } from "../../../models/vocationalSurveys/dto/vocationalSurveyProcessingResponseDto";

export interface UserReportDashboardServiceInterface {
  handle(userId: number): Promise<VocationalSurveyProcessingResponseDto>;
}
