import { Exception, ExceptionProps } from "./exception";

export class ValidationException extends Exception {
  constructor(errors: ExceptionProps | ExceptionProps[]) {
    super(errors);
  }
}
