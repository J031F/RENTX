import { getRepository, Repository } from "typeorm";

import { ICarImageRepository } from "@modules/cars/repositories/ICarImageRepository";

import { CarImage } from "../entities/CarImage";

class CarImageRepository implements ICarImageRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }
  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = this.repository.create({ car_id, image_name });

    await this.repository.save(carImage);

    return carImage;
  }

  async findCarImages(car_id: string): Promise<CarImage[]> {
    const carImages = await this.repository.find({ car_id });
    return carImages;
  }

  async deleteCarImage(photoId: string): Promise<void> {
    await this.repository.delete({ id: photoId });
  }
}

export { CarImageRepository };
