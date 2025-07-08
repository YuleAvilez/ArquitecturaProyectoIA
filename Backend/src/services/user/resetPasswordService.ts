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

    const decoded: any = jwt.verify(request.token, process.env.JWT_SECRET!);
    const userId = decoded.id;

    const user = await this._repository.getById(userId);
    if (!user) {
      throw new Error("Usuario no encontrado.");
    }

  const hashedPassword = await EncryptPassword(request.newPassword);

  user.password = hashedPassword;

    await this._repository.update(
    user,
    { where: { userId } }
    );
    return true;
  }
}
