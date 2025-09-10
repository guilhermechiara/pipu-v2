import { ValidationException } from "@app/common/exceptions/validation.exception";
import { ERROR_CODES } from "@pipu/api";

export class InvalidOneTimeCodeException extends ValidationException {
  constructor() {
    super({
      code: ERROR_CODES.AUTH.INVALID_ONE_TIME_CODE,
      description: `Invalid one time code`,
    });
  }
}
