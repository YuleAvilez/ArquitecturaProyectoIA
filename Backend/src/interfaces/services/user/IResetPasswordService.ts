import { UserResetPasswordRequestDto } from "../../../models/user/dto/userResetPasswordRequestDto";

export interface ResetPasswordServiceInterface {
  handle(request: UserResetPasswordRequestDto): Promise<boolean>;
}
