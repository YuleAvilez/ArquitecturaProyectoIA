import { CareerRecommendationMapper } from "./careerRecommendation/careerRecommendationMapper";
import { ModuleMapper } from "./modules/moduleMapper";
import { SessionMapper } from "./session/sessionMapper";
import { SurveyQuestionMapper } from "./surveyQuestion/surveyQuestionMapper";
import { UserMapper } from "./user/userMapper";
import { UserVocationalResponseMapper } from "./userVocationalResponses/userVocationalResponseMapper";
import { VocationalSurveyMapper } from "./vocationalSurveys/vocationalSurveyMapper";

export function initializeMappers(): void {
  UserMapper.defineMapper();
  SessionMapper.defineMapper();
  ModuleMapper.defineMapper();
  VocationalSurveyMapper.defineMapper();
  SurveyQuestionMapper.defineMapper();
  UserVocationalResponseMapper.defineMapper();
  CareerRecommendationMapper.defineMapper();
}
