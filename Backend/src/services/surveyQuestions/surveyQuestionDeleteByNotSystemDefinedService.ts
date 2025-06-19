import { Inject, Service } from "typedi";
import { SurveyQuestionRequestDto } from "../../models/surveyQuestions/dto/surveyQuestionRequestDto";
import { SurveyQuestions } from "../../models/surveyQuestions/model/surveyQuestionsModel";
import { GenericRepository } from "../../repositories/GenericRepository";

@Service()
export class SurveyQuestionDeleteNotSystemDefinedService {
  constructor(
    @Inject("SurveyQuestionRepository")
    private readonly _repository: GenericRepository<SurveyQuestionRequestDto, SurveyQuestions>
  ) { }

  async handle(surveyQuestionId: number): Promise<boolean> {
    try {
      const searchEntity = await this._repository.getOne({ where: { surveyQuestionId } });

      if (!searchEntity) {
        throw new Error("La pregunta que estas buscando no existe.");
      } else if (searchEntity.systemDefined) {
        throw new Error("No se puede eliminar esta pregunta.");
      }

      const deleteEntity = await this._repository.delete({ where: { surveyQuestionId } });

      return deleteEntity;
    } catch (error) {
      throw error;
    }
  }
}
