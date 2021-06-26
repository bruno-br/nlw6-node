class IncorrectParamError extends Error {
  constructor(paramName: string) {
    super(`Incorrect ${paramName}`);
    this.name = "IncorrectParamError";
  }
}

export { IncorrectParamError };
