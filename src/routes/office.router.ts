import express from "express"
import { isAuthorized } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/admin.middleware";
import { body, param } from "express-validator";
import OfficeController from "../controllers/office.controller";

export const officeRouter = express.Router();

officeRouter.post(
  "/",
  isAuthorized,
  isAdmin,
  body("name")
    .exists().withMessage("Поле name отсутствует")
    .isLength({ min: 5, max: 32 }).withMessage("Длина поля name не соответствует ограничениям"),
  body("address")
    .exists().withMessage("Поле address отсутствует")
    .isLength({ min: 5, max: 64 }).withMessage("Длина поля address не соответствует ограничениям"),
  OfficeController.createOffice
);

officeRouter.post(
  "/:id",
  isAuthorized,
  isAdmin,
  param("id")
    .exists().withMessage("Параметр id отсутствует")
    .isInt({ min: 0, max: 1e9 }).withMessage("Параметр id должен быть числом от 1 до 1e9"),
  body("workerId")
    .exists().withMessage("Поле workerId отсутствует")
    .isInt({ min: 0, max: 1e9 }).withMessage("Поле workerId должно быть числом от 1 до 1e9"),
  OfficeController.addWorker
);

officeRouter.put(
  "/:id",
  isAuthorized,
  isAdmin,
  param("id")
    .exists().withMessage("Параметр id отсутствует")
    .isInt({ min: 0, max: 1e9 }).withMessage("Параметр id должен быть числом от 1 до 1e9"),
  body("floorplan")
    .exists().withMessage("Поле floorplan отсутствует")
    .isJSON().withMessage("Поле floorplan должно содержать JSON"),
  OfficeController.updateOffice
);

officeRouter.get(
  "/",
  isAuthorized,
  OfficeController.getAllOffices
);