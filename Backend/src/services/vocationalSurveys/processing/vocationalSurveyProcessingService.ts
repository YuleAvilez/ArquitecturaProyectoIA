import { Inject, Service } from "typedi";
import { connection } from "../../../config/configDb";
import { VocationalSurveyProcessingServiceInterface } from "../../../interfaces/services/vocationalSurvey/vocationalSurveyProcessingServiceInterface";
import { DataUserDashboard } from "../../../models/vocationalSurveys/dto/dataUserDashboard";
import { UserReportDashboardResponseDto } from "../../../models/vocationalSurveys/dto/userReportDashboardResponseDto";
import { VocationalSurveyProcessingRequestDto } from "../../../models/vocationalSurveys/dto/vocationalSurveyProcessingRequestDto";
import { VocationalSurveyRequestDto } from "../../../models/vocationalSurveys/dto/vocationalSurveyRequestDto";
import { VocationalSurveys } from "../../../models/vocationalSurveys/model/vocationalSurveysModel";
import { GenericRepository } from "../../../repositories/GenericRepository";
import { CareerDetailRegistrarService } from "./careerDetailRegistrarService";
import { CareerRecommendationRegistrarService } from "./careerRecommendationRegistrarService";
import { SurveyCreatorService } from "./surveyCreatorService";
import { SurveyValidatorService } from "./surveyValidatorService";

@Service()
export class VocationalSurveyProcessingService
  implements VocationalSurveyProcessingServiceInterface {
  constructor(
    @Inject("VocationalSurveyRepository")
    private readonly _repository: GenericRepository<
      VocationalSurveyRequestDto,
      VocationalSurveys
    >,
    @Inject()
    private readonly _surveyValidatorService: SurveyValidatorService,
    @Inject()
    private readonly _surveyCreatorService: SurveyCreatorService,
    @Inject()
    private readonly _careerRecommendationRegistrarService: CareerRecommendationRegistrarService,
    @Inject()
    private readonly _careerDetailRegistrarService: CareerDetailRegistrarService
  ) { }

  async handle(
    request: VocationalSurveyProcessingRequestDto
  ): Promise<UserReportDashboardResponseDto> {
    const transaction = await connection.transaction();

    try {
      await this._surveyValidatorService.validateInput(request);

      const hasSurvey = await this._repository.getOne({
        where: { userId: request.userId },
      });

      const mappedData = hasSurvey?.get({ plain: true });

      if (mappedData) {
        throw new Error("Ya existe una encuesta para este usuario.");
      }

      // Guardar la encuesta y las respuestas del usuario
      const { vocationalSurveyId } = await this._surveyCreatorService.handle(request, transaction);

      console.log(vocationalSurveyId, "vocationalSurveyId")

      // Devuelve las carreras recomendadas por la ia
      const recommendedCareers = await this._careerRecommendationRegistrarService.handle(
        vocationalSurveyId!,
        request.surveyAnswers!,
        transaction)

      console.log(recommendedCareers, "recommendedCareers")

      // Almacena los detalles de las carreras
      const careerDetails = await this._careerDetailRegistrarService.handle(recommendedCareers, transaction);

      console.log(careerDetails, "careerDetails")

      const data: DataUserDashboard[] = recommendedCareers.map((career, index) => ({
        careerName: career.careerName,
        description: career.description,
        salary: careerDetails[index]?.salary,
        trends: careerDetails[index]?.trends,
        sources: careerDetails[index]?.sources,
      }));

      await transaction.commit();

      return {
        vocationalSurveyId,
        data
      };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
