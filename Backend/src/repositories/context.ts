import { ModelCtor } from "sequelize-typescript";
import { connection } from "../config/configDb";
import { CareerDetails } from "../models/careerDetails/model/careerDetailsModel";
import { CareerRecommendations } from "../models/careerRecommendations/model/careerRecommendationsModel";
import { Modules } from "../models/modules/model/modulesModel";
import { Session } from "../models/session/model/sessionModel";
import { SurveyQuestions } from "../models/surveyQuestions/model/surveyQuestionsModel";
import { User } from "../models/user/model/userModel";
import { UserVocationalResponses } from "../models/userVocationalResponses/model/userVocationalResponsesModel";
import { VocationalSurveys } from "../models/vocationalSurveys/model/vocationalSurveysModel";
import { QuestionSectionModel } from "../models/QuestionSection/model/QuestionSectionModel";

export class Context {
  // Repositorio User
  public user: ModelCtor<User>;
  // Repositorio Session
  public session: ModelCtor<Session>;
  public module: ModelCtor<Modules>;
  public surveyQuestion: ModelCtor<SurveyQuestions>;
  public vocationalSurvey: ModelCtor<VocationalSurveys>;
  public userVocationalResponse: ModelCtor<UserVocationalResponses>;
  public careerRecommendation: ModelCtor<CareerRecommendations>;
  public careerDetail: ModelCtor<CareerDetails>;
  public questionSection: ModelCtor<QuestionSectionModel>;

  constructor() {
    // Obtener los repositorios de la conexión a la base de datos
    this.user = connection.getRepository(User);
    this.session = connection.getRepository(Session);
    this.module = connection.getRepository(Modules);
    this.surveyQuestion = connection.getRepository(SurveyQuestions);
    this.vocationalSurvey = connection.getRepository(VocationalSurveys);
    this.userVocationalResponse = connection.getRepository(
      UserVocationalResponses
    );
    this.careerRecommendation = connection.getRepository(CareerRecommendations);
    this.careerDetail = connection.getRepository(CareerDetails);
    this.questionSection = connection.getRepository(QuestionSectionModel);
  }
}

export const context = new Context();
