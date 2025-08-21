import { ORGANIZATION_ERROR_CODES } from "../organizations/exceptions/error-codes";
import { HTTP_ERROR_CODES } from "./http-error-codes";
import { GENERIC_ERROR_CODES } from "./generic-error-codes";
import { USER_ERROR_CODES } from "../auth/exceptions/error-codes";
import { EMPLOYEE_ERROR_CODES } from "../employees/exceptions/error-codes";

export const ERROR_CODES = {
  ORGANIZATION: ORGANIZATION_ERROR_CODES,
  HTTP: HTTP_ERROR_CODES,
  GENERIC: GENERIC_ERROR_CODES,
  USER: USER_ERROR_CODES,
  EMPLOYEE: EMPLOYEE_ERROR_CODES,
};

export type ErrorCode =
  | (typeof ORGANIZATION_ERROR_CODES)[keyof typeof ORGANIZATION_ERROR_CODES]
  | (typeof HTTP_ERROR_CODES)[keyof typeof HTTP_ERROR_CODES]
  | (typeof GENERIC_ERROR_CODES)[keyof typeof GENERIC_ERROR_CODES]
  | (typeof USER_ERROR_CODES)[keyof typeof USER_ERROR_CODES]
  | (typeof EMPLOYEE_ERROR_CODES)[keyof typeof EMPLOYEE_ERROR_CODES];
