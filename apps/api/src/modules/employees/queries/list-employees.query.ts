import { EmployeeResponse } from "@pipu/api";
import { Injectable } from "@nestjs/common";
import { EmployeeMapper } from "@app/modules/employees/mappers/employee.mapper";
import { EmployeeRepository } from "@app/modules/employees/repositories/employee.repository";
import { IQuery } from "@app/common/interfaces/query";

export type ListEmployeesQueryInput = {
  organizationId: string;
};

export type ListEmployeesQueryOutput = EmployeeResponse[];

@Injectable()
export class ListEmployeesQuery
  implements IQuery<ListEmployeesQueryInput, ListEmployeesQueryOutput>
{
  constructor(
    private readonly _employeeMapper: EmployeeMapper,
    private readonly _employeeRepository: EmployeeRepository,
  ) {}

  async execute(
    input: ListEmployeesQueryInput,
  ): Promise<ListEmployeesQueryOutput> {
    const employees = await this._employeeRepository.findByOrganization({
      organizationId: input.organizationId,
    });

    return employees.map((employee) =>
      this._employeeMapper.toResponse(employee),
    );
  }
}
