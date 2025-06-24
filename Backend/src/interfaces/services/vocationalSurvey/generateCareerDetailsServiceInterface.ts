import { CareerDetailResponseDto } from "../../../models/careerDetails/dto/careerDetailResponseDto";

export interface GenerateCareerDetailsServiceInterface {
  handle(answer: string): Promise<CareerDetailResponseDto>;
}
