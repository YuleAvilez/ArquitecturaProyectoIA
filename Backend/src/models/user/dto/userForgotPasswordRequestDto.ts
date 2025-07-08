import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, IsEmail, IsString } from "class-validator";

export class UserForgotPasswordRequestDto {
  @IsNotEmpty({ message: "El correo es obligatorio." })
  @IsEmail({}, { message: "El correo debe tener un formato válido." })
  correo!: string;
}
