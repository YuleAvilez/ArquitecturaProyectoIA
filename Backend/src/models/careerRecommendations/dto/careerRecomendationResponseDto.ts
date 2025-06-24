import { AutoMap } from "@automapper/classes";

export class CareerRecommendationResponseDto {
  @AutoMap()
  public careerName?: string;

  @AutoMap()
  public description?: string;
}
