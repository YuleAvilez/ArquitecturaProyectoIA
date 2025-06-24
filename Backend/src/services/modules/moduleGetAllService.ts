import { Inject, Service } from "typedi";
import { mapper } from "../../config/mapper";
import { IModuleGetAllService } from "../../interfaces/services/module/IModuleGetAllService";
import { ModuleRequestDto } from "../../models/modules/dto/moduleRequestDto";
import { ModuleResponseDto } from "../../models/modules/dto/moduleResponseDto";
import { Modules } from "../../models/modules/model/modulesModel";
import { GenericRepository } from "../../repositories/GenericRepository";

@Service()
export class ModuleGetAllService implements IModuleGetAllService {
  constructor(
    @Inject("ModuleRepository")
    private readonly _repository: GenericRepository<ModuleRequestDto, Modules>
  ) {}

  async handle(): Promise<ModuleResponseDto[]> {
    try {
      const searchEntities = await this._repository.getAll();

      const mappedData = mapper.mapArray(
        searchEntities,
        Modules,
        ModuleResponseDto
      );

      return mappedData;
    } catch (error) {
      throw error;
    }
  }
}
