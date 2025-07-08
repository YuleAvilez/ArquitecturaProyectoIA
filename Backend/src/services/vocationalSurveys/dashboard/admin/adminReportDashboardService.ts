import { Inject, Service } from "typedi";

import { AdminReportDashboardServiceInterface } from "../../../../interfaces/services/vocationalSurvey/adminReportDashboardServiceInterface";
import { UserRequestDto } from "../../../../models/user/dto/userRequestDto";
import { User } from "../../../../models/user/model/userModel";
import { AdminReportDashboardResponseDto } from "../../../../models/vocationalSurveys/dto/adminReportDashboardResponseDto";
import { VocationalSurveyRequestDto } from "../../../../models/vocationalSurveys/dto/vocationalSurveyRequestDto";
import { VocationSurveyGetByUserIdResponseDto } from "../../../../models/vocationalSurveys/dto/vocationSurveyGetByUserIdResponseDto";
import { VocationalSurveys } from "../../../../models/vocationalSurveys/model/vocationalSurveysModel";
import { GenericRepository } from "../../../../repositories/GenericRepository";
import { GetGroupedCareerRecommendations } from "./getGroupedCareerRecommendation";
import { GetLastSurvey } from "./getLastSurvey";

@Service()
export class AdminReportDashboardService
  implements AdminReportDashboardServiceInterface {
  constructor(
    @Inject("VocationalSurveyRepository")
    private readonly _repository: GenericRepository<
      VocationalSurveyRequestDto,
      VocationalSurveys
    >,
    @Inject("UserRepository")
    private readonly _userRepository: GenericRepository<UserRequestDto, User>,
    @Inject()
    private readonly _getGroupedCareerRecommendations: GetGroupedCareerRecommendations,
    @Inject()
    private readonly _getLastSurvey: GetLastSurvey
  ) { }

  async handle(): Promise<AdminReportDashboardResponseDto> {
    try {
      const users = await this._userRepository.getAll();
      const lastSurvey = await this._getLastSurvey.handle();
      const vocationalSurveys = await this._repository.getAll();
      const countByCareer = await this._getGroupedCareerRecommendations.handle();

      const userByGender = {
        masculino: users.filter((x) => x.genderId === 1).length,
        femenino: users.filter((x) => x.genderId === 0).length,
      };

      const response: AdminReportDashboardResponseDto = {
        totalUsers: users.length,
        totalSurveys: vocationalSurveys.length,
        userByGenders: userByGender,
        countByCareer: countByCareer,
        lastSurvey: lastSurvey.responses?.map((x) => ({
          surveyQuestionId: x.surveyQuestionId,
          question: x.question?.questionText,
          answer: x.answer,
        })) as VocationSurveyGetByUserIdResponseDto[],
        careerRecommendations: lastSurvey.recommendations?.map(x => ({
          careerName: x.careerName,
          description: x.description
        })),
      }

      return response;
    } catch (error) {
      throw error;
    }
  }
}
