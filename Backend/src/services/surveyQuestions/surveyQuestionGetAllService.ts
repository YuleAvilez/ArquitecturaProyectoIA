import { Inject, Service } from "typedi";
import { mapper } from "../../config/mapper";
import { SurveyQuestionGetAllServiceInterface } from "../../interfaces/services/surveyQuestion/surveyQuestionGetAllServiceInterface";
import { SurveyQuestionRequestDto } from "../../models/surveyQuestions/dto/surveyQuestionRequestDto";
import { SurveyQuestionResponseDto } from "../../models/surveyQuestions/dto/surveyQuestionResponseDto";
import { SurveyQuestions } from "../../models/surveyQuestions/model/surveyQuestionsModel";
import { GenericRepository } from "../../repositories/GenericRepository";

@Service()
export class SurveyQuestionGetAllService implements SurveyQuestionGetAllServiceInterface {
  constructor(
    @Inject("SurveyQuestionRepository")
    private readonly _repository: GenericRepository<SurveyQuestionRequestDto, SurveyQuestions>
  ) { }

  async handle(): Promise<SurveyQuestionResponseDto[]> {
    try {
      const searchEntities = await this._repository.getAll();

      const mappedData = mapper.mapArray(searchEntities, SurveyQuestions, SurveyQuestionResponseDto);

      return mappedData;
    } catch (error) {
      throw error;
    }
  }
}
