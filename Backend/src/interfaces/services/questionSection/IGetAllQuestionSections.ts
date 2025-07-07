import { QuestionSectionResponseDto } from "../../../models/QuestionSection/dto/QuestionSectionResponseDto";

export interface GetAllQuestionSections {
    handle(): Promise<QuestionSectionResponseDto[]>;
}