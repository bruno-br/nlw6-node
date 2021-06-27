import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

class GetUserService {
  async execute({ user_id }) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne(user_id);

    return user;
  }
}

export { GetUserService };
