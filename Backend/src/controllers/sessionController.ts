import { Body, JsonController, Param, Post } from "routing-controllers";
import { Inject, Service } from "typedi";
import { SessionCreateServiceInterface } from "../interfaces/services/session/ISessionCreateService";
import { SessionDeleteServiceInterface } from "../interfaces/services/session/ISessionDeleteService";
import { SessionRequestDto } from "../models/session/dto/sessionRequestDto";
import { SessionResponseDto } from "../models/session/dto/sessionResponseDto";

@Service()
@JsonController()
export class SessionController {
  constructor(
    @Inject("SessionCreateServiceInterface")
    private readonly _sessionCreateService: SessionCreateServiceInterface,
    @Inject("SessionDeleteServiceInterface")
    private _sessionDeleteService: SessionDeleteServiceInterface
  ) {}

  @Post("/login")
  async login(@Body() body: SessionRequestDto): Promise<SessionResponseDto> {
    return await this._sessionCreateService.handle(body);
  }

  @Post("/deleteSession/:refreshToken")
  async deleteSession(
    @Param("refreshToken") refreshToken: string
  ): Promise<boolean> {
    return await this._sessionDeleteService.handle(refreshToken);
  }
}
