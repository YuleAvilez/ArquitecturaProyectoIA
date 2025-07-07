import { SurveyQuestionListResponseDto } from "../../../models/surveyQuestions/dto/SurveyQuestionListResponseDto";

export interface SurveyQuestionListGetAllServiceInterface {
    handle(): Promise<SurveyQuestionListResponseDto[]>;
}