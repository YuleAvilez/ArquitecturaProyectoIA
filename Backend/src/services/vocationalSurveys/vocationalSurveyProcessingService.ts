import { validate } from "class-validator";
import { Inject, Service } from "typedi";
import { ChatGptSurveyServiceInterface } from "../../interfaces/services/vocationalSurvey/chatGptSurveyServiceInterface";
import { GenerateCareerDetailsServiceInterface } from "../../interfaces/services/vocationalSurvey/generateCareerDetailsServiceInterface";
import { VocationalSurveyProcessingServiceInterface } from "../../interfaces/services/vocationalSurvey/vocationalSurveyProcessingServiceInterface";
import { CareerDetailRequestDto } from "../../models/careerDetails/dto/careerDetailRequestDto";
import { CareerDetailResponseDto } from "../../models/careerDetails/dto/careerDetailResponseDto";
import { CareerDetails } from "../../models/careerDetails/model/careerDetailsModel";
import { CareerRecomendationCreateRequestDto } from "../../models/careerRecommendations/dto/careerRecomendationCreateRequestDto";
import { CareerRecomendationRequestDto } from "../../models/careerRecommendations/dto/careerRecomendationRequestDto";
import { CareerRecommendationResponseDto } from "../../models/careerRecommendations/dto/careerRecomendationResponseDto";
import { CareerRecommendations } from "../../models/careerRecommendations/model/careerRecommendationsModel";
import { VocationalSurveyProcessingRequestDto } from "../../models/vocationalSurveys/dto/vocationalSurveyProcessingRequestDto";
import { VocationalSurveyProcessingResponseDto } from "../../models/vocationalSurveys/dto/vocationalSurveyProcessingResponseDto";
import { VocationalSurveyRequestDto } from "../../models/vocationalSurveys/dto/vocationalSurveyRequestDto";
import { VocationalSurveys } from "../../models/vocationalSurveys/model/vocationalSurveysModel";
import { GenericRepository } from "../../repositories/GenericRepository";
import { normalizeText } from "../../utils";

@Service()
export class VocationalSurveyProcessingService
  implements VocationalSurveyProcessingServiceInterface
{
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
    >,
    @Inject("CareerRecommendationRepository")
    private readonly _careerRecomendationRepository: GenericRepository<
      CareerRecomendationRequestDto,
      CareerRecommendations
    >,
    @Inject("ChatGptSurveyServiceInterface")
    private readonly _chatgptSurveyService: ChatGptSurveyServiceInterface,
    @Inject("GenerateCareerDetailsServiceInterface")
    private readonly _generateCreerDetailsService: GenerateCareerDetailsServiceInterface
  ) {}

  async handle(
    request: VocationalSurveyProcessingRequestDto
  ): Promise<VocationalSurveyProcessingResponseDto> {
    try {
      const errors = await validate(request);

      if (errors?.length > 0) {
        throw new Error("Enviar todos los datos.");
      }

      if (!request.surveyAnswers) {
        throw new Error("No se han enviado respuestas a la encuesta.");
      }

      const hasSurvey = await this._repository.getOne({
        where: { userId: request.userId },
      });

      const mappedData = hasSurvey?.get({ plain: true });

      if (mappedData) {
        throw new Error("Ya existe una encuesta para este usuario.");
      }

      // Guardar la encuesta
      const savedSurvey = await this._repository.create({
        userId: request.userId,
      });

      const plain = savedSurvey.get({ plain: true });

      // Formatear las respuestas de la encuesta
      const answers: CareerRecomendationCreateRequestDto[] =
        request.surveyAnswers.map((x) => ({ answer: x.answer }));

      // Obtener las recomendaciones de carrera desde ChatGPT
      const carrerasIA: CareerRecommendationResponseDto[] =
        await this._chatgptSurveyService.handle(answers);

      for (const career of carrerasIA) {
        await this._careerRecomendationRepository.create({
          vocationalSurveyId: plain.vocationalSurveyId,
          careerName: career.careerName,
          careerNameNormalize: normalizeText(career.careerName!),
          description: career.description,
        });
      }

      const resultado: CareerDetailResponseDto[] = [];

      for (const career of carrerasIA) {
        const normalizedCareerName = normalizeText(career.careerName!);

        const existed = await this._careerDetailRepository.getOne({
          where: { careerNameNormalize: normalizedCareerName },
        });

        const mapped = existed?.get({ plain: true });

        if (mapped) {
          resultado.push({
            careerName: mapped.careerName,
            salary: mapped.salary,
            trends: JSON.parse(mapped.trends),
            sources: JSON.parse(mapped.sources),
          });
        } else {
          const careerDetails = await this._generateCreerDetailsService.handle(
            career.careerName!
          );

          await this._careerDetailRepository.create({
            careerName: careerDetails.careerName,
            careerNameNormalize: normalizeText(careerDetails.careerName!),
            salary: careerDetails.salary,
            trends: JSON.stringify(careerDetails.trends),
            sources: JSON.stringify(careerDetails.sources),
          });

          resultado.push(careerDetails);
        }
      }

      return {
        vocationalSurveyId: plain.vocationalSurveyId,
        careerRecommendations: carrerasIA,
        careerDetails: resultado,
      };
    } catch (error) {
      throw error;
    }
  }
}
