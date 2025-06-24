import { AdminReportDashboardResponseDto } from "../../../models/vocationalSurveys/dto/adminReportDashboardResponseDto";

export interface AdminReportDashboardServiceInterface {
  handle(): Promise<AdminReportDashboardResponseDto>;
}
