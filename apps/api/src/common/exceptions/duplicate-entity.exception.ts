import { Exception, ExceptionProps } from "./exception";

export class DuplicateEntityException extends Exception {
  constructor(errors: ExceptionProps | ExceptionProps[]) {
    super(errors);
  }
}
