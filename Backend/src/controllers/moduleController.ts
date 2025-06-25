import { Get, JsonController } from "routing-controllers";
import { Inject, Service } from "typedi";
import { IModuleGetAllService } from "../interfaces/services/module/IModuleGetAllService";
import { ModuleResponseDto } from "../models/modules/dto/moduleResponseDto";

@Service()
@JsonController("/modules")
export class ModuleController {
  constructor(
    @Inject("IModuleGetAllService")
    private readonly _moduleGetAllService: IModuleGetAllService
  ) { }

  @Get("/getAll")
  async moduleGetAll(): Promise<ModuleResponseDto[]> {
    return await this._moduleGetAllService.handle();
  }
}
