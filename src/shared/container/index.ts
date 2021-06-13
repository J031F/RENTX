import { container } from "tsyringe";

import { UsersRepository } from "../../modules/accounts/repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { ICategoriesRepository } from "../../modules/cars/ropositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/ropositories/implementations/CategoriesRepository";
import { SpecificationsRepository } from "../../modules/cars/ropositories/implementations/SpecificationsRepository";
import { ISpecificationsRepository } from "../../modules/cars/ropositories/ISpecificationsRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
