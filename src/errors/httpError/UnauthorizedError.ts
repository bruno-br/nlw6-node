import { HttpError } from "./httpError";

class UnauthorizedError extends HttpError {
  constructor() {
    super("Unauthorized");
    this.name = "UnauthorizedError";
    this.statusCode = 401;
  }
}

export { UnauthorizedError };
