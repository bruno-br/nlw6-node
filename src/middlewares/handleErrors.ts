import { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors/httpError/httpError";

export function handleErrors(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Se o erro for do tipo httpError, usa o statusCode que foi definido
  if (err instanceof HttpError) {
    return response.status(err.statusCode).json({
      error: err.message,
    });
  }

  // Se nao tiver statusCode definido, usa o 400
  if (err instanceof Error) {
    return response.status(400).json({
      error: err.message,
    });
  }

  // Se nao for intancia de Error, da status 500
  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
}
