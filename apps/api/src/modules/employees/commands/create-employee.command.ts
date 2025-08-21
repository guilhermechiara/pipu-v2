import { ICommand } from "@app/common/interfaces/command";
import { EmployeeRepository } from "../repositories/employee.repository";
import { Injectable, Logger } from "@nestjs/common";
import {
  CreateEmployeeProps,
  Employee,
} from "@app/modules/employees/entities/employee";
import { EmployeeStatus } from "@app/modules/employees/enums/employee-status";
import { EmployeeMapper } from "@app/modules/employees/mappers/employee.mapper";
import { EmployeeResponse } from "@pipu/api";
import { UsersService } from "@app/modules/auth/services/users.service";
import { UserStatus } from "@app/modules/auth/enums/user-status";
import { EmployeeEmailAlreadyExistsException } from "@app/modules/employees/exceptions/employee-email-already-exists.exception";

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
    private readonly _employeeRepository: EmployeeRepository,
    private readonly _employeeMapper: EmployeeMapper,
    private readonly _usersService: UsersService,
  ) {}

  async execute(input: CreateEmployeeInput): Promise<CreateEmployeeOutput> {
    const employeeExists = await this._employeeRepository.findByEmail(
      input.email,
    );

    if (employeeExists) {
      throw new EmployeeEmailAlreadyExistsException();
    }

    const user = await this._usersService.create({
      email: input.email,
      status: UserStatus.ACTIVE,
      organizationId: input.organizationId,
    });

    const employee = Employee.create({
      ...input,
      status: EmployeeStatus.ACTIVE,
      userId: user.id,
    });

    try {
      await this._employeeRepository.save(employee);
      return this._employeeMapper.toResponse(employee);
    } catch (error) {
      this._logger.error(`Failed to create employee`, error);

      this._logger.log(`Rolling back employee creation...`);
      await this._usersService.delete(user.id, input.organizationId);
      this._logger.log(`Employee creation rolled back`);

      throw error;
    }
  }
}
