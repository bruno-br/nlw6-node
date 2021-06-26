import { HttpError } from "./httpError";

class MissingParamError extends HttpError {
  statusCode: number;
  constructor(paramName: string) {
    super(`Missing param ${paramName}`);
    this.name = "MissingParamError";
    this.statusCode = 400;
  }
}

export { MissingParamError };
