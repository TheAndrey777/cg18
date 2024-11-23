import { Request, Response, NextFunction } from "express";
import UserService from "../services/user.service";

class UserController {
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    const users = await UserService.getAllUsers();
    res.send({ status: "success", users });
  }
}

export default new UserController;