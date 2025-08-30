import { Injectable, Logger } from "@nestjs/common";
import { EmployeeRepository } from "@app/modules/employees/repositories/employee.repository";
import {
  CreateEmployeeProps,
  Employee,
} from "@app/modules/employees/entities/employee";
import { Prisma } from "@prisma/client";
import { EmployeeEmailAlreadyExistsException } from "@app/modules/employees/exceptions/employee-email-already-exists.exception";
import { EmployeeStatus } from "@app/modules/employees/enums/employee-status";
import { User } from "@app/modules/auth/entities/user";
import { UsersService } from "@app/modules/auth/services/users.service";
import { UserStatus } from "@app/modules/auth/enums/user-status";
import { EmployeeNotFoundException } from "@app/modules/employees/exceptions/employee-not-found.exception";
import { FindByIdWithOrganizationId } from "@app/common/types/repository.types";
import { EmployeeHierarchyNodesService } from "@app/modules/employees/services/employee-hierarchy-nodes.service";
import { UserAuthType } from "@app/modules/auth/enums/user-auth-type";
import { EmployeeHierarchyNodeType } from "@app/modules/employees/enums/employee-hierarchy-node-type";

@Injectable()
export class EmployeesService {
  private readonly _logger = new Logger(EmployeesService.name);

  constructor(
    private readonly _employeeRepository: EmployeeRepository,
    private readonly _usersService: UsersService,
    private readonly _employeeHierarchyNodesService: EmployeeHierarchyNodesService,
  ) {}

  public async create(
    input: CreateEmployeeProps,
    tx?: Prisma.TransactionClient,
  ): Promise<Employee> {
    await this._validateEmployeeCreation(input);
    const user = await this._createEmployeeUser(input, tx);

    const employee = Employee.create({
      ...input,
      userId: user.id,
      status: EmployeeStatus.ACTIVE,
    });

    try {
      await this._employeeRepository.save(employee, tx);
      await this._employeeHierarchyNodesService.setupHierarchyNodes(
        employee,
        tx,
      );

      return employee;
    } catch (error) {
      this._logger.error(
        `Failed to create employee, rolling back user creation...`,
        error,
      );
      if (user) {
        await this._rollbackUserCreation(user, tx);
      }

      this._logger.log(`User creation rolled back`);
      throw error;
    }
  }

  public async findEmployeeByIdOrThrow(
    input: FindByIdWithOrganizationId,
    tx?: Prisma.TransactionClient,
  ) {
    const employee = await this._employeeRepository.findById(input, tx);

    if (!employee) {
      throw new EmployeeNotFoundException(input.id);
    }

    return employee;
  }

  public async changeLeader(
    employee: Employee,
    leader: Employee,
    tx?: Prisma.TransactionClient,
  ) {
    const employeeNode =
      await this._employeeHierarchyNodesService.findNodeByEmployee({
        employeeId: employee.id,
        type: EmployeeHierarchyNodeType.LEADER,
        organizationId: employee.organizationId,
      });

    const leaderNode =
      await this._employeeHierarchyNodesService.findNodeByEmployee({
        employeeId: leader.id,
        type: EmployeeHierarchyNodeType.LEADER,
        organizationId: employee.organizationId,
      });

    employee.changeLeader(leader);

    await this._employeeHierarchyNodesService.moveUnderParent(
      employeeNode,
      leaderNode,
      tx,
    );

    await this._employeeRepository.save(employee, tx);
  }

  public async changePeoplePartner(
    employee: Employee,
    peoplePartner: Employee,
    tx?: Prisma.TransactionClient,
  ) {
    const employeeNode =
      await this._employeeHierarchyNodesService.findNodeByEmployee(
        {
          employeeId: employee.id,
          type: EmployeeHierarchyNodeType.PEOPLE_PARTNER,
          organizationId: employee.organizationId,
        },
        tx,
      );

    const peoplePartnerNode =
      await this._employeeHierarchyNodesService.findNodeByEmployee({
        employeeId: peoplePartner.id,
        type: EmployeeHierarchyNodeType.PEOPLE_PARTNER,
        organizationId: employee.organizationId,
      });

    employee.changePeoplePartner(peoplePartner);

    await this._employeeHierarchyNodesService.moveUnderParent(
      employeeNode,
      peoplePartnerNode,
      tx,
    );

    await this._employeeRepository.save(employee, tx);
  }

  private async _validateEmployeeCreation(
    input: CreateEmployeeProps,
    tx?: Prisma.TransactionClient,
  ) {
    const isEmailAlreadyTaken = await this._employeeRepository.findByEmail(
      input.email,
      tx,
    );

    if (isEmailAlreadyTaken) {
      throw new EmployeeEmailAlreadyExistsException();
    }

    if (input.currentLeaderId) {
      await this.findEmployeeByIdOrThrow(
        {
          id: input.currentLeaderId,
          organizationId: input.organizationId,
        },
        tx,
      );
    }

    if (input.currentPeoplePartnerId) {
      await this.findEmployeeByIdOrThrow(
        {
          id: input.currentPeoplePartnerId,
          organizationId: input.organizationId,
        },
        tx,
      );
    }
  }

  private async _createEmployeeUser(
    input: CreateEmployeeProps,
    tx?: Prisma.TransactionClient,
  ): Promise<User> {
    return await this._usersService.create(
      {
        email: input.email,
        status: UserStatus.ACTIVE,
        organizationId: input.organizationId,
        authType: UserAuthType.EMPLOYEE,
      },
      tx,
    );
  }

  private async _rollbackUserCreation(
    user: User,
    tx?: Prisma.TransactionClient,
  ) {
    await this._usersService.delete({
      id: user.id,
      organizationId: user.organizationId,
    });
  }
}
