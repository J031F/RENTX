import { CarImage } from "../infra/typeorm/entities/CarImage";

interface ICarImageRepository {
  create(car_id: string, image_name: string): Promise<CarImage>;
  findCarImages(car_id: string): Promise<CarImage[]>;
  deleteCarImage(photoId: string): Promise<void>;
}

export { ICarImageRepository };
