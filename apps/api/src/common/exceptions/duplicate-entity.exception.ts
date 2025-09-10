import { Exception, ExceptionProps } from "./exception";

export class DuplicateEntityException extends Exception {
  constructor(error: ExceptionProps) {
    super(error);
  }
}
