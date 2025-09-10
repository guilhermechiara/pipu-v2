import { ERROR_CODES } from "@pipu/api";
import { NotAuthorizedException } from "@app/common/exceptions/not-authorized.exception";

export class TokenExpiredException extends NotAuthorizedException {
  constructor() {
    super({
      code: ERROR_CODES.AUTH.TOKEN_EXPIRED,
      description: `Token expired`,
    });
  }
}
