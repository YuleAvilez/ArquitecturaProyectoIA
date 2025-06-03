import { AutoMap } from "@automapper/classes";

export class SessionResponseDto {
  @AutoMap()
  public sessionId?: number;

  @AutoMap()
  public userId?: number;

  @AutoMap()
  public refreshToken?: string;
}
