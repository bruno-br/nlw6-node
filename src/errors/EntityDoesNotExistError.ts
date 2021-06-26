class EntityDoesNotExistError extends Error {
  constructor(entityName: string) {
    super(`${entityName} does not exist`);
    this.name = "EntityDoesNotExistError";
  }
}

export { EntityDoesNotExistError };
