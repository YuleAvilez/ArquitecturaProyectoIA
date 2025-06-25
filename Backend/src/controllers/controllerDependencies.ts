import { RoutingControllersOptions } from "routing-controllers";
import { SessionValidatorMiddleware } from "../utils/middleware";
import { authorizationChecker } from "../utils/middleware/authorization";
import { ModuleController } from "./moduleController";
import { SessionController } from "./sessionController";
import { UserController } from "./userController";
import { VocationalSurveyController } from "./vocationalSurveyController";
import { SurveyQuestionController } from "./surveyQuestionController";

export const ControllerDependencies: RoutingControllersOptions = {
  controllers: [
    UserController,
    SessionController,
    ModuleController,
    VocationalSurveyController,
    SurveyQuestionController,
  ],
  authorizationChecker: authorizationChecker,
  middlewares: [SessionValidatorMiddleware],
};
