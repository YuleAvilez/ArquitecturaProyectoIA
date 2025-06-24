import { Inject, Service } from "typedi";
import { mapper } from "../../config/mapper";
import { SurveyQuestionRequestDto } from "../../models/surveyQuestions/dto/surveyQuestionRequestDto";
import { SurveyQuestionResponseDto } from "../../models/surveyQuestions/dto/surveyQuestionResponseDto";
import { SurveyQuestions } from "../../models/surveyQuestions/model/surveyQuestionsModel";
import { GenericRepository } from "../../repositories/GenericRepository";

@Service()
export class SurveyQuestionGetByIdService {
  constructor(
    @Inject("SurveyQuestionRepository")
    private readonly _repository: GenericRepository<SurveyQuestionRequestDto, SurveyQuestions>
  ) { }

  async handle(surveyQuestionId: number): Promise<SurveyQuestionResponseDto> {
    try {
      const searchEntities = await this._repository.getOne({ where: { surveyQuestionId } });

      const mappedData = mapper.map(searchEntities, SurveyQuestions, SurveyQuestionResponseDto);

      if (!mappedData) {
        throw new Error("La pregunta que esta buscando no existe.");
      }

      return mappedData;
    } catch (error) {
      throw error;
    }
  }
}
