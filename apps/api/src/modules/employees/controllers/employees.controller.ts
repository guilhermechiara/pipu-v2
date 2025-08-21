import { Body, Controller, Post } from "@nestjs/common";
import { CreateEmployeeCommand } from "../commands/create-employee.command";
import { ZodValidationPipe } from "@app/common/pipes/zod-validation.pipe";
import { CreateEmployeeRequest, CreateEmployeeRequestSchema } from "@pipu/api";
import { CurrentUser } from "@app/modules/auth/decorators/current-user.decorator";
import { AuthenticatedUser } from "@app/modules/auth/types/authenticated-user";

@Controller("employees")
export class EmployeesController {
  constructor(private readonly _createEmployeeCommand: CreateEmployeeCommand) {}

  @Post()
  public async create(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(CreateEmployeeRequestSchema))
    input: CreateEmployeeRequest,
  ) {
    return this._createEmployeeCommand.execute({
      fullName: input.fullName,
      email: input.email,
      organizationId: user.organizationId,
    });
  }
}
