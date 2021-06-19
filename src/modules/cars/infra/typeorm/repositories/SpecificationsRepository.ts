import { getRepository, Repository } from "typeorm";

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "@modules/cars/ropositories/ISpecificationsRepository";

import { Specification } from "../entities/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  }

  async findByname(name: string): Promise<Specification> {
    const specifications = await this.repository.findOne({
      name,
    });
    return specifications;
  }
}

export { SpecificationsRepository };
