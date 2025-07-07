import { AutoMap } from "@automapper/classes";

export class QuestionSectionResponseDto {
  @AutoMap()
  public questionSection?: number;
  
  @AutoMap()
  public titleSection?: string;
}
