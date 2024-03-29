import { getCustomRepository } from "typeorm";
import { EntityAlreadyExistsError } from "../errors/httpError/EntityAlreadyExistsError";
import { MissingParamError } from "../errors/httpError/MissingParamError";
import { TagsRepositories } from "../repositories/TagsRepositories";

class CreateTagService {
  async execute(name: string) {
    const tagsRepositories = getCustomRepository(TagsRepositories);

    if (!name) {
      throw new MissingParamError("name");
    }

    const tagAlreadyExists = await tagsRepositories.findOne({ name });

    if (tagAlreadyExists) {
      throw new EntityAlreadyExistsError("Tag");
    }

    const tag = tagsRepositories.create({ name });

    await tagsRepositories.save(tag);

    return tag;
  }
}

export { CreateTagService };
