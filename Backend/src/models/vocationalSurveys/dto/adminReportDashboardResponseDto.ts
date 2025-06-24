import { CareerRecommendationResponseDto } from "../../careerRecommendations/dto/careerRecomendationResponseDto";
import { UserByGenderIdResponseDto } from "../../user/dto/userByGenderIdResponseDto";
import { VocationSurveyGetByUserIdResponseDto } from "./vocationSurveyGetByUserIdResponseDto";

export class AdminReportDashboardResponseDto {
  public totalUsers?: number;
  public totalSurveys?: number;
  public countByCareer?: { careerName: string; count: number }[];
  public userByGenders?: UserByGenderIdResponseDto;
  public lastSurvey?: VocationSurveyGetByUserIdResponseDto[];
  public careerRecommendations?: CareerRecommendationResponseDto[];
}
