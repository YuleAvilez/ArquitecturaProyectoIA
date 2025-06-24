import { ModuleResponseDto } from "../../../models/modules/dto/moduleResponseDto";

export interface IModuleGetAllService {
  handle(): Promise<ModuleResponseDto[]>;
}
