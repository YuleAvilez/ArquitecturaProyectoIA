import { RoutingControllersOptions } from "routing-controllers";
import { SessionValidatorMiddleware } from "../utils/middleware";
import { authorizationChecker } from "../utils/middleware/authorization";
import { SessionController } from "./sessionController";
import { UserController } from "./userController";

export const ControllerDependencies: RoutingControllersOptions = {
  controllers: [UserController, SessionController],
  authorizationChecker: authorizationChecker,
  middlewares: [SessionValidatorMiddleware],
};
