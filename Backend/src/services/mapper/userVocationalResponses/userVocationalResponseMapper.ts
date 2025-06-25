import { createMap, forMember, mapFrom } from "@automapper/core";
import { mapper } from "../../../config/mapper";
import { UserVocationalRequestDto } from "../../../models/userVocationalResponses/dto/userVocationalRequestDto";
import { UserVocationalResponseDto } from "../../../models/userVocationalResponses/dto/userVocationalResponseDto";
import { UserVocationalResponses } from "../../../models/userVocationalResponses/model/userVocationalResponsesModel";

export class UserVocationalResponseMapper {
  static defineMapper(): void {
    createMap(mapper, UserVocationalRequestDto, UserVocationalResponses);
    createMap(mapper, UserVocationalResponses, UserVocationalResponseDto, 
      forMember(dest => dest.question, mapFrom(x => x.question)));
    createMap(mapper, UserVocationalResponseDto, UserVocationalResponses);
    createMap(mapper, UserVocationalResponses, UserVocationalRequestDto);
  }
}
