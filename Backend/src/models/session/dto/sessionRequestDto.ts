import { AutoMap } from "@automapper/classes";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SessionRequestDto {
  @AutoMap()
  @IsEmail()
  @IsNotEmpty()
  public email?: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  public password?: string;

  @AutoMap()
  public userId?: number;

  @AutoMap()
  public refreshToken?: string;

  @AutoMap()
  public expiresIn?: Date;
}
