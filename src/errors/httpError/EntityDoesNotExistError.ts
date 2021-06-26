import { HttpError } from "./httpError";

class EntityDoesNotExistError extends HttpError {
  constructor(entityName: string) {
    super(`${entityName} does not exist`);
    this.name = "EntityDoesNotExistError";
    this.statusCode = 400;
  }
}

export { EntityDoesNotExistError };
