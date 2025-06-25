import { UserReportDashboardResponseDto } from "../../../models/vocationalSurveys/dto/userReportDashboardResponseDto";
import { VocationalSurveyRequestDto } from "../../../models/vocationalSurveys/dto/vocationalSurveyRequestDto";

export interface VocationalSurveyProcessingServiceInterface {
  handle(
    request: VocationalSurveyRequestDto
  ): Promise<UserReportDashboardResponseDto>;
}
