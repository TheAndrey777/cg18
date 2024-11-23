import express from "express";
import { isAdmin } from "../middlewares/admin.middleware";
import { isAuthorized } from "../middlewares/auth.middleware";
import UserController from "../controllers/user.controller";

export const userRouter = express.Router();

userRouter.get(
  "/",
  isAuthorized,
  isAdmin,
  UserController.getAllUsers
);