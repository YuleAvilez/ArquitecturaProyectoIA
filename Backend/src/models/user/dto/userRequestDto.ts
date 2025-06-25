import { AutoMap } from "@automapper/classes";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserRequestDto {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  public userName?: string;

  @AutoMap()
  @IsEmail()
  @IsNotEmpty()
  public email?: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  public password?: string;

  @AutoMap()
  @IsNumber()
  @IsNotEmpty()
  public genderId?: number;
}
