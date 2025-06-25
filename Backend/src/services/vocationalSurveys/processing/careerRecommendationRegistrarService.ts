import { Transaction } from "sequelize";
import { Inject, Service } from "typedi";
import { ChatGptSurveyServiceInterface } from "../../../interfaces/services/vocationalSurvey/chatGptSurveyServiceInterface";
import { CareerRecomendationCreateRequestDto } from "../../../models/careerRecommendations/dto/careerRecomendationCreateRequestDto";
import { CareerRecomendationRequestDto } from "../../../models/careerRecommendations/dto/careerRecomendationRequestDto";
import { CareerRecommendationResponseDto } from "../../../models/careerRecommendations/dto/careerRecomendationResponseDto";
import { CareerRecommendations } from "../../../models/careerRecommendations/model/careerRecommendationsModel";
import { UserVocationalCreateRequestDto } from "../../../models/userVocationalResponses/dto/userVocationalCreateRequestDto";
import { GenericRepository } from "../../../repositories/GenericRepository";
import { normalizeText } from "../../../utils";

@Service()
export class CareerRecommendationRegistrarService {

    constructor(
        @Inject("CareerRecommendationRepository")
        private readonly _careerRecomendationRepository: GenericRepository<
            CareerRecomendationRequestDto,
            CareerRecommendations
        >,
        @Inject("ChatGptSurveyServiceInterface")
        private readonly _chatgptSurveyService: ChatGptSurveyServiceInterface
    ) { }

    async handle(
        vocationalSurveyId: number,
        surveyAnswers: UserVocationalCreateRequestDto[],
        transaction: Transaction
    ): Promise<CareerRecommendationResponseDto[]> {
        try {
            // Formatear las respuestas de la encuesta
            const answers: CareerRecomendationCreateRequestDto[] =
                surveyAnswers!.map((x) => ({ answer: x.answer }));

            // Obtener las recomendaciones de carrera desde ChatGPT
            const carrerasIA: CareerRecommendationResponseDto[] =
                await this._chatgptSurveyService.handle(answers);

            console.log(carrerasIA, "carrerasIA")

            for (const career of carrerasIA) {
                await this._careerRecomendationRepository.create({
                    vocationalSurveyId,
                    careerName: career.careerName,
                    careerNameNormalize: normalizeText(career.careerName!),
                    description: career.description,
                }, { transaction });
            }

            return carrerasIA;
        } catch (error) {
            throw error;
        }
    }
}