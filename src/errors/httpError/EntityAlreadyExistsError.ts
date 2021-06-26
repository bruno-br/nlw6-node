import { HttpError } from "./httpError";

class EntityAlreadyExistsError extends HttpError {
  constructor(entityName: string) {
    super(`${entityName} already exists`);
    this.name = "EntityAlreadyExistsError";
    this.statusCode = 400;
  }
}

export { EntityAlreadyExistsError };
