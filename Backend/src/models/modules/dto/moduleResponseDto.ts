import { AutoMap } from "@automapper/classes";

export class ModuleResponseDto {
    @AutoMap()
    public moduleId?: number;

    @AutoMap()
    public name?: string;

    @AutoMap()
    public route?: string;
}