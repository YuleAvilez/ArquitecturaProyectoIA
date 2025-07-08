import { UserForgotPasswordRequestDto } from "../../../models/user/dto/userForgotPasswordRequestDto";
import { UserResponseDto } from "../../../models/user/dto/userResponseDto";

export interface ForgotPasswordServiceInterface {
  /**
   * Maneja la actualización de un elemento.
   * @param request {UserForgotPasswordRequestDto}
   */
  handle(request: UserForgotPasswordRequestDto): Promise<boolean>;
}
 
