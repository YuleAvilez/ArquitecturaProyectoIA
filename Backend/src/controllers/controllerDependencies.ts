import { RoutingControllersOptions } from "routing-controllers";
import { SessionValidatorMiddleware } from "../utils/middleware";
import { authorizationChecker } from "../utils/middleware/authorization";
import { ModuleController } from "./moduleController";
import { SessionController } from "./sessionController";
import { UserController } from "./userController";
import { VocationalSurveyController } from "./vocationalSurveyController";

export const ControllerDependencies: RoutingControllersOptions = {
  controllers: [
    UserController,
    SessionController,
    ModuleController,
    VocationalSurveyController,
  ],
  authorizationChecker: authorizationChecker,
  middlewares: [SessionValidatorMiddleware],
};
