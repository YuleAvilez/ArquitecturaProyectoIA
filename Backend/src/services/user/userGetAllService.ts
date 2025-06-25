import { Inject, Service } from "typedi";
import { UserGetAllServiceInterface } from "../../interfaces/services/user/userGetAllServiceInterface";
import { UserRequestDto } from "../../models/user/dto/userRequestDto";
import { UserResponseDto } from "../../models/user/dto/userResponseDto";
import { User } from "../../models/user/model/userModel";
import { GenericRepository } from "../../repositories/GenericRepository";
import { PaginationDto } from "../../utils/dto/PaginationDto";

@Service()
export class UserGetAllService implements UserGetAllServiceInterface {
  constructor(
    @Inject("UserRepository")
    private readonly _repository: GenericRepository<UserRequestDto, User>
  ) { }

  async handle(page: number, size: number): Promise<PaginationDto<UserResponseDto>> {
    try {
      const { rows, count } = await this._repository.getAndCountAll({
        limit: size,
        offset: (page - 1) * size,
      });

      const totalPages = Math.ceil(count / size);

      const data: UserResponseDto[] = rows.map(x => ({
        userId: x.userId,
        email: x.email,
        genderId: x.genderId,
        roleId: x.roleId
      }));

      return {
        totalPages: totalPages,
        totalRows: count,
        currentPage: page,
        size,
        data: data,
      } as PaginationDto<UserResponseDto>;
    } catch (error) {
      throw error;
    }
  }
}
