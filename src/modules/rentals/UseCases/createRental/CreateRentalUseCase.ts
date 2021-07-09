import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}
  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new AppError("Car is unavailable");
    }

    const userUnauthorized = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (userUnauthorized) {
      throw new AppError("There's already a rental in this username");
    }

    const rent = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rent;
  }
}

export { CreateRentalUseCase };
