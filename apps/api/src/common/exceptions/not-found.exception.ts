import { Exception, ExceptionProps } from "./exception";

export class NotFoundException extends Exception {
  constructor(error: ExceptionProps) {
    super(error);
  }
}
