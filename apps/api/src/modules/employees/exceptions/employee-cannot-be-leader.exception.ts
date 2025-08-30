import { DomainViolationException } from "@app/common/exceptions/domain-violation.exception";
import { ERROR_CODES } from "@pipu/api";

export class EmployeeCannotBeAManagerOfItselfException extends DomainViolationException {
  constructor() {
    super({
      code: ERROR_CODES.EMPLOYEE.EMPLOYEE_CANNOT_BE_A_MANAGER_OF_ITSELF,
      description: `Employee cannot be a manager of itself`,
    });
  }
}
