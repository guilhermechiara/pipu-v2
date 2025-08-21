import { ForbiddenException } from "@app/common/exceptions/forbidden.exception";
import { ERROR_CODES } from "@pipu/api";

export class UserNotAllowedException extends ForbiddenException {
  constructor() {
    super({
      code: ERROR_CODES.USER.USER_NOT_ALLOWED,
      description: `User is not allowed`,
    });
  }
}
