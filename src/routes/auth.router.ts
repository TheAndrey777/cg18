import express from "express";
import { isAuthorized } from "../middlewares/auth.middleware";
import { body } from "express-validator";
import AuthController from "../controllers/auth.controller";

export const authRouter = express.Router();

authRouter.get(
  "/me",
  isAuthorized,
  AuthController.getUser
);

authRouter.post(
  "/login",
  body("username")
    .exists().withMessage("Поле username отсутствует")
    .isLength({ min: 5, max: 32 }).withMessage("Длина поля username не соответствует ограничениям"),
  body("password")
    .exists().withMessage("Поле password отсутствует")
    .isLength({ min: 5, max: 32 }).withMessage("Длина поля password не соответствует ограничениям"),
  AuthController.login
);

authRouter.post(
  "/register",
  body("username")
    .exists().withMessage("Поле username отсутствует")
    .isLength({ min: 5, max: 32 }).withMessage("Длина поля username не соответствует ограничениям"),
  body("name")
    .exists().withMessage("Поле name отсутствует")
    .isLength({ min: 2, max: 64 }).withMessage("Длина поля name не соответствует ограничениям"),
  body("surname")
    .exists().withMessage("Поле surname отсутствует")
    .isLength({ min: 5, max: 64 }).withMessage("Длина поля surname не соответствует ограничениям"),
  body("email")
    .exists().withMessage("Поле email отсутствует")
    .isEmail().withMessage("Поле email должно быть почтой")
    .isLength({ min: 5, max: 32 }).withMessage("Длина поля email не соответствует ограничениям"),
  body("password")
    .exists().withMessage("Поле password отсутствует")
    .isLength({ min: 5, max: 32 }).withMessage("Длина поля password не соответствует ограничениям"),
  AuthController.register
);