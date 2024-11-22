import { HttpException } from "./http.exception";

export class InternalException extends HttpException {
  constructor() {
    super(500, "Произошла внутренняя ошибка");
  }
}