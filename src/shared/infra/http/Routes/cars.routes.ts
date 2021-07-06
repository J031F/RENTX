import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/UseCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/UseCases/createCarSpecification/createCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/UseCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/UseCases/uploadCarImages/UploadCarImagesController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const uploadAvatar = multer(uploadConfig.upload("./tmp/cars"));

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

carsRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  uploadAvatar.array("images"),
  uploadCarImagesController.handle
);

export { carsRoutes };
