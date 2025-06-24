import { createMap } from "@automapper/core";
import { mapper } from "../../../config/mapper";
import { ModuleRequestDto } from "../../../models/modules/dto/moduleRequestDto";
import { ModuleResponseDto } from "../../../models/modules/dto/moduleResponseDto";
import { Modules } from "../../../models/modules/model/modulesModel";

export class ModuleMapper {
  static defineMapper(): void {
    createMap(mapper, ModuleRequestDto, Modules);
    createMap(mapper, Modules, ModuleResponseDto);
    createMap(mapper, ModuleResponseDto, Modules);
    createMap(mapper, Modules, ModuleRequestDto);
  }
}
