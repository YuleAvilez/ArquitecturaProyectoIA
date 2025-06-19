import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CareerDetailRequestDto {
  @AutoMap()
  @IsNumber()
  @IsNotEmpty()
  public careerDetailId?: number;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  public careerName?: string;

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
