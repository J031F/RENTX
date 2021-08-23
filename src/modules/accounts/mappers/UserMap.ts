import { classToClass } from "class-transformer";

import { IUserReponseDTO } from "../dtos/IUserReponseDTO";
import { User } from "../infra/typeorm/entities/user";

class UserMap {
  static toDTO({
    email,
    name,
    id,
    avatar,
    driver_license,
    avatar_url,
  }: User): IUserReponseDTO {
    const user = classToClass({
      email,
      name,
      id,
      avatar,
      driver_license,
      avatar_url,
    });
    return {
      ...user,
    };
  }
}

export { UserMap };
