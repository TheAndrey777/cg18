import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ValidationException } from "../exceptions/validation.exception";
import OfficeService from "../services/office.service";
import userService from "../services/user.service";
import { InternalException } from "../exceptions/internal.exceptions";

class OfficeController {
  public async createOffice(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationException(errors.array()));
    }

    const user = await userService.findByUsername(req.body.username);
    if (!user) {
      return next(new InternalException);
    }

    const result = await OfficeService.createOffice(
      req.body.name,
      req.body.address,
      user
    );

    if (!result) {
      res.send({
        status: "error",
        messages: [
          "Произошла ошибка при добавлении офиса"
        ]
      });
      return;
    }

    res.send({ status: "success" });
  }
}

export default new OfficeController;