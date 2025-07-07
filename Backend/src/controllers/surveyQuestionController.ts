import { Get, JsonController } from "routing-controllers";
import { Inject, Service } from "typedi";
import { SurveyQuestionGetAllServiceInterface } from "../interfaces/services/surveyQuestion/surveyQuestionGetAllServiceInterface";
import { SurveyQuestionResponseDto } from "../models/surveyQuestions/dto/surveyQuestionResponseDto";
import { SurveyQuestionListResponseDto } from "../models/surveyQuestions/dto/SurveyQuestionListResponseDto";
import { SurveyQuestionListGetAllServiceInterface } from "../interfaces/services/surveyQuestion/surveyQuestionListGetAllServiceInterface";

@Service()
@JsonController("/surveyQuestion")
export class SurveyQuestionController {
  constructor(
    @Inject("SurveyQuestionGetAllServiceInterface")
    private readonly _surveyQuestionGetAllServiceInterface: SurveyQuestionGetAllServiceInterface,
    @Inject("SurveyQuestionListGetAllServiceInterface")
    private readonly _surveyQuestionListGetAllServiceInterface: SurveyQuestionListGetAllServiceInterface
  ) {}

  @Get("/getAll")
  async getAll(
  ): Promise<SurveyQuestionResponseDto[]> {
    return await this._surveyQuestionGetAllServiceInterface.handle();
  }

  @Get("/getAllList")
  async getAllList(): Promise<SurveyQuestionListResponseDto[]> {
    return await this._surveyQuestionListGetAllServiceInterface.handle();
  }
}
