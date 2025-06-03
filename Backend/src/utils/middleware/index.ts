import dotenv from "dotenv";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { ExpressMiddlewareInterface } from "routing-controllers";
import { Inject, Service } from "typedi";
import { connection } from "../../config/configDb";
import { SessionRequestDto } from "../../models/session/dto/sessionRequestDto";
import { Session } from "../../models/session/model/sessionModel";
import { GenericRepository } from "../../repositories/GenericRepository";

dotenv.config();

@Service()
export class SessionValidatorMiddleware implements ExpressMiddlewareInterface {
  /**
   * Instancia del repositorio
   */
  constructor(
    @Inject("SessionRepository")
    private readonly _repository: GenericRepository<SessionRequestDto, Session>
  ) {}

  async use(req: any, res: any, next: (err?: any) => any): Promise<void> {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token no proporcionado." });
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY as string);

      req.user = decoded;
      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        const transaction = await connection.transaction();

        try {
          const decoded = jwt.decode(token) as {
            data: {
              email?: string;
              userId?: number;
            };
          };

          if (decoded?.data?.userId) {
            // Verificar si la sesión existe antes de eliminarla
            const sessionExists = await this._repository.getOne({
              where: { userId: decoded.data.userId },
              transaction,
            });

            if (sessionExists) {
              await this._repository.delete({
                where: { userId: decoded.data.userId },
                transaction,
              });
            }

            await transaction.commit();

            return res.status(401).json({ message: "La sesión expiró." });
          } else {
            return res.status(401).json({
              message: "No se pudo obtener el id del usuario del token.",
            });
          }
        } catch (error) {
          await transaction.rollback();
          throw error;
        }
      } else if (error instanceof JsonWebTokenError) {
        return res
          .status(401)
          .json({ message: "El token está mal estructurado." });
      } else if (error instanceof SyntaxError) {
        return res.status(401).json({ message: "Token inesperado." });
      } else {
        return res.status(500).json({ message: "Error del servidor." });
      }
    }
  }
}
