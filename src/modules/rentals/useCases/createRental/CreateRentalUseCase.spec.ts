import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Rental", () => {
  const dayAdd24hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car Test",
      dayly_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "12341",
      car_id: car.id,
      expected_return_date: dayAdd24hours,
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able create a new rental if user already has an open rent", async () => {
    await rentalsRepositoryInMemory.create({
      user_id: "1234",
      car_id: "999",
      expected_return_date: dayAdd24hours,
    });
    await expect(
      createRentalUseCase.execute({
        user_id: "1234",
        car_id: "777",
        expected_return_date: dayAdd24hours,
      })
    ).rejects.toEqual(
      new AppError("There's already a rental in this username")
    );
  });

  it("should not be able create more than one rental to a same car", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "test",
      user_id: "12345",
      expected_return_date: dayAdd24hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "321",
        car_id: "test",
        expected_return_date: dayAdd24hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable"));
  });

  it("should not be able create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "91011",
        car_id: "test",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time!"));
  });
});
