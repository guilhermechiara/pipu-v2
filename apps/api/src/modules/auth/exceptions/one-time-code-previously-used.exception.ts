import { ValidationException } from "@app/common/exceptions/validation.exception";
import { ERROR_CODES } from "@pipu/api";

export class OneTimeCodePreviouslyUsedException extends ValidationException {
  constructor() {
    super({
      code: ERROR_CODES.AUTH.ONE_TIME_CODE_PREVIOUS_USED,
      description: `Authentication code previously used`,
    });
  }
}
