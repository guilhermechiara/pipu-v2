import { NotFoundException } from "@app/common/exceptions/not-found.exception";
import { ERROR_CODES } from "@pipu/api";

export class EmployeeNotFoundException extends NotFoundException {
  constructor(id?: string) {
    super({
      code: ERROR_CODES.EMPLOYEE.EMPLOYEE_NOT_FOUND,
      description: id
        ? `Employee with id ${id} not found`
        : `Employee not found`,
    });
  }
}
