import { RentalRepositoryInMemory } from "@modules/rentals/infra/typeorm/repositories/inMemory/RentalRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryInMemory: RentalRepositoryInMemory;

describe("Create Rental", () => {
  beforeEach(() => {
    rentalRepositoryInMemory = new RentalRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalRepositoryInMemory);
  });

  it("should be able create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "1234",
      car_id: "5678",
      expected_return_date: new Date(),
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able create a new rental if user already has an open rent", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "5678",
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "5678",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able create more than one rental to a same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "test",
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        user_id: "91011",
        car_id: "test",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
