import { AutoMap } from "@automapper/classes";

export class ModuleRequestDto {
  @AutoMap()
  public moduleId?: number;

  @AutoMap()
  public name?: string;

  @AutoMap()
  public route?: string;
}
