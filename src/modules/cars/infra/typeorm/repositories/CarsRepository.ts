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
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.carsRepository.create({
      brand,
      category_id,
      dayly_rate,
      description,
      fine_amount,
      name,
      license_plate,
      specifications,
    });

    await this.carsRepository.save(car);

    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.carsRepository.findOne({ license_plate });

    return car;
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const carsQuery = this.carsRepository
      .createQueryBuilder("c")
      .where("available = :available", { available: true });

    if (brand) {
      carsQuery.andWhere("brand = :brand", { brand });
    }
    if (category_id) {
      carsQuery.andWhere("category_id = :category_id", { category_id });
    }
    if (name) {
      carsQuery.andWhere("name = :name", { name });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findById(id: string): Promise<Car> {
    const cars = await this.carsRepository.findOne(id);

    return cars;
  }
}

export { CarsRepository };
