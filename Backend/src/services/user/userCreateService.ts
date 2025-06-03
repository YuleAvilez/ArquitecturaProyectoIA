import { validate } from "class-validator";
import { Op } from "sequelize";
import { Inject, Service } from "typedi";
import { connection } from "../../config/configDb";
import { mapper } from "../../config/mapper";
import { UserCreateServiceInterface } from "../../interfaces/services/user/IUserCreateService";
import { UserRequestDto } from "../../models/user/dto/userRequestDto";
import { UserResponseDto } from "../../models/user/dto/userResponseDto";
import { User } from "../../models/user/model/userModel";
import { GenericRepository } from "../../repositories/GenericRepository";
import { EncryptPassword } from "../../utils";

/**
 * Class UserCreate
 * @implements {UserCreateServiceInterface}
 */
@Service()
export class UserCreateService implements UserCreateServiceInterface {
  /**
   * Instancia del repositorio
   */
  constructor(
    @Inject("UserRepository")
    private readonly _repository: GenericRepository<UserRequestDto, User>
  ) {}

  /**
   * Maneja la creación de usuarios
   * @param request - {UserRequestDto}
   * @returns {Promise<UserResponseDto>}
   */
  async handle(request: UserRequestDto): Promise<UserResponseDto> {
    const transaction = await connection.transaction();

    try {
      // Validar que todos los datos requeridos están presentes
      const errors = await validate(request);

      if (errors?.length > 0) {
        throw new Error("Enviar todos los datos.");
      }

      // Verifica si ya existe este usuario
      const isUserExist = await this._repository.getOne({
        where: {
          [Op.or]: [{ email: request?.email }, { userName: request?.userName }],
        },
      });

      if (isUserExist) {
        throw new Error(
          "Ya existe un usuario con este email o nombre de usuario."
        );
      }

      // Convierte la data de tipo modelo a tipo response
      const mappedData = mapper.map(request, User, UserRequestDto);

      // Encripta la contraseña recibida.
      const encryptPassword = await EncryptPassword(request?.password ?? "");

      // Crear usuario
      const createUser = await this._repository.create({
        ...mappedData,
        password: encryptPassword,
      });

      await transaction.commit();

      const response = mapper.map(createUser, User, UserResponseDto);

      return response;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
