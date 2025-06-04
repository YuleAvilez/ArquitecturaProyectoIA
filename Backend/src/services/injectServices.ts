import Container from "typedi";
import { SessionCreateServiceInterface } from "../interfaces/services/session/ISessionCreateService";
import { SessionDeleteServiceInterface } from "../interfaces/services/session/ISessionDeleteService";
import { ChangePasswordServiceInterface } from "../interfaces/services/user/IChangePasswordService";
import { UserCreateServiceInterface } from "../interfaces/services/user/IUserCreateService";
import { UserGetByIdServiceInterface } from "../interfaces/services/user/IUserGetByIdService";
import { UserUpdateServiceInterface } from "../interfaces/services/user/IUserUpdateService";
import { SessionDeleteService } from "./session/deleteSessionService";
import { SessionCreateService } from "./session/sessionCreateService";
import { ChangePasswordService } from "./user/changePasswordService";
import { UserCreateService } from "./user/userCreateService";
import { UserGetByIdService } from "./user/userGetByIdService";
import { UserUpdateService } from "./user/userUpdateService";
import { LoginService } from "./session/loginService";
export function registerServices() {
  Container.set<UserCreateServiceInterface>(
    "UserCreateServiceInterface",
    Container.get(UserCreateService)
  );
   Container.set(LoginService,
     new LoginService(
      Container.get("UserRepository")));

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
}
