import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({
    name,
    email,
    driver_license,
    password,
  }: ICreateUserDTO): Promise<void> {
    const passHash = await hash(password, 8);
    const userAlreadyExist = await this.usersRepository.findByEmail(email);
    if (userAlreadyExist) {
      throw new AppError("User Already Exists!");
    }
    this.usersRepository.create({
      name,
      email,
      driver_license,
      password: passHash,
    });
  }
}

export { CreateUserUseCase };
