import { RoutingControllersOptions } from "routing-controllers";
import { SessionValidatorMiddleware } from "../utils/middleware";
import { authorizationChecker } from "../utils/middleware/authorization";
import { SessionController } from "./sessionController";
import { UserController } from "./userController";
import { LoginController } from "./loginController";

export const ControllerDependencies: RoutingControllersOptions = {
  controllers: [UserController, SessionController, LoginController],
  authorizationChecker: authorizationChecker,
  middlewares: [SessionValidatorMiddleware],
};
