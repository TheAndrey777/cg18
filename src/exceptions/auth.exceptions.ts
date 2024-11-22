import { HttpException } from "./http.exception";

export class UnauthorizedException extends HttpException {
  constructor() {
    super(401, "Пользователь не авторизован");
  }
}

export class WrongCredentialsException extends HttpException {
  constructor() {
    super(200, "Неверный логин или пароль");
  }
}

export class UserExistsException extends HttpException {
  constructor() {
    super(200, "Пользователь уже зарегистрирован");
  }
}