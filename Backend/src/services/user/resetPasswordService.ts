import { validate } from "class-validator";
import { Inject, Service } from "typedi";
import jwt from "jsonwebtoken";
import { User } from "../../models/user/model/userModel";
import { GenericRepository } from "../../repositories/GenericRepository";
import { ResetPasswordServiceInterface } from "../../interfaces/services/user/IResetPasswordService";
import { UserResetPasswordRequestDto } from "../../models/user/dto/userResetPasswordRequestDto";
import { EncryptPassword } from "../../utils";
import { UserRequestDto } from "../../models/user/dto/userRequestDto";

@Service() 
export class ResetPasswordService implements ResetPasswordServiceInterface {
  constructor(
    @Inject("UserRepository")
    private readonly _repository: GenericRepository<UserRequestDto, User>
  ) {}

  async handle(request: UserResetPasswordRequestDto): Promise<boolean> {
    const errors = await validate(request);
    if (errors.length > 0) {
      throw new Error("Datos inválidos. Verifica el formulario.");
    }
    console.log("Request recibido:", request);

    const decoded: any = jwt.verify(request.token, process.env.JWT_SECRET!);
    console.log("Token decodificado:", decoded);
    const userIdToken = decoded.id;

    const user = await this._repository.getById(userIdToken);
    console.log("Usuario encontrado:", user);
    if (!user) {
      console.error("Usuario no encontrado con ID:", userIdToken);
      throw new Error("Usuario no encontrado.");
    }

  const hashedPassword = await EncryptPassword(request.newPassword);
  console.log("Contraseña hasheada:", hashedPassword);

  user.password = hashedPassword;

    await this._repository.update({password: hashedPassword}, { where: {userId: userIdToken } });
    return true;
  }
}
