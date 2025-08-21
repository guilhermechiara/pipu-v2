import { Exception, ExceptionProps } from "./exception";

export class RequestValidationException extends Exception {
  constructor(errors: ExceptionProps | ExceptionProps[]) {
    super(errors);
  }
}
