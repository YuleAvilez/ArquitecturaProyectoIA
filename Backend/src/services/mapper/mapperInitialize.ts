import { ModuleMapper } from "./modules/moduleMapper";
import { SessionMapper } from "./session/sessionMapper";
import { UserMapper } from "./user/userMapper";
import { VocationalSurveyMapper } from "./vocationalSurveys/vocationalSurveyMapper";

export function initializeMappers(): void {
  UserMapper.defineMapper();
  SessionMapper.defineMapper();
  ModuleMapper.defineMapper();
  VocationalSurveyMapper.defineMapper();
}
