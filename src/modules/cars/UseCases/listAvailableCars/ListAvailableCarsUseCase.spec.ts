import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("It should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car_Available_Test",
      description: "Car description",
      dayly_rate: 100,
      license_plate: "XXX-XXX",
      fine_amount: 100,
      brand: "brand",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car_Brand_Test",
      description: "Car description",
      dayly_rate: 100,
      license_plate: "XXX-XXY",
      fine_amount: 100,
      brand: "Car_brand",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_Brand",
    });
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car_Name_Test",
      description: "Car description",
      dayly_rate: 100,
      license_plate: "XXX-XYY",
      fine_amount: 100,
      brand: "Car_brand",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car_Name_Test",
    });
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car_Category_Test",
      description: "Car description",
      dayly_rate: 100,
      license_plate: "XXX-YYY",
      fine_amount: 100,
      brand: "Car_brand",
      category_id: "142563",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "142563",
    });
    expect(cars).toEqual([car]);
  });
});
