import { Inject, Service } from "typedi";
import { connection } from "../../config/configDb";
import { mapper } from "../../config/mapper";
import { SessionDeleteServiceInterface } from "../../interfaces/services/session/ISessionDeleteService";
import { SessionRequestDto } from "../../models/session/dto/sessionRequestDto";
import { SessionResponseDto } from "../../models/session/dto/sessionResponseDto";
import { Session } from "../../models/session/model/sessionModel";
import { GenericRepository } from "../../repositories/GenericRepository";

/**
 * Class SessionDeleteService
 * @implements {SessionDeleteServiceInterface}
 */

@Service()
export class SessionDeleteService implements SessionDeleteServiceInterface {
  /**
   * Instancia del repositorio
   */
  constructor(
    @Inject("SessionRepository")
    private readonly _repository: GenericRepository<SessionRequestDto, Session>
  ) {}

  /**
   * Maneja el cambio de contraseña
   * @param request - {idUser}
   * @returns {Promise<boolean>}
   */
  async handle(refreshToken: string): Promise<boolean> {
    const transaction = await connection.transaction();

    try {
      if (!refreshToken) {
        throw new Error("El refreshToken es requerido.");
      }

      const searchSession = await this._repository.getOne({
        where: { refreshToken },
        transaction,
      });

      if (!searchSession) {
        throw new Error("Esta sesión no existe");
      }

      const mappedData = mapper.map(searchSession, Session, SessionResponseDto);

      const deleteSession = await this._repository.delete({
        where: { sessionId: mappedData?.sessionId },
        transaction,
      });

      await transaction.commit();

      if (!deleteSession) {
        throw new Error("No se pudo eliminar la sesión.");
      } else {
        return true;
      }
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
