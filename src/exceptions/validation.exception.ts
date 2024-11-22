import { HttpException } from "./http.exception";

export class ValidationException extends HttpException {
  constructor(errors?: any[]) {
    super(400, "Ошибка валидации тела запроса", errors);
  }
}