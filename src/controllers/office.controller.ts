import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ValidationException } from "../exceptions/validation.exception";
import { InternalException, NotFoundException } from "../exceptions/internal.exceptions";
import { HttpException } from "../exceptions/http.exception";
import OfficeService from "../services/office.service";
import UserService from "../services/user.service";

class OfficeController {
  public async createOffice(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationException(errors.array()));
    }

    const user = await UserService.findByUsername(req.body.username);
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

  public async getAllOffices(req: Request, res: Response, next: NextFunction) {
    const result = await OfficeService.getAllOffices();
    res.send({
      status: "success",
      offices: result 
    });
  }

  public async addWorker(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationException(errors.array()));
    }

    const office = await OfficeService.findOfficeById(parseInt(req.params.id));
    if (!office) {
      return next(new NotFoundException);
    }

    const worker = await UserService.getUserById(req.body.workerId);
    if (!worker) {
      return next(new NotFoundException);
    }

    const n = office.workers.filter((w) => w.id == req.body.workerId).length;
    if (n > 0) {
      return next(new HttpException(403, "Работник уже есть в данном офисе"));
    }

    await OfficeService.addWorker(office, worker);
    res.send({ status: "success" });
  }

  public async updateOffice(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationException(errors.array()));
    }

    const office = await OfficeService.findOfficeById(parseInt(req.params.id));
    if (!office) {
      return next(new NotFoundException);
    }

    await OfficeService.updateFloorplan(office, JSON.parse(req.body.floorplan));
    res.send({ status: "success" });
  }
}

export default new OfficeController;