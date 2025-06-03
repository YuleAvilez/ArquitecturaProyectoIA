import { SessionMapper } from "./session/sessionMapper";
import { UserMapper } from "./user/userMapper";

export function initializeMappers(): void {
  UserMapper.defineMapper();
  SessionMapper.defineMapper();
}
