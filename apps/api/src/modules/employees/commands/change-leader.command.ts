import { ICommand } from "@app/common/interfaces/command";
import { EmployeeResponse } from "@pipu/api";
import { Injectable } from "@nestjs/common";
import { AuthenticatedUser } from "@app/modules/auth/types/authenticated-user";
import { EmployeesService } from "@app/modules/employees/services/employees.service";
import { PrismaService } from "@app/infrastructure/database/prisma.service";
import { EmployeeMapper } from "@app/modules/employees/mappers/employee.mapper";

export type ChangeLeaderCommandInput = {
  employeeId: string;
  leaderId: string;
  user: AuthenticatedUser;
};
export type ChangeLeaderCommandOutput = EmployeeResponse;

@Injectable()
export class ChangeLeaderCommand
  implements ICommand<ChangeLeaderCommandInput, ChangeLeaderCommandOutput>
{
  constructor(
    private readonly _employeesService: EmployeesService,
    private readonly _employeeMapper: EmployeeMapper,
    private readonly _prismaService: PrismaService,
  ) {}

  async execute(
    input: ChangeLeaderCommandInput,
  ): Promise<ChangeLeaderCommandOutput> {
    const employee = await this._employeesService.findEmployeeByIdOrThrow({
      id: input.employeeId,
      organizationId: input.user.organizationId,
    });

    const leader = await this._employeesService.findEmployeeByIdOrThrow({
      id: input.leaderId,
      organizationId: input.user.organizationId,
    });

    await this._prismaService.$transaction(async (tx) => {
      await this._employeesService.changeLeader(employee, leader, tx);
    });

    return this._employeeMapper.toResponse(employee);
  }
}
