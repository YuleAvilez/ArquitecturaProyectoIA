import { UserForgotPasswordRequestDto } from "../../../models/user/dto/userForgotPasswordRequestDto";

export interface ForgotPasswordServiceInterface {
  /**
   * Maneja la actualización de un elemento.
   * @param request {UserForgotPasswordRequestDto}
   */
  handle(request: UserForgotPasswordRequestDto): Promise<boolean>;
}
 
