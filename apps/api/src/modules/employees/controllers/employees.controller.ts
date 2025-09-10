import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CreateEmployeeCommand } from "../commands/create-employee.command";
import { ZodValidationPipe } from "@app/common/pipes/zod-validation.pipe";
import { CreateEmployeeRequest, CreateEmployeeRequestSchema } from "@pipu/api";
import { CurrentUser } from "@app/modules/auth/decorators/current-user.decorator";
import { AuthenticatedUser } from "@app/modules/auth/types/authenticated-user";
import { AuthService } from "@app/modules/auth/services/auth.service";
import { ChangeLeaderCommand } from "@app/modules/employees/commands/change-leader.command";
import { ChangePeoplePartnerCommand } from "@app/modules/employees/commands/change-people-partner.command";
import { ListEmployeesQuery } from "@app/modules/employees/queries/list-employees.query";
import { sleep } from "@app/common/utils/sleep";

@Controller("employees")
export class EmployeesController {
  constructor(
    private readonly _createEmployeeCommand: CreateEmployeeCommand,
    private readonly _changeLeaderCommand: ChangeLeaderCommand,
    private readonly _changePeoplePartnerCommand: ChangePeoplePartnerCommand,
    private readonly _listEmployeesQuery: ListEmployeesQuery,
    private readonly _authService: AuthService,
  ) {}

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
      currentLeaderId: input.currentLeaderId,
      currentPeoplePartnerId: input.currentPeoplePartnerId,
    });
  }

  @Put(":id/leaders")
  public async changeLeader(
    @CurrentUser() user: AuthenticatedUser,
    @Body() input: { leaderId: string },
    @Param("id") employeeId: string,
  ) {
    return this._changeLeaderCommand.execute({
      employeeId: employeeId,
      leaderId: input.leaderId,
      user,
    });
  }

  @Put(":id/people-partners")
  public async changePeoplePartner(
    @CurrentUser() user: AuthenticatedUser,
    @Body() input: { peoplePartnerId: string },
    @Param("id") employeeId: string,
  ) {
    return this._changePeoplePartnerCommand.execute({
      peoplePartnerId: input.peoplePartnerId,
      employeeId: employeeId,
      user,
    });
  }
  @Get()
  public async list(@CurrentUser() user: AuthenticatedUser) {
    return this._listEmployeesQuery.execute({
      organizationId: user.organizationId,
    });
  }
}
