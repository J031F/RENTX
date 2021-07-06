import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./createCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("should not be able to add a new specification to an unregistered car", async () => {
    expect(async () => {
      const car_id = "1234";
      const specifications_id = ["5678"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to add a new specification to a car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Available",
      description: "description",
      dayly_rate: 123,
      license_plate: "AVAI-LABLE",
      fine_amount: 112,
      brand: "brand",
      category_id: "category_id",
    });

    const specification = await specificationsRepositoryInMemory.create({
      description: "test",
      name: "test",
    });

    const specifications_id = [specification.id];

    const carSpecification = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(carSpecification).toHaveProperty("specifications");
    expect(carSpecification.specifications.length).toBe(1);
  });
});
