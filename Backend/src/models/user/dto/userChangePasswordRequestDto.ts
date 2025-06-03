import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserChangePasswordRequestDto {
  @AutoMap()
  @IsNumber()
  @IsNotEmpty()
  public userId?: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  public currentPassword?: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  public newPassword?: string;
}
