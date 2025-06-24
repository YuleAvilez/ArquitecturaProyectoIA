import { AutoMap } from "@automapper/classes";
import { CareerRecommendationResponseDto } from "../../careerRecommendations/dto/careerRecomendationResponseDto";
import { UserResponseDto } from "../../user/dto/userResponseDto";
import { UserVocationalResponseDto } from "../../userVocationalResponses/dto/userVocationalResponseDto";

export class VocationalSurveyResponseDto {
  @AutoMap()
  public vocationalSurveyId?: number;

  @AutoMap()
  public userId?: number;

  @AutoMap()
  public createdAt?: Date;

  @AutoMap()
  public user?: UserResponseDto;

  @AutoMap()
  public responses?: UserVocationalResponseDto[];

  @AutoMap()
  public recommendations?: CareerRecommendationResponseDto[];
}
