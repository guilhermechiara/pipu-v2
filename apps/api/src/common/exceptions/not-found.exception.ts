import { Exception, ExceptionProps } from "./exception";

export class NotFoundException extends Exception {
  constructor(errors: ExceptionProps | ExceptionProps[]) {
    super(errors);
  }
}
