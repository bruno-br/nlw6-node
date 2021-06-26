import { HttpError } from "./httpError";

class IncorrectParamError extends HttpError {
  statusCode: number;
  constructor(paramName: string) {
    super(`Incorrect ${paramName}`);
    this.name = "IncorrectParamError";
    this.statusCode = 400;
  }
}

export { IncorrectParamError };
