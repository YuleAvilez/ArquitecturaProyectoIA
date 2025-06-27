import {
  Body,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  QueryParam,
} from "routing-controllers";
import { Inject, Service } from "typedi";
import { ChangePasswordServiceInterface } from "../interfaces/services/user/IChangePasswordService";
import { UserCreateServiceInterface } from "../interfaces/services/user/IUserCreateService";
import { UserGetByIdServiceInterface } from "../interfaces/services/user/IUserGetById";
import { UserUpdateServiceInterface } from "../interfaces/services/user/IUserUpdate";
import { UserChangePasswordRequestDto } from "../models/user/dto/userChangePasswordRequestDto";
import { UserRequestDto } from "../models/user/dto/userRequestDto";
import { UserResponseDto } from "../models/user/dto/userResponseDto";
import { UserGetAllServiceInterface } from "../interfaces/services/user/userGetAllServiceInterface";
import { PaginationDto } from "../utils/dto/PaginationDto";

@Service()
@JsonController("/user")
export class UserController {
  constructor(
    @Inject("UserCreateServiceInterface")
    private readonly _userCreateService: UserCreateServiceInterface,
    @Inject("UserGetByIdServiceInterface")
    private readonly _userGetByIdService: UserGetByIdServiceInterface,
    @Inject("UserUpdateServiceInterface")
    private readonly _userUpdateService: UserUpdateServiceInterface,
    @Inject("ChangePasswordServiceInterface")
    private readonly _changePasswordService: ChangePasswordServiceInterface,
    @Inject("UserGetAllServiceInterface")
    private readonly _userGetAllServiceInterface: UserGetAllServiceInterface,
  ) { }

  @Post("/create")
  async create(@Body() body: UserRequestDto): Promise<UserResponseDto> {
    return await this._userCreateService.handle(body);
  }

  @Get("/getById/:id")
  async getById(@Param("id") id: number): Promise<UserResponseDto> {
    return await this._userGetByIdService.handle(id);
  }

  @Put("/update/:id")
  async update(
    @Param("id") id: number,
    @Body() body: UserRequestDto
  ): Promise<UserResponseDto> {
    return await this._userUpdateService.handle(id, body);
  }

  @Post("/changePassword")
  async changePassword(
    request: UserChangePasswordRequestDto
  ): Promise<boolean> {
    return await this._changePasswordService.handle(request);
  }

  @Get("/pagination")
  async pagiantion(
    @QueryParam("page") page: number = 1,
    @QueryParam("size") size: number = 10
  ): Promise<PaginationDto<UserResponseDto>> {
    return await this._userGetAllServiceInterface.handle(page, size);
  }
}
