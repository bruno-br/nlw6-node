import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors/httpError/UnauthorizedError";
import { ensureAuthenticated } from "./ensureAuthenticated";

export function authFrontEnd(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { access_token } = request.cookies;

  if (!request.headers.authorization) {
    request.headers.authorization = `Bearer ${access_token}`;
  }

  try {
    return ensureAuthenticated(request, response, next);
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return response.redirect("/login");
    }
  }
}
