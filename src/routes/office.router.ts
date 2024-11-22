import express from "express"
import { isAuthorized } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/admin.middleware";
import { body } from "express-validator";
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