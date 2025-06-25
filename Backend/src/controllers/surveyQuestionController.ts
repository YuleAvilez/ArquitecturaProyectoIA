import {
  Get,
  JsonController
} from "routing-controllers";
import { Inject, Service } from "typedi";
import { SurveyQuestionGetAllServiceInterface } from "../interfaces/services/surveyQuestion/surveyQuestionGetAllServiceInterface";
import { SurveyQuestionResponseDto } from "../models/surveyQuestions/dto/surveyQuestionResponseDto";

@Service()
@JsonController("/surveyQuestion")
export class SurveyQuestionController {
  constructor(
    @Inject("SurveyQuestionGetAllServiceInterface")
    private readonly _surveyQuestionGetAllServiceInterface: SurveyQuestionGetAllServiceInterface,
  ) { }

  @Get("/getAll")
  async getAll(
  ): Promise<SurveyQuestionResponseDto[]> {
    return await this._surveyQuestionGetAllServiceInterface.handle();
  }
}
