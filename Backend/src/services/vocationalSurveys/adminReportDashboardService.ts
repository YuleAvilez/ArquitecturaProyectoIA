import { Inject, Service } from "typedi";
import { mapper } from "../../config/mapper";
import { AdminReportDashboardServiceInterface } from "../../interfaces/services/vocationalSurvey/adminReportDashboardServiceInterface";
import { CareerRecomendationRequestDto } from "../../models/careerRecommendations/dto/careerRecomendationRequestDto";
import { CareerRecommendations } from "../../models/careerRecommendations/model/careerRecommendationsModel";
import { SurveyQuestions } from "../../models/surveyQuestions/model/surveyQuestionsModel";
import { UserRequestDto } from "../../models/user/dto/userRequestDto";
import { User } from "../../models/user/model/userModel";
import { UserVocationalResponses } from "../../models/userVocationalResponses/model/userVocationalResponsesModel";
import { AdminReportDashboardResponseDto } from "../../models/vocationalSurveys/dto/adminReportDashboardResponseDto";
import { VocationalSurveyRequestDto } from "../../models/vocationalSurveys/dto/vocationalSurveyRequestDto";
import { VocationalSurveyResponseDto } from "../../models/vocationalSurveys/dto/vocationalSurveyResponseDto";
import { VocationSurveyGetByUserIdResponseDto } from "../../models/vocationalSurveys/dto/vocationSurveyGetByUserIdResponseDto";
import { VocationalSurveys } from "../../models/vocationalSurveys/model/vocationalSurveysModel";
import { GenericRepository } from "../../repositories/GenericRepository";

@Service()
export class AdminReportDashboardService
  implements AdminReportDashboardServiceInterface
{
  constructor(
    @Inject("VocationalSurveyRepository")
    private readonly _repository: GenericRepository<
      VocationalSurveyRequestDto,
      VocationalSurveys
    >,
    @Inject("CareerRecommendationRepository")
    private readonly _careerRecommendationRepository: GenericRepository<
      CareerRecomendationRequestDto,
      CareerRecommendations
    >,
    @Inject("UserRepository")
    private readonly _userRepository: GenericRepository<UserRequestDto, User>
  ) {}

  async handle(): Promise<AdminReportDashboardResponseDto> {
    try {
      const users = await this._userRepository.getAll();

      const vocationalSurveys = await this._repository.getAll();

      const careerRecommendations =
        await this._careerRecommendationRepository.getAll({
          attributes: [
            "careerNameNormalize",
            [
              this._careerRecommendationRepository.sequelize.fn(
                "COUNT",
                this._careerRecommendationRepository.sequelize.col(
                  "careerNameNormalize"
                )
              ),
              "count",
            ],
          ],
          group: ["careerNameNormalize"],
          order: [
            [
              this._careerRecommendationRepository.sequelize.literal("count"),
              "DESC",
            ],
          ],
        });

      const mappedPlain = careerRecommendations.map((u) => ({
        ...u.get({ plain: true }),
      }));

      const userByGender = {
        masculino: users.filter((x) => x.genderId === 1).length,
        femenino: users.filter((x) => x.genderId === 2).length,
      };

      const lastSurvey = await this._repository.getAll({
        order: [["createdAt", "DESC"]],
        limit: 1,
        include: [
          {
            model: UserVocationalResponses,
            as: "responses",
            include: [{ model: SurveyQuestions, as: "question" }],
          },
          {
            model: CareerRecommendations,
            as: "recommendations",
          },
        ],
      });

      const mappedData = mapper.mapArray(
        lastSurvey,
        VocationalSurveys,
        VocationalSurveyResponseDto
      );

      return {
        totalUsers: users.length,
        totalSurveys: vocationalSurveys.length,
        userByGenders: userByGender,
        countByCareer: mappedPlain.map((x) => ({
          careerName: x.careerNameNormalize,
          count: x.count,
        })),
        lastSurvey: mappedData[0].responses?.map((x) => ({
          surveyQuestionId: x.surveyQuestionId,
          answer: x.answer,
          question: x.question,
        })) as VocationSurveyGetByUserIdResponseDto[],
        careerRecommendations: mappedData[0].recommendations,
      };
    } catch (error) {
      throw error;
    }
  }
}
