import { Inject, Service } from "typedi";
import { connection } from "../../../config/configDb";
import { VocationalSurveyProcessingServiceInterface } from "../../../interfaces/services/vocationalSurvey/vocationalSurveyProcessingServiceInterface";
import { VocationalSurveyProcessingRequestDto } from "../../../models/vocationalSurveys/dto/vocationalSurveyProcessingRequestDto";
import { VocationalSurveyProcessingResponseDto } from "../../../models/vocationalSurveys/dto/vocationalSurveyProcessingResponseDto";
import { VocationalSurveyRequestDto } from "../../../models/vocationalSurveys/dto/vocationalSurveyRequestDto";
import { VocationalSurveys } from "../../../models/vocationalSurveys/model/vocationalSurveysModel";
import { GenericRepository } from "../../../repositories/GenericRepository";
import { CareerDetailRegistrarService } from "./careerDetailRegistrarService";
import { CareerRecommendationRegistrarService } from "./careerRecommendationRegistrarService";
import { SurveyValidatorService } from "./surveyValidatorService";
import { SurveyCreatorService } from "./surveyCreatorService";

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
  ): Promise<VocationalSurveyProcessingResponseDto> {
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
      const createSurveyAndUserResponse = await this._surveyCreatorService.handle(request, transaction);

      console.log(createSurveyAndUserResponse, "createSurveyAndUserResponse")

      // Devuelve las carreras recomendadas por la ia
      const careersIA = await this._careerRecommendationRegistrarService.handle(
        createSurveyAndUserResponse.vocationalSurveyId!,
        request.surveyAnswers!,
        transaction)

      console.log(careersIA, "careersIA")

      // Almacena los detalles de las carreras
      const careerDetails = await this._careerDetailRegistrarService.handle(careersIA, transaction);

      console.log(careerDetails, "careerDetails")

      await transaction.commit();

      return {
        vocationalSurveyId: createSurveyAndUserResponse.vocationalSurveyId,
        careerRecommendations: careersIA,
        careerDetails,
      } as VocationalSurveyProcessingResponseDto;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
