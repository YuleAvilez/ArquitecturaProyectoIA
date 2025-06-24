import { AutoMap } from "@automapper/classes";

export class UserByGenderIdResponseDto {
  @AutoMap()
  public masculino?: number;

  @AutoMap()
  public femenino?: number;
}
