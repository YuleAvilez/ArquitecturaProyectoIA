// src/services/user/ForgotPasswordService.ts
import { validate } from "class-validator";
import jwt from "jsonwebtoken";
import { Inject, Service } from "typedi";
import { ForgotPasswordServiceInterface } from "../../interfaces/services/user/IForgotPasswordService";
import { UserForgotPasswordRequestDto } from "../../models/user/dto/userForgotPasswordRequestDto";
import { UserRequestDto } from "../../models/user/dto/userRequestDto";
import { User } from "../../models/user/model/userModel";
import { GenericRepository } from "../../repositories/GenericRepository";
import { sendResetPasswordEmail } from "../../utils/email/sendResetPassword";

@Service() 
export class ForgotPasswordService implements ForgotPasswordServiceInterface {
  constructor(
    @Inject("UserRepository")
    private readonly _repository: GenericRepository<UserRequestDto, User>
  ) {}

  async handle(request: UserForgotPasswordRequestDto): Promise<boolean> {
    const errors = await validate(request);
    if (errors.length > 0) {
      throw new Error("Por favor, proporciona un correo válido.");
    }

    const user = await this._repository.getOne({
      where: { email: request.correo },
    });
    
    const dataPlain= user?.get({ plain: true });

    if (!dataPlain) {
      throw new Error("No se encontró un usuario con ese correo.");
    }

    const token = jwt.sign({ id: dataPlain.userId }, process.env.JWT_SECRET!, {
      expiresIn: "15m",
    });

    try {
      if (!request.correo) {
        throw new Error("El correo electrónico es requerido.");
      }
      await sendResetPasswordEmail(request.correo, token);
      return true;
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      throw new Error("No se pudo enviar el correo de recuperación.");
    }
  }
}
