import { AutoMap } from "@automapper/classes";

export class SurveyQuestionResponseDto {
  @AutoMap()
  public surveyQuestionId?: number;

  @AutoMap()
  public questionText?: string;

  @AutoMap()
  public order?: number;

  @AutoMap()
  public questionSectionId?: number;

  @AutoMap()
  public systemDefined?: boolean;
}
