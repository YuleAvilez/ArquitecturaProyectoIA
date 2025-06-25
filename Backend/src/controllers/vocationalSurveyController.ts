import { Body, Get, JsonController, Param, Post } from "routing-controllers";
import { Inject, Service } from "typedi";
import { AdminReportDashboardServiceInterface } from "../interfaces/services/vocationalSurvey/adminReportDashboardServiceInterface";
import { GetUserVocationalResponseByUserIdServiceInterface } from "../interfaces/services/vocationalSurvey/getUserVocationalResponseByUserIdServiceInterface";
import { UserReportDashboardServiceInterface } from "../interfaces/services/vocationalSurvey/userReportDashboardServiceInterface";
import { VocationalSurveyProcessingServiceInterface } from "../interfaces/services/vocationalSurvey/vocationalSurveyProcessingServiceInterface";
import { AdminReportDashboardResponseDto } from "../models/vocationalSurveys/dto/adminReportDashboardResponseDto";
import { VocationalSurveyProcessingRequestDto } from "../models/vocationalSurveys/dto/vocationalSurveyProcessingRequestDto";
import { VocationalSurveyProcessingResponseDto } from "../models/vocationalSurveys/dto/vocationalSurveyProcessingResponseDto";
import { VocationSurveyGetByUserIdResponseDto } from "../models/vocationalSurveys/dto/vocationSurveyGetByUserIdResponseDto";

@Service()
@JsonController()
export class VocationalSurveyController {
  constructor(
    @Inject("VocationalSurveyProcessingServiceInterface")
    private readonly _vocationalSurveyProcessingServiceInterface: VocationalSurveyProcessingServiceInterface,
    @Inject("GetUserVocationalResponseByUserIdServiceInterface")
    private readonly _getUserVocationalResponseByUserIdServiceInterface: GetUserVocationalResponseByUserIdServiceInterface,
    @Inject("AdminReportDashboardServiceInterface")
    private readonly _adminReportDashboardServiceInterface: AdminReportDashboardServiceInterface,
    @Inject("UserReportDashboardServiceInterface")
    private readonly _userReportDashboardServiceInterface: UserReportDashboardServiceInterface
  ) { }

  @Post("/processingAnswers")
  async processingAnswers(
    @Body() request: VocationalSurveyProcessingRequestDto
  ): Promise<VocationalSurveyProcessingResponseDto> {
    return await this._vocationalSurveyProcessingServiceInterface.handle(
      request
    );
  }

  @Get("/getSurveyByUserId/:userId")
  async getSurveyByUserId(
    @Param("userId") userId: number
  ): Promise<VocationSurveyGetByUserIdResponseDto[]> {
    return await this._getUserVocationalResponseByUserIdServiceInterface.handle(
      userId
    );
  }

  @Get("/adminReport")
  async adminReport(): Promise<AdminReportDashboardResponseDto> {
    return await this._adminReportDashboardServiceInterface.handle();
  }

  @Get("/userReport/:userId")
  async userReport(
    @Param("userId") userId: number
  ): Promise<VocationalSurveyProcessingResponseDto> {
    return await this._userReportDashboardServiceInterface.handle(userId);
  }
}
