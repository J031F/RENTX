import { inject, injectable } from "tsyringe";

import { ICarImageRepository } from "@modules/cars/repositories/ICarImageRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarImageRepository")
    private carImageRepository: ICarImageRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}
  async execute({ car_id, images_name }: IRequest): Promise<void> {
    const carImages = await this.carImageRepository.findCarImages(car_id);

    if (carImages) {
      carImages.map(async (image) => {
        await this.carImageRepository.deleteCarImage(image.id);
        await this.storageProvider.delete(image.image_name, "cars");
      });
    }

    images_name.map(async (image) => {
      await this.carImageRepository.create(car_id, image);
      await this.storageProvider.save(image, "cars");
    });
  }
}

export { UploadCarImagesUseCase };
