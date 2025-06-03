import { Inject, Service } from "typedi";
import { connection } from "../../config/configDb";
import { mapper } from "../../config/mapper";
import { UserGetByIdServiceInterface } from "../../interfaces/services/user/IUserGetById";
import { UserRequestDto } from "../../models/user/dto/userRequestDto";
import { UserResponseDto } from "../../models/user/dto/userResponseDto";
import { User } from "../../models/user/model/userModel";
import { GenericRepository } from "../../repositories/GenericRepository";

@Service()
export class UserGetByIdService implements UserGetByIdServiceInterface {
  /**
   * Instancia del repositorio
   */
  constructor(
    @Inject("UserRepository")
    private readonly _repository: GenericRepository<UserRequestDto, User>
  ) {}

  /**
   * Maneja la obtención de un usuario
   * @param id
   * @returns {Promise<UserResponseDto>}
   */
  async handle(id: number): Promise<UserResponseDto> {
    const transaction = await connection.transaction();

    try {
      if (!id) {
        throw new Error("El id es requerido.");
      }

      const searchUser = await this._repository.getOne({
        where: { userId: id },
        transaction,
      });

      if (!searchUser) {
        throw new Error("Este usuario no existe.");
      }

      const mappedData = mapper.map(searchUser, User, UserRequestDto);

      await transaction.commit();

      return mappedData;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
