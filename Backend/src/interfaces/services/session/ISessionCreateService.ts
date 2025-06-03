import { SessionRequestDto } from "../../../models/session/dto/sessionRequestDto";
import { SessionResponseDto } from "../../../models/session/dto/sessionResponseDto";

export interface SessionCreateServiceInterface {
  /**
   * Maneja la creación de un elemento.
   * @param request {SessionRequestDto}
   */
  handle(request: SessionRequestDto): Promise<SessionResponseDto>;
}
