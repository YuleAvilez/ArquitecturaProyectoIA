import { UserChangePasswordRequestDto } from "../../../models/user/dto/userChangePasswordRequestDto";
import { UserResponseDto } from "../../../models/user/dto/userResponseDto";

export interface ChangePasswordServiceInterface {
  /**
   * Maneja la actualización de un elemento.
   * @param request {UserResponseDto}
   */
  handle(request: UserChangePasswordRequestDto): Promise<boolean>;
}
