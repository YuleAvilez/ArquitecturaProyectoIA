import { AutoMap } from "@automapper/classes";

export class CareerDetailResponseDto {
  @AutoMap()
  public careerName?: string;

  @AutoMap()
  public salary?: string;

  @AutoMap()
  public trends?: string[];

  @AutoMap()
  public sources?: { title: string; url: string }[];
}
