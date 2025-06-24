import { Inject, Service } from "typedi";
import { mapper } from "../../config/mapper";
import { GetUserVocationalResponseByUserIdServiceInterface } from "../../interfaces/services/vocationalSurvey/getUserVocationalResponseByUserIdServiceInterface";
import { SurveyQuestions } from "../../models/surveyQuestions/model/surveyQuestionsModel";
import { UserVocationalResponses } from "../../models/userVocationalResponses/model/userVocationalResponsesModel";
import { VocationalSurveyRequestDto } from "../../models/vocationalSurveys/dto/vocationalSurveyRequestDto";
import { VocationalSurveyResponseDto } from "../../models/vocationalSurveys/dto/vocationalSurveyResponseDto";
import { VocationSurveyGetByUserIdResponseDto } from "../../models/vocationalSurveys/dto/vocationSurveyGetByUserIdResponseDto";
import { VocationalSurveys } from "../../models/vocationalSurveys/model/vocationalSurveysModel";
import { GenericRepository } from "../../repositories/GenericRepository";

@Service()
export class GetUserVocationalResponseByUserIdService
  implements GetUserVocationalResponseByUserIdServiceInterface
{
  constructor(
    @Inject("VocationalSurveyRepository")
    private readonly _repository: GenericRepository<
      VocationalSurveyRequestDto,
      VocationalSurveys
    >
  ) {}

  async handle(
    userId: number
  ): Promise<VocationSurveyGetByUserIdResponseDto[]> {
    try {
      const mySurvey = await this._repository.getOne({
        where: { userId },
        include: [
          {
            model: UserVocationalResponses,
            as: "responses",
            include: [{ model: SurveyQuestions, as: "question" }],
          },
        ],
      });

      const mappedData = mapper.map(
        mySurvey,
        VocationalSurveys,
        VocationalSurveyResponseDto
      );

      if (!mappedData) {
        throw new Error("No existe una encuesta para este usuario.");
      }

      const resultado: VocationSurveyGetByUserIdResponseDto[] = [];

      for (const response of mappedData?.responses!) {
        resultado.push({
          surveyQuestionId: response.surveyQuestionId,
          question: response.question?.questionText,
          answer: response.answer,
        });
      }

      return resultado;
    } catch (error) {
      throw error;
    }
  }
}
