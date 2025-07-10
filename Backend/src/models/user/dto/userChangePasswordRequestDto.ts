import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class UserChangePasswordRequestDto {
  @AutoMap()
  @IsNumber()
  @IsNotEmpty()
  public userId?: number;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  public currentPassword?: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  public newPassword?: string;
}
