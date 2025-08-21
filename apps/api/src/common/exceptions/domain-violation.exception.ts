import { Exception, ExceptionProps } from "./exception";

export class DomainViolationException extends Exception {
  constructor(errors: ExceptionProps | ExceptionProps[]) {
    super(errors);
  }
}
