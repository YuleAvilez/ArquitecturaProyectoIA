import { createMap } from "@automapper/core";
import { mapper } from "../../../config/mapper";
import { UserRequestDto } from "../../../models/user/dto/userRequestDto";
import { UserResponseDto } from "../../../models/user/dto/userResponseDto";
import { User } from "../../../models/user/model/userModel";

export class UserMapper {
  static defineMapper(): void {
    createMap(mapper, UserRequestDto, User);
    createMap(mapper, User, UserResponseDto);
    createMap(mapper, UserResponseDto, User);
    createMap(mapper, User, UserRequestDto);
  }
}
