import { inject, injectable } from "tsyringe";

import { ICarImageRepository } from "@modules/cars/repositories/ICarImageRepository";
import { deleteFile } from "@utils/file";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarImageRepository")
    private carImageRepository: ICarImageRepository
  ) {}
  async execute({ car_id, images_name }: IRequest): Promise<void> {
    const carImages = await this.carImageRepository.findCarImages(car_id);

    if (carImages) {
      carImages.map(async (image) => {
        await this.carImageRepository.deleteCarImage(image.id);
        await deleteFile(`./tmp/cars/${image.image_name}`);
      });
    }

    images_name.map(async (image) => {
      await this.carImageRepository.create(car_id, image);
    });
  }
}

export { UploadCarImagesUseCase };
