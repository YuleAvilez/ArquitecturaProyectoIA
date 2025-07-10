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
import { ForgotPasswordServiceInterface } from "../interfaces/services/user/IForgotPasswordService";
import { UserForgotPasswordRequestDto } from "../models/user/dto/userForgotPasswordRequestDto";
import { UserResetPasswordRequestDto } from "../models/user/dto/userResetPasswordRequestDto";
import { ResetPasswordServiceInterface } from "../interfaces/services/user/IResetPasswordService";

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
    @Inject("ForgotPasswordServiceInterface")
    private readonly _forgotPasswordService: ForgotPasswordServiceInterface,
    @Inject("ResetPasswordServiceInterface")
    private readonly _resetPasswordService: ResetPasswordServiceInterface

    
  ) {}

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
    @Body() request: UserChangePasswordRequestDto
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
  @Post("/forgot-password")
  async forgotPassword(
    @Body() body: UserForgotPasswordRequestDto
  ): Promise<{ message: string }> {
    const result = await this._forgotPasswordService.handle(body);
    if (!result) throw new Error("No se pudo enviar el correo.");
    return { message: "Correo de recuperación enviado exitosamente" };
  }

  @Post("/resetPassword")
  async resetPassword(@Body() request: UserResetPasswordRequestDto): Promise<boolean> {
    return await this._resetPasswordService.handle(request);
  }
}
