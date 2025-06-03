import { UserResponseDto } from "../../../models/user/dto/userResponseDto";

export interface UserGetByIdServiceInterface {
  /**
   * Maneja la validación de un usuario.
   * @param request {id}
   */
  handle(id: number): Promise<UserResponseDto>;
}
