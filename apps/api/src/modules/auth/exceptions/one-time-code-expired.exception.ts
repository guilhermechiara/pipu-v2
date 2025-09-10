import { ValidationException } from "@app/common/exceptions/validation.exception";
import { ERROR_CODES } from "@pipu/api";

export class OneTimeCodeExpiredException extends ValidationException {
  constructor() {
    super({
      code: ERROR_CODES.AUTH.ONE_TIME_CODE_EXPIRED,
      description: `Authentication code expired`,
    });
  }
}
