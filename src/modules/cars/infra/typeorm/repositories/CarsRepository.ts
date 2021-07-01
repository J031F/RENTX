import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private carsRepository: Repository<Car>;

  constructor() {
    this.carsRepository = getRepository(Car);
  }

  async create({
    brand,
    category_id,
    dayly_rate,
    description,
    fine_amount,
    name,
    license_plate,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.carsRepository.create({
      brand,
      category_id,
      dayly_rate,
      description,
      fine_amount,
      name,
      license_plate,
    });

    await this.carsRepository.save(car);

    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.carsRepository.findOne({ license_plate });

    return car;
  }
}

export { CarsRepository };
