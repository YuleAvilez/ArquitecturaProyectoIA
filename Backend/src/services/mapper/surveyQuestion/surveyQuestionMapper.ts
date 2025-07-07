import { createMap } from "@automapper/core";
import { mapper } from "../../../config/mapper";
import { SurveyQuestionRequestDto } from "../../../models/surveyQuestions/dto/surveyQuestionRequestDto";
import { SurveyQuestionResponseDto } from "../../../models/surveyQuestions/dto/surveyQuestionResponseDto";
import { SurveyQuestions } from "../../../models/surveyQuestions/model/surveyQuestionsModel";
import { SurveyQuestionListResponseDto } from "../../../models/surveyQuestions/dto/SurveyQuestionListResponseDto";

export class SurveyQuestionMapper {
  static defineMapper(): void {
    createMap(mapper, SurveyQuestionRequestDto, SurveyQuestions);
    createMap(mapper, SurveyQuestions, SurveyQuestionResponseDto);
    createMap(mapper, SurveyQuestionResponseDto, SurveyQuestions);
    createMap(mapper, SurveyQuestions, SurveyQuestionRequestDto);
    createMap(mapper, SurveyQuestions, SurveyQuestionListResponseDto);
    createMap(mapper, SurveyQuestionListResponseDto, SurveyQuestions);
  }
}
