import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CareerRecomendationRequestDto {
  @AutoMap()
  @IsNumber()
  @IsNotEmpty()
  public vocationalSurveyId?: number;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  public careerName?: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  public careerNameNormalize?: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  public description?: string;
}
