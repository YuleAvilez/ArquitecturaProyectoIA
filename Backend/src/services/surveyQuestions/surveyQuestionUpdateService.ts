import { Inject, Service } from "typedi";
import { mapper } from "../../config/mapper";
import { SurveyQuestionRequestDto } from "../../models/surveyQuestions/dto/surveyQuestionRequestDto";
import { SurveyQuestionResponseDto } from "../../models/surveyQuestions/dto/surveyQuestionResponseDto";
import { SurveyQuestions } from "../../models/surveyQuestions/model/surveyQuestionsModel";
import { GenericRepository } from "../../repositories/GenericRepository";

@Service()
export class SurveyQuestionUpdateService {
  constructor(
    @Inject("SurveyQuestionRepository")
    private readonly _repository: GenericRepository<SurveyQuestionRequestDto, SurveyQuestions>
  ) { }

  async handle(surveyQuestionId: number, request: SurveyQuestionRequestDto): Promise<boolean> {
    try {
      const searchEntities = await this._repository.update(request, { where: { surveyQuestionId } });

      const mappedData = mapper.map(searchEntities, SurveyQuestions, SurveyQuestionResponseDto);

      return mappedData ? true : false;
    } catch (error) {
      throw error;
    }
  }
}
