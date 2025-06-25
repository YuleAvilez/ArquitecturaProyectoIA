import { SurveyQuestionResponseDto } from "../../../models/surveyQuestions/dto/surveyQuestionResponseDto";

export interface SurveyQuestionGetAllServiceInterface {
    handle(): Promise<SurveyQuestionResponseDto[]>;
}