import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, IsString } from "class-validator";

export class CareerGenerateDescriptionResponseDto {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  public description?: string;
}
