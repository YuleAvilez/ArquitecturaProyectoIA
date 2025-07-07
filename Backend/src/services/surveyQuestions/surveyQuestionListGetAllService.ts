import { Inject, Service } from "typedi";
import { mapper } from "../../config/mapper";
import { SurveyQuestionListGetAllServiceInterface } from "../../interfaces/services/surveyQuestion/surveyQuestionListGetAllServiceInterface";
import { SurveyQuestionRequestDto } from "../../models/surveyQuestions/dto/surveyQuestionRequestDto";
import { SurveyQuestions } from "../../models/surveyQuestions/model/surveyQuestionsModel";
import { GenericRepository } from "../../repositories/GenericRepository";
import { SurveyQuestionListResponseDto } from "../../models/surveyQuestions/dto/SurveyQuestionListResponseDto";
import { QuestionSectionRequestDto } from "../../models/QuestionSection/dto/QuestionSectionRequestDto";
import { QuestionSectionModel } from "../../models/QuestionSection/model/QuestionSectionModel";

@Service()
export class SurveyQuestionListGetAllService implements SurveyQuestionListGetAllServiceInterface {
  constructor(
    @Inject("SurveyQuestionRepository")
    private readonly _repository: GenericRepository<SurveyQuestionRequestDto, SurveyQuestions>,
     @Inject("QuestionSectionRepository")
    private readonly _repositoryQuestionSection: GenericRepository<QuestionSectionRequestDto, QuestionSectionModel>
  ) { }

  async handle(): Promise<SurveyQuestionListResponseDto[]> {
    try {
      const searchEntities = await this._repository.getAll();
      const QuestionSection = await this._repositoryQuestionSection.getAll();

      const response: SurveyQuestionListResponseDto[] = [];
      
      if (searchEntities.length != 0 && QuestionSection.length != 0) {
        
        QuestionSection.forEach((section) => {
          const questionsInSection = new SurveyQuestionListResponseDto();
          questionsInSection.title = section.titleSection;

          questionsInSection.questions = searchEntities
            .filter((question) => question.questionSectionId === section.idSection)
            .filter((question) => question.questionText !== undefined)
            .filter((question) => question.surveyQuestionId !== undefined)
            .map((question) => ({
              id: question.surveyQuestionId as number,
              title: question.questionText as string
            }));
             // Map to objects with id and title
          response.push(questionsInSection);
        });
      }


      console.clear();
      console.log("SurveyQuestionListGetAllService: ", response);
      
      return response;
    } catch (error) {
      throw error;
    }
  }
}
