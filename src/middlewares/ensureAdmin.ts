import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UnauthorizedError } from "../errors/httpError/UnauthorizedError";
import { UsersRepositories } from "../repositories/UsersRepositories";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { user_id } = request;

  const usersRepositories = getCustomRepository(UsersRepositories);

  const { admin } = await usersRepositories.findOne(user_id);

  // Verificar se o usuário é admin

  if (admin) {
    return next();
  }

  throw new UnauthorizedError();
}
