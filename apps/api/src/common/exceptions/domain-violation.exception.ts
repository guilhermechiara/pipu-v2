import { Exception, ExceptionProps } from "./exception";

export class DomainViolationException extends Exception {
  constructor(error: ExceptionProps) {
    super(error);
  }
}
