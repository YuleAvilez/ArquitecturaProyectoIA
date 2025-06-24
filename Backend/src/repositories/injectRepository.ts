import { Container } from "typedi";
import { CareerDetailRequestDto } from "../models/careerDetails/dto/careerDetailRequestDto";
import { CareerDetails } from "../models/careerDetails/model/careerDetailsModel";
import { CareerRecomendationRequestDto } from "../models/careerRecommendations/dto/careerRecomendationRequestDto";
import { CareerRecommendations } from "../models/careerRecommendations/model/careerRecommendationsModel";
import { ModuleRequestDto } from "../models/modules/dto/moduleRequestDto";
import { Modules } from "../models/modules/model/modulesModel";
import { SessionRequestDto } from "../models/session/dto/sessionRequestDto";
import { Session } from "../models/session/model/sessionModel";
import { SurveyQuestionRequestDto } from "../models/surveyQuestions/dto/surveyQuestionRequestDto";
import { SurveyQuestions } from "../models/surveyQuestions/model/surveyQuestionsModel";
import { UserRequestDto } from "../models/user/dto/userRequestDto";
import { User } from "../models/user/model/userModel";
import { UserVocationalRequestDto } from "../models/userVocationalResponses/dto/userVocationalRequestDto";
import { UserVocationalResponses } from "../models/userVocationalResponses/model/userVocationalResponsesModel";
import { VocationalSurveyRequestDto } from "../models/vocationalSurveys/dto/vocationalSurveyRequestDto";
import { VocationalSurveys } from "../models/vocationalSurveys/model/vocationalSurveysModel";
import { GenericRepository } from "../repositories/GenericRepository";

export function registerRepositories() {
  Container.set(
    "SessionRepository",
    new GenericRepository<SessionRequestDto, Session>("session")
  );
  Container.set(
    "UserRepository",
    new GenericRepository<UserRequestDto, User>("user")
  );
  Container.set(
    "ModuleRepository",
    new GenericRepository<ModuleRequestDto, Modules>("module")
  );
  Container.set(
    "SurveyQuestionRepository",
    new GenericRepository<SurveyQuestionRequestDto, SurveyQuestions>(
      "surveyQuestion"
    )
  );
  Container.set(
    "VocationalSurveyRepository",
    new GenericRepository<VocationalSurveyRequestDto, VocationalSurveys>(
      "vocationalSurvey"
    )
  );
  Container.set(
    "UserVocationalSurveyRepository",
    new GenericRepository<UserVocationalRequestDto, UserVocationalResponses>(
      "userVocationalResponse"
    )
  );
  Container.set(
    "CareerRecommendationRepository",
    new GenericRepository<CareerRecomendationRequestDto, CareerRecommendations>(
      "careerRecommendation"
    )
  );
  Container.set(
    "CareerDetailRepository",
    new GenericRepository<CareerDetailRequestDto, CareerDetails>("careerDetail")
  );
}
