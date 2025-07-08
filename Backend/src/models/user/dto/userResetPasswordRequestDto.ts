// src/models/user/dto/UserResetPasswordRequestDto.ts
import { IsString, IsNotEmpty } from "class-validator";

export class UserResetPasswordRequestDto {
  @IsString()
  @IsNotEmpty()
  token!: string;

  @IsString()
  @IsNotEmpty()
  newPassword!: string;
}
