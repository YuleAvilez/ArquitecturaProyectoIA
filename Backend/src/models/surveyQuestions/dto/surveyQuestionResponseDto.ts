import { AutoMap } from "@automapper/classes";

export class SurveyQuestionResponseDto {
  @AutoMap()
  public surveyQuestionsId?: number;

  @AutoMap()
  public questionText?: string;

  @AutoMap()
  public order?: number;

  @AutoMap()
  public systemDefined?: boolean;
}
