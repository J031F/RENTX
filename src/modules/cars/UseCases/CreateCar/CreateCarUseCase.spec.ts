import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });
  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "name",
      description: "description",
      dayly_rate: 123,
      license_plate: "license_plate",
      fine_amount: 112,
      brand: "brand",
      category_id: "category_id",
    });

    expect(car).toHaveProperty("id");
  });

  it("should be able to create a car an license_plate already taken", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car 1",
        description: "description",
        dayly_rate: 123,
        license_plate: "ABC-1234",
        fine_amount: 112,
        brand: "brand",
        category_id: "category_id",
      });

      await createCarUseCase.execute({
        name: "Car 2",
        description: "description",
        dayly_rate: 123,
        license_plate: "ABC-1234",
        fine_amount: 112,
        brand: "brand",
        category_id: "category_id",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a car as available by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      description: "description",
      dayly_rate: 123,
      license_plate: "AVAI-LABLE",
      fine_amount: 112,
      brand: "brand",
      category_id: "category_id",
    });
    console.log(car);

    expect(car.available).toBe(true);
  });
});
