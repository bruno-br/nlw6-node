import { CustomError } from "../CustomError";

class HttpError extends CustomError {
  // statusCode vai vir por padrão como 400
  statusCode = 400;
}

export { HttpError };
