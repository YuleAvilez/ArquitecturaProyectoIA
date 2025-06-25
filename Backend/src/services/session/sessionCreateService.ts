// import { validate } from "class-validator";
// import { Inject, Service } from "typedi";
// import connection from "../../config/configDb";
// import { mapper } from "../../config/mapper";
// import { SessionCreateServiceInterface } from "../../interfaces/services/session/ISessionCreateService";
// import { SessionRequestDto } from "../../models/session/dto/sessionRequestDto";
// import { SessionResponseDto } from "../../models/session/dto/sessionResponseDto";
// import { Session } from "../../models/session/model/sessionModel";
// import { UserResponseDto } from "../../models/user/dto/userResponseDto";
// import { User } from "../../models/user/model/userModel";
// import { GenericRepository } from "../../repositories/GenericRepository";
// import { ComparePassword } from "../../utils";
// import { JwtService } from "../../utils/jwt";

// /**
//  * Class SessionCreate
//  * @implements {SessionCreateServiceInterface}
//  */

// @Service()
// export class SessionCreateService implements SessionCreateServiceInterface {
//   /**
//    * Instancia del repositorio
//    */
//   constructor(
//     @Inject("SessionRepository")
//     private readonly _repository: GenericRepository<SessionRequestDto, Session>,
//     @Inject("UserRepository")
//     private readonly _userRepository: GenericRepository<UserResponseDto, User>,
//     private readonly _jwtService: JwtService
//   ) {}

//   /**
//    *  Maneja el inicio sesión.
//    * @param request - {SessionRequestDto}
//    * @returns {Promise<SessionResponseDto>}
//    */
//   async handle(request: SessionRequestDto): Promise<SessionResponseDto> {
//     const transaction = await connection.sequelize.transaction();

//     try {
//       const errors = await validate(request);

//       if (errors?.length > 0) {
//         throw new Error("Enviar todos los datos.");
//       }

//       const searchUser = await this._userRepository.getOne({
//         where: { Correo: request?.email },
//         transaction,
//       });

//       const mappedData = mapper.map(searchUser, User, UserResponseDto);

//       if (!mappedData.userId) {
//         throw new Error("Este usuario no existe.");
//       }

//       const isPasswordCorrect = await ComparePassword(
//         request?.password!,
//         searchUser?.Contraseña!
//       );

//       if (!isPasswordCorrect) {
//         throw new Error("La contraseña es incorrecta.");
//       }

//       request.userId = mappedData.userId;
//       request.refreshToken = await this._jwtService.create({
//         email: request?.email,
//         userId: mappedData?.userId,
//       });

//       const createdSession = await this._repository.create(request, {
//         transaction,
//       });

//       console.log(createdSession, "createdSession");
//       await transaction.commit();

//       const response = mapper.map(createdSession, Session, SessionResponseDto);

//       return response;
//     } catch (error) {
//       await transaction.rollback();
//       throw error;
//     }
//   }
// }
