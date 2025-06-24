import { JsonController, Post } from "routing-controllers";
import { Inject, Service } from "typedi";
import { IModuleGetAllService } from "../interfaces/services/module/IModuleGetAllService";
import { ModuleResponseDto } from "../models/modules/dto/moduleResponseDto";

@Service()
@JsonController()
export class ModuleController {
  constructor(
    @Inject("IModuleGetAllService")
    private readonly _moduleGetAllService: IModuleGetAllService
  ) {}

  @Post("/getAll")
  async moduleGetAll(): Promise<ModuleResponseDto[]> {
    return await this._moduleGetAllService.handle();
  }
}
