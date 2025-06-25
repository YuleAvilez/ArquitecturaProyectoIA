import { UserResponseDto } from "../../../models/user/dto/userResponseDto";
import { PaginationDto } from "../../../utils/dto/PaginationDto";

export interface UserGetAllServiceInterface {
    handle(page: number, size: number): Promise<PaginationDto<UserResponseDto>>;
}