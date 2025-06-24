import { createMap } from "@automapper/core";
import { mapper } from "../../../config/mapper";
import { VocationalSurveyRequestDto } from "../../../models/vocationalSurveys/dto/vocationalSurveyRequestDto";
import { VocationalSurveyResponseDto } from "../../../models/vocationalSurveys/dto/vocationalSurveyResponseDto";
import { VocationalSurveys } from "../../../models/vocationalSurveys/model/vocationalSurveysModel";

export class VocationalSurveyMapper {
  static defineMapper(): void {
    createMap(mapper, VocationalSurveyRequestDto, VocationalSurveys);
    createMap(mapper, VocationalSurveys, VocationalSurveyResponseDto);
    createMap(mapper, VocationalSurveyResponseDto, VocationalSurveys);
    createMap(mapper, VocationalSurveys, VocationalSurveyRequestDto);
  }
}
