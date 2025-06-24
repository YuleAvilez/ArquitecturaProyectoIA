import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, IsString } from "class-validator";

export class CareerDetailRequestDto {
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
  public salary?: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  public trends?: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  public sources?: string;
}
