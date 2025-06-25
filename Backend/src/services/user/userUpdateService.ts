// import { validate } from "class-validator";
// import { Inject, Service } from "typedi";
// import { connection } from "../../config/configDb";
// import { mapper } from "../../config/mapper";
// import { UserUpdateServiceInterface } from "../../interfaces/services/user/IUserUpdate";
// import { UserRequestDto } from "../../models/user/dto/userRequestDto";
// import { UserResponseDto } from "../../models/user/dto/userResponseDto";
// import { User } from "../../models/user/model/userModel";
// import { GenericRepository } from "../../repositories/GenericRepository";

// @Service()
// export class UserUpdateService implements UserUpdateServiceInterface {
//   /**
//    * Instancia del repositorio
//    */
//   constructor(
//     @Inject("UserRepository")
//     private readonly _repository: GenericRepository<UserRequestDto, User>
//   ) {}

//   /**
//    * Maneja la actualización de un usuario
//    * @param id
//    * @param request
//    * @returns {Promise<boolean>}
//    */
//   async handle(id: number, request: UserRequestDto): Promise<UserResponseDto> {
//     const transaction = await connection.transaction();

//     try {
//       // Validar que todos los datos requeridos están presentes
//       const errors = await validate(request);

//       if (errors?.length > 0) {
//         throw new Error("Enviar todos los datos.");
//       }

//       if (!id) {
//         throw new Error("El id es requerido.");
//       }

//       // Busca un usuario con este id
//       const searchUser = await this._repository.getOne({
//         where: { userId: id },
//         transaction,
//       });

//       if (!searchUser) {
//         throw new Error("Este usuario no existe");
//       }

//       const updateUser = await this._repository.update(request, {
//         where: { userId: id },
//         transaction,
//       });

//       await transaction.commit();

//       const response = mapper.map(updateUser, User, UserResponseDto);

//       return response;
//     } catch (error) {
//       await transaction.rollback();
//       throw error;
//     }
//   }
// }
