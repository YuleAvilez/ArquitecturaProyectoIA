import { validate } from "class-validator";
import { Inject, Service } from "typedi";
import { SurveyQuestionRequestDto } from "../../models/surveyQuestions/dto/surveyQuestionRequestDto";
import { SurveyQuestions } from "../../models/surveyQuestions/model/surveyQuestionsModel";
import { GenericRepository } from "../../repositories/GenericRepository";

@Service()
export class SurveyQuestionCreateService {
  constructor(
    @Inject("SurveyQuestionRepository")
    private readonly _repository: GenericRepository<SurveyQuestionRequestDto, SurveyQuestions>
  ) { }

  async handle(request: SurveyQuestionRequestDto): Promise<boolean> {
    try {
      const errors = await validate(request);

      if (errors?.length > 0) {
        throw new Error("Enviar todos los datos.");
      }

      const createEntity = await this._repository.create(request);

      if (createEntity) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }
}
