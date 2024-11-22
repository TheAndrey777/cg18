export class HttpException extends Error {
  public status: number;
  public message: string;
  public errors?: any[];
  constructor(status: number, message?: string, errors?: any[]) {
    super(message || "Что-то пошло не так");
    this.status = status;
    this.message = message || "Что-то пошло не так";
    this.errors = errors;
  }
}