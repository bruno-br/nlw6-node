import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { IncorrectParamError } from "../errors/httpError/IncorrectParamError";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    // Verificar se o email existe
    const user = await usersRepositories.findOne({ email });

    if (!user) {
      throw new IncorrectParamError("email/password");
    }

    // Verificar se senha está correta
    const passwordsMatch = await compare(password, user.password);

    if (!passwordsMatch) {
      throw new IncorrectParamError("email/password");
    }

    // Gerar token
    const token = sign(
      {
        email: user.email,
      },
      "610b0e7b0ff84d82f63dc9fa97e926bc",
      { subject: user.id, expiresIn: "1d" }
    );

    return token;
  }
}

export { AuthenticateUserService };
