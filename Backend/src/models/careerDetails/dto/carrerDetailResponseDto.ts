import { AutoMap } from "@automapper/classes";

export class CarrerDetailResponseDto {
    @AutoMap()
    public careerDetailId?: number;

    @AutoMap()
    public careerName?: string;

    @AutoMap()
    public salary?: string;

    @AutoMap()
    public trends?: string;

    @AutoMap()
    public sources?: string;
}