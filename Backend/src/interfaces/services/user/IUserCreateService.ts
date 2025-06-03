import { UserRequestDto } from "../../../models/user/dto/userRequestDto";
import { UserResponseDto } from "../../../models/user/dto/userResponseDto";

export interface UserCreateServiceInterface {
  /**
   * Maneja la creación de un elemento.
   * @param request {UserRequestDto}
   */
  handle(request: UserRequestDto): Promise<UserResponseDto>;
}
