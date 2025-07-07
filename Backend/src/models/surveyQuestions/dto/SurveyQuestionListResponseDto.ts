import { AutoMap } from "@automapper/classes";

export class SurveyQuestionListResponseDto {
  @AutoMap()
  public title?: string;

   @AutoMap()
  public questions?: {id: number, title: string}[] ;
}
