import { Exception, ExceptionProps } from "@app/common/exceptions/exception";

export class NotAuthorizedException extends Exception {
  constructor(error: ExceptionProps) {
    super(error);
  }
}
