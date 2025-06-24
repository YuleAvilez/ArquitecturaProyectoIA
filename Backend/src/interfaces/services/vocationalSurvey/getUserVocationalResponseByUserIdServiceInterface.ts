import { VocationSurveyGetByUserIdResponseDto } from "../../../models/vocationalSurveys/dto/vocationSurveyGetByUserIdResponseDto";

export interface GetUserVocationalResponseByUserIdServiceInterface {
  handle(userId: number): Promise<VocationSurveyGetByUserIdResponseDto[]>;
}
