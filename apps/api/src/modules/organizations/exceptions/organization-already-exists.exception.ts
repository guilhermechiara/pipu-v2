import { DuplicateEntityException } from "@app/common/exceptions/duplicate-entity.exception";
import { ERROR_CODES } from "@pipu/api";

export class OrganizationAlreadyExistsException extends DuplicateEntityException {
  constructor() {
    super({
      code: ERROR_CODES.ORGANIZATION.ORGANIZATION_ALREADY_EXISTS,
      description: `Organization with document already exists`,
    });
  }
}
