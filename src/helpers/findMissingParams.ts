import { MissingParamError } from "../errors/httpError/MissingParamError";

export function findMissingParams(body: object, requiredParams: string[]) {
  for (const param of requiredParams) {
    if (!body[param]) {
      throw new MissingParamError(param);
    }
  }
}
