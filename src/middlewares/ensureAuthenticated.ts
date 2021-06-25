import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Receber o token
  const authToken = request.headers.authorization;

  // Validar se o token está preenchido
  if (!authToken) {
    return response.status(401).end();
  }

  const token = authToken.replace("Bearer ", "");

  try {
    // Checar se o token é válido
    const { sub } = verify(
      token,
      "610b0e7b0ff84d82f63dc9fa97e926bc"
    ) as IPayload;

    // Recuperar informações do usuário
    request.user_id = sub;
  } catch (err) {
    return response.status(401).end();
  }

  return next();
}
