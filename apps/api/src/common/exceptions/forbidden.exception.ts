import { Exception, ExceptionProps } from "./exception";

export class ForbiddenException extends Exception {
  constructor(error: ExceptionProps) {
    super(error);
  }
}
