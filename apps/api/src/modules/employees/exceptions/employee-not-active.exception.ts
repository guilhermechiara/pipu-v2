import { DomainViolationException } from "@app/common/exceptions/domain-violation.exception";
import { ERROR_CODES } from "@pipu/api";

export class EmployeeNotActiveException extends DomainViolationException {
  constructor(id: string) {
    super({
      code: ERROR_CODES.EMPLOYEE.EMPLOYEE_NOT_ACTIVE,
      description: `Employee with id ${id} is not active`,
    });
  }
}
