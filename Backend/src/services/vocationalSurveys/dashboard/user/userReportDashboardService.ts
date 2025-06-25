import { Inject, Service } from "typedi";
import { UserReportDashboardServiceInterface } from "../../../../interfaces/services/vocationalSurvey/userReportDashboardServiceInterface";
import { CareerDetailRequestDto } from "../../../../models/careerDetails/dto/careerDetailRequestDto";
import { CareerDetailResponseDto } from "../../../../models/careerDetails/dto/careerDetailResponseDto";
import { CareerDetails } from "../../../../models/careerDetails/model/careerDetailsModel";
import { CareerRecommendationResponseDto } from "../../../../models/careerRecommendations/dto/careerRecomendationResponseDto";
import { CareerRecommendations } from "../../../../models/careerRecommendations/model/careerRecommendationsModel";
import { VocationalSurveyProcessingResponseDto } from "../../../../models/vocationalSurveys/dto/vocationalSurveyProcessingResponseDto";
import { VocationalSurveyRequestDto } from "../../../../models/vocationalSurveys/dto/vocationalSurveyRequestDto";
import { VocationalSurveys } from "../../../../models/vocationalSurveys/model/vocationalSurveysModel";
import { GenericRepository } from "../../../../repositories/GenericRepository";

@Service()
export class UserReportDashboardService
  implements UserReportDashboardServiceInterface {
  constructor(
    @Inject("VocationalSurveyRepository")
    private readonly _repository: GenericRepository<
      VocationalSurveyRequestDto,
      VocationalSurveys
    >,
    @Inject("CareerDetailRepository")
    private readonly _careerDetailRepository: GenericRepository<
      CareerDetailRequestDto,
      CareerDetails
    >
  ) { }

  async handle(userId: number): Promise<VocationalSurveyProcessingResponseDto> {
    try {
      const mySurvey = await this._repository.getOne({
        where: { userId },
        include: [{ model: CareerRecommendations, as: "recommendations" }],
      });

      const mappedPlain = mySurvey?.get({ plain: true });

      if (!mappedPlain) {
        throw new Error("No existe una encuesta para este usuario.");
      }

      const careerRecommendations = mappedPlain.recommendations.map(
        (x: CareerRecommendations) => ({
          careerName: x.careerName,
          description: x.description,
        })
      ) as CareerRecommendationResponseDto[];

      const careerDetails: CareerDetailResponseDto[] = [];

      for (const recommendation of mappedPlain.recommendations) {
        const detail = await this._careerDetailRepository.getOne({
          where: { careerNameNormalize: recommendation.careerNameNormalize },
        });

        const plainDetail = detail?.get({ plain: true });

        careerDetails.push({
          careerName: plainDetail?.careerName,
          salary: plainDetail?.salary,
          trends: JSON.parse(plainDetail?.trends),
          sources: JSON.parse(plainDetail?.sources),
        });
      }

      const responses = {
        vocationalSurveyId: mappedPlain.vocationalSurveyId,
        careerRecommendations,
        careerDetails,
      };

      return responses;
    } catch (error) {
      throw error;
    }
  }
}
