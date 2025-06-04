import { UserRequestDto } from "../../../models/user/dto/userRequestDto";
import { UserResponseDto } from "../../../models/user/dto/userResponseDto";

export interface UserUpdateServiceInterface {
  /**
   * Maneja la actualización de un usuario.
   * @param request {id}
   */
  handle(id: number, request: UserRequestDto): Promise<UserResponseDto>;
}
