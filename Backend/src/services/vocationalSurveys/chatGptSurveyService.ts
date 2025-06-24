import OpenAI from "openai";
import { Inject, Service } from "typedi";
import { ChatGptSurveyServiceInterface } from "../../interfaces/services/vocationalSurvey/chatGptSurveyServiceInterface";
import { GenerateCareerDescriptionServiceInterface } from "../../interfaces/services/vocationalSurvey/generateCareerDescriptionServiceInterface";
import { CareerRecomendationCreateRequestDto } from "../../models/careerRecommendations/dto/careerRecomendationCreateRequestDto";
import { CareerRecomendationRequestDto } from "../../models/careerRecommendations/dto/careerRecomendationRequestDto";
import { CareerRecommendationResponseDto } from "../../models/careerRecommendations/dto/careerRecomendationResponseDto";
import { CareerRecommendations } from "../../models/careerRecommendations/model/careerRecommendationsModel";
import { GenericRepository } from "../../repositories/GenericRepository";
import { formatAnswers, normalizeText } from "../../utils";

@Service()
export class ChatGptSurveyService implements ChatGptSurveyServiceInterface {
  private readonly openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  constructor(
    @Inject("CareerRecommendationRepository")
    private readonly _careerRecommendationRepository: GenericRepository<
      CareerRecomendationRequestDto,
      CareerRecommendations
    >,
    @Inject("GenerateCareerDescriptionServiceInterface")
    private readonly _generateCareerDescriptionService: GenerateCareerDescriptionServiceInterface
  ) {}

  async handle(
    request: CareerRecomendationCreateRequestDto[]
  ): Promise<CareerRecommendationResponseDto[]> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `Eres un orientador vocacional. Recibirás 10 respuestas a un formulario fijo con preguntas conocidas. Basado en esas respuestas, recomienda 3 carreras en formato JSON como:
            [
                {
                    "careerName": "Nombre"
                }
            ]`,
          },
          { role: "user", content: formatAnswers(request) },
        ],
        temperature: 0.7,
      });

      const content = completion.choices[0].message?.content;

      if (!content)
        throw new Error("No se recibió contenido de respuesta desde ChatGPT.");

      let parsed: { careerName: string }[];
      try {
        parsed = JSON.parse(content);
      } catch (err) {
        throw new Error("La respuesta de ChatGPT no tiene un formato válido.");
      }

      const response: CareerRecommendationResponseDto[] = [];

      for (const career of parsed) {
        const normalizedCareerName = normalizeText(career.careerName);

        const careerRecommendationExisted =
          await this._careerRecommendationRepository.getOne({
            where: { careerNameNormalize: normalizedCareerName },
          });

        const mapped = careerRecommendationExisted?.get({ plain: true });

        if (mapped) {
          response.push({
            careerName: mapped.careerName,
            description: mapped.description,
          });
        } else {
          const description =
            await this._generateCareerDescriptionService.handle(
              career.careerName
            );

          response.push({
            careerName: career.careerName,
            description,
          });
        }
      }
      return response;
    } catch (error) {
      throw error;
    }
  }
}
