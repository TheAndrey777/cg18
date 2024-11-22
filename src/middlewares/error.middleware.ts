import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions/http.exception";

export function errorHandler(err: HttpException, req: Request, res: Response, next: NextFunction) {
  return res.status(err.status || 400).send({
    status: "error",
    message: err.message || "Что-то пошло не так",
    errors: err.errors ?? []
  });
}