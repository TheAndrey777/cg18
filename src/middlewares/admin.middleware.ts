import { Request, Response, NextFunction } from "express";

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.user?.isAdmin) {
    return next();
  }

  res.send({ status: "error", error: "Вы не администратор" });
}