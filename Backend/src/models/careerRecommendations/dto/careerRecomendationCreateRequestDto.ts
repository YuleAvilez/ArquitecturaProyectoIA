import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, IsString } from "class-validator";

export class CareerRecomendationCreateRequestDto {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  public answer?: string;
}
