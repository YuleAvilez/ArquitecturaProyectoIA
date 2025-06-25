import { AutoMap } from "@automapper/classes";

export class UserResponseDto {
  @AutoMap()
  public userId?: number;

  @AutoMap()
  public email?: string;

  @AutoMap()
  public genderId?: number;

  @AutoMap()
  public roleId?: number;
}
