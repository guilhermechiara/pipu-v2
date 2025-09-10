import { Exception, ExceptionProps } from "./exception";

export class RequestValidationException extends Exception {
  constructor(error: ExceptionProps) {
    super(error);
  }
}
