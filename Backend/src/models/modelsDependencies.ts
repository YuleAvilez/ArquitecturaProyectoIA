import { CareerDetails } from "./careerDetails/model/careerDetailsModel";
import { CareerRecommendations } from "./careerRecommendations/model/careerRecommendationsModel";
import { Modules } from "./modules/model/modulesModel";
import { Session } from "./session/model/sessionModel";
import { SurveyQuestions } from "./surveyQuestions/model/surveyQuestionsModel";
import { User } from "./user/model/userModel";
import { UserVocationalResponses } from "./userVocationalResponses/model/userVocationalResponsesModel";
import { VocationalSurveys } from "./vocationalSurveys/model/vocationalSurveysModel";

// Inyectar todos los modelos.
export const ModelsDependencies = [
  User,
  Session,
  Modules,
  SurveyQuestions,
  VocationalSurveys,
  UserVocationalResponses,
  CareerRecommendations,
  CareerDetails,
];
