import Container from "typedi";
import { IModuleGetAllService } from "../interfaces/services/module/IModuleGetAllService";
import { SessionCreateServiceInterface } from "../interfaces/services/session/ISessionCreateService";
import { SessionDeleteServiceInterface } from "../interfaces/services/session/ISessionDeleteService";
import { SurveyQuestionGetAllServiceInterface } from "../interfaces/services/surveyQuestion/surveyQuestionGetAllServiceInterface";
import { ChangePasswordServiceInterface } from "../interfaces/services/user/IChangePasswordService";
import { UserCreateServiceInterface } from "../interfaces/services/user/IUserCreateService";
import { UserGetByIdServiceInterface } from "../interfaces/services/user/IUserGetById";
import { UserUpdateServiceInterface } from "../interfaces/services/user/IUserUpdate";
import { UserGetAllServiceInterface } from "../interfaces/services/user/userGetAllServiceInterface";
import { AdminReportDashboardServiceInterface } from "../interfaces/services/vocationalSurvey/adminReportDashboardServiceInterface";
import { ChatGptSurveyServiceInterface } from "../interfaces/services/vocationalSurvey/chatGptSurveyServiceInterface";
import { GenerateCareerDescriptionServiceInterface } from "../interfaces/services/vocationalSurvey/generateCareerDescriptionServiceInterface";
import { GenerateCareerDetailsServiceInterface } from "../interfaces/services/vocationalSurvey/generateCareerDetailsServiceInterface";
import { GetUserVocationalResponseByUserIdServiceInterface } from "../interfaces/services/vocationalSurvey/getUserVocationalResponseByUserIdServiceInterface";
import { UserReportDashboardServiceInterface } from "../interfaces/services/vocationalSurvey/userReportDashboardServiceInterface";
import { VocationalSurveyProcessingServiceInterface } from "../interfaces/services/vocationalSurvey/vocationalSurveyProcessingServiceInterface";
import { ModuleGetAllService } from "./modules/moduleGetAllService";
import { SessionDeleteService } from "./session/deleteSessionService";
import { SessionCreateService } from "./session/sessionCreateService";
import { SurveyQuestionGetAllService } from "./surveyQuestions/surveyQuestionGetAllService";
import { ChangePasswordService } from "./user/changePasswordService";
import { UserCreateService } from "./user/userCreateService";
import { UserGetAllService } from "./user/userGetAllService";
import { UserGetByIdService } from "./user/userGetByIdService";
import { UserUpdateService } from "./user/userUpdateService";
import { ChatGptSurveyService } from "./vocationalSurveys/chapGpt/chatGptSurveyService";
import { AdminReportDashboardService } from "./vocationalSurveys/dashboard/admin/adminReportDashboardService";
import { GenerateCareerDescriptionService } from "./vocationalSurveys/chapGpt/generateCareerDescriptionService";
import { GenerateCareerDetailsService } from "./vocationalSurveys/chapGpt/generateCareerDetailsService";
import { UserReportDashboardService } from "./vocationalSurveys/dashboard/user/userReportDashboardService";
import { GetUserVocationalResponseByUserIdService } from "./vocationalSurveys/vocationalSurveyGetByUserIdService";
import { VocationalSurveyProcessingService } from "./vocationalSurveys/processing/vocationalSurveyProcessingService";
import { SurveyQuestionListGetAllServiceInterface } from "../interfaces/services/surveyQuestion/surveyQuestionListGetAllServiceInterface";
import { SurveyQuestionListGetAllService } from "./surveyQuestions/surveyQuestionListGetAllService";
import { ForgotPasswordServiceInterface } from "../interfaces/services/user/IForgotPasswordService";
import { ForgotPasswordService } from "./user/forgotPasswordService";
import { ResetPasswordServiceInterface } from "../interfaces/services/user/IResetPasswordService";
import { ResetPasswordService } from "./user/resetPasswordService";

export function registerServices() {
  Container.set<UserCreateServiceInterface>(
    "UserCreateServiceInterface",
    Container.get(UserCreateService)
  );

  Container.set<UserGetByIdServiceInterface>(
    "UserGetByIdServiceInterface",
    Container.get(UserGetByIdService)
  );

  Container.set<UserUpdateServiceInterface>(
    "UserUpdateServiceInterface",
    Container.get(UserUpdateService)
  );

  Container.set<ChangePasswordServiceInterface>(
    "ChangePasswordServiceInterface",
    Container.get(ChangePasswordService)
  );

  Container.set<SessionDeleteServiceInterface>(
    "SessionDeleteServiceInterface",
    Container.get(SessionDeleteService)
  );

  Container.set<SessionCreateServiceInterface>(
    "SessionCreateServiceInterface",
    Container.get(SessionCreateService)
  );

  Container.set<IModuleGetAllService>(
    "IModuleGetAllService",
    Container.get(ModuleGetAllService)
  );

  Container.set<GenerateCareerDescriptionServiceInterface>(
    "GenerateCareerDescriptionServiceInterface",
    Container.get(GenerateCareerDescriptionService)
  );

  Container.set<GenerateCareerDetailsServiceInterface>(
    "GenerateCareerDetailsServiceInterface",
    Container.get(GenerateCareerDetailsService)
  );
  Container.set<ChatGptSurveyServiceInterface>(
    "ChatGptSurveyServiceInterface",
    Container.get(ChatGptSurveyService)
  );
  Container.set<VocationalSurveyProcessingServiceInterface>(
    "VocationalSurveyProcessingServiceInterface",
    Container.get(VocationalSurveyProcessingService)
  );
  Container.set<GetUserVocationalResponseByUserIdServiceInterface>(
    "GetUserVocationalResponseByUserIdServiceInterface",
    Container.get(GetUserVocationalResponseByUserIdService)
  );
  Container.set<AdminReportDashboardServiceInterface>(
    "AdminReportDashboardServiceInterface",
    Container.get(AdminReportDashboardService)
  );
  Container.set<UserReportDashboardServiceInterface>(
    "UserReportDashboardServiceInterface",
    Container.get(UserReportDashboardService)
  );
  Container.set<UserGetAllServiceInterface>(
    "UserGetAllServiceInterface",
    Container.get(UserGetAllService)
  );
  Container.set<SurveyQuestionGetAllServiceInterface>(
    "SurveyQuestionGetAllServiceInterface",
    Container.get(SurveyQuestionGetAllService)
  );
  Container.set<SurveyQuestionListGetAllServiceInterface>(
    "SurveyQuestionListGetAllServiceInterface",
    Container.get(SurveyQuestionListGetAllService)
  );
    Container.set<ForgotPasswordServiceInterface>(
      "ForgotPasswordServiceInterface",
      Container.get(ForgotPasswordService)
    );

    Container.set<ResetPasswordServiceInterface>(
    "ResetPasswordServiceInterface",
    Container.get(ResetPasswordService)
  );

}
