import { Exception, ExceptionProps } from "./exception";

export class ForbiddenException extends Exception {
  constructor(errors: ExceptionProps | ExceptionProps[]) {
    super(errors);
  }
}
