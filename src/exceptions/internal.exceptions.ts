import { HttpException } from "./http.exception";

export class InternalException extends HttpException {
  constructor() {
    super(500, "Произошла внутренняя ошибка");
  }
}

export class NotFoundException extends HttpException {
  constructor() {
    super(404, "Объект не найден");
  }
}
