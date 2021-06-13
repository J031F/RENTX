import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

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
