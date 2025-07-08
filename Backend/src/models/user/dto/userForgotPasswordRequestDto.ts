import { IsEmail, IsNotEmpty } from "class-validator";

export class UserForgotPasswordRequestDto {
  @IsNotEmpty({ message: "El correo es obligatorio." })
  @IsEmail({}, { message: "El correo debe tener un formato válido." })
  correo!: string;
}
