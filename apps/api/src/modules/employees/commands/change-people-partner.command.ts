import { Injectable } from "@nestjs/common";
import { ICommand } from "@app/common/interfaces/command";
import { AuthenticatedUser } from "@app/modules/auth/types/authenticated-user";
import { EmployeeResponse } from "@pipu/api";
import { EmployeesService } from "@app/modules/employees/services/employees.service";
import { PrismaService } from "@app/infrastructure/database/prisma.service";
import { EmployeeMapper } from "@app/modules/employees/mappers/employee.mapper";

export type ChangePeoplePartnerCommandInput = {
  employeeId: string;
  peoplePartnerId: string;
  user: AuthenticatedUser;
};
export type ChangePeoplePartnerCommandOutput = EmployeeResponse;

@Injectable()
export class ChangePeoplePartnerCommand
  implements
    ICommand<ChangePeoplePartnerCommandInput, ChangePeoplePartnerCommandOutput>
{
  constructor(
    private readonly _employeesService: EmployeesService,
    private readonly _prismaService: PrismaService,
    private readonly _employeeMapper: EmployeeMapper,
  ) {}

  async execute(
    input: ChangePeoplePartnerCommandInput,
  ): Promise<ChangePeoplePartnerCommandOutput> {
    const employee = await this._employeesService.findEmployeeByIdOrThrow({
      id: input.employeeId,
      organizationId: input.user.organizationId,
    });

    const peoplePartner = await this._employeesService.findEmployeeByIdOrThrow({
      id: input.peoplePartnerId,
      organizationId: input.user.organizationId,
    });

    await this._prismaService.$transaction(async (tx) => {
      await this._employeesService.changePeoplePartner(
        employee,
        peoplePartner,
        tx,
      );
    });

    return this._employeeMapper.toResponse(employee);
  }
}
