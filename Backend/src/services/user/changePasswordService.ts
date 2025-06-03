import { validate } from "class-validator";
import { Inject, Service } from "typedi";
import { connection } from "../../config/configDb";
import { ChangePasswordServiceInterface } from "../../interfaces/services/user/IChangePasswordService";
import { UserChangePasswordRequestDto } from "../../models/user/dto/userChangePasswordRequestDto";
import { UserRequestDto } from "../../models/user/dto/userRequestDto";
import { User } from "../../models/user/model/userModel";
import { GenericRepository } from "../../repositories/GenericRepository";
import { ComparePassword, EncryptPassword } from "../../utils";

/**
 * Class ChangePassword
 * @implements {ChangePasswordServiceInterface}
 */

@Service()
export class ChangePasswordService implements ChangePasswordServiceInterface {
  /**
   * Instancia del repositorio
   */
  constructor(
    @Inject("UserRepository")
    private readonly _repository: GenericRepository<UserRequestDto, User>
  ) {}

  /**
   * Maneja el cambio de contraseña
   * @param request - {SessionRequestDto}
   * @returns {Promise<boolean>}
   */
  async handle(request: UserChangePasswordRequestDto): Promise<boolean> {
    const transaction = await connection.transaction();

    try {
      const errors = await validate(request);

      if (errors?.length > 0) {
        throw new Error("Enviar todos los datos.");
      }

      const searchUser = await this._repository.getOne({
        where: { userId: request?.userId },
        transaction,
      });

      if (!searchUser) {
        throw new Error("Esta usuario no existe");
      }

      const isCurrentPasswordValid = await ComparePassword(
        searchUser?.password!,
        request?.currentPassword!
      );

      if (!isCurrentPasswordValid) {
        throw new Error("La contraseña actual es incorrecta.");
      }

      const encryptPassword = await EncryptPassword(
        request?.currentPassword ?? ""
      );

      const updatePassword = await this._repository.update(
        { ...searchUser, password: encryptPassword },
        { where: { userId: request?.userId }, transaction }
      );

      await transaction.commit();

      if (!updatePassword) {
        throw new Error("No se pudo actualizar la contraseña.");
      } else {
        return true;
      }
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
