import { DuplicateEntityException } from "@app/common/exceptions/duplicate-entity.exception";
import { ERROR_CODES } from "@pipu/api";

export class EmployeeEmailAlreadyExistsException extends DuplicateEntityException {
  constructor() {
    super({
      code: ERROR_CODES.EMPLOYEE.EMPLOYEE_EMAIL_ALREADY_EXISTS,
      description: `Employee with email already exists`,
    });
  }
}
