import { ICommand } from "@app/common/interfaces/command";
import { Injectable, Logger } from "@nestjs/common";
import { CreateEmployeeProps } from "@app/modules/employees/entities/employee";
import { EmployeeMapper } from "@app/modules/employees/mappers/employee.mapper";
import { EmployeeResponse } from "@pipu/api";
import { EmployeesService } from "@app/modules/employees/services/employees.service";
import { EmployeeStatus } from "@app/modules/employees/enums/employee-status";
import { PrismaService } from "@app/infrastructure/database/prisma.service";

export type CreateEmployeeInput = Omit<
  CreateEmployeeProps,
  "status" | "userId"
>;

export type CreateEmployeeOutput = EmployeeResponse;

@Injectable()
export class CreateEmployeeCommand
  implements ICommand<CreateEmployeeInput, CreateEmployeeOutput>
{
  private readonly _logger = new Logger(CreateEmployeeCommand.name);

  constructor(
    private readonly _prismaService: PrismaService,
    private readonly _employeesService: EmployeesService,
    private readonly _employeeMapper: EmployeeMapper,
  ) {}

  async execute(input: CreateEmployeeInput): Promise<CreateEmployeeOutput> {
    return await this._prismaService.$transaction(async (tx) => {
      this._logger.log(`Creating employee...`);

      const employee = await this._employeesService.create(
        { ...input, status: EmployeeStatus.ACTIVE },
        tx,
      );

      this._logger.log(`Employee created successfully: ${employee.id}`);

      return this._employeeMapper.toResponse(employee);
    });
  }
}
