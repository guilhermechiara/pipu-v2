import { Exception, ExceptionProps } from "./exception";

export class ValidationException extends Exception {
  constructor(error: ExceptionProps) {
    super(error);
  }
}
