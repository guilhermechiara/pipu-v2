import { Injectable } from "@nestjs/common";
import { Employee } from "@app/modules/employees/entities/employee";
import { EmployeeMapper } from "../mappers/employee.mapper";
import { PrismaService } from "@app/infrastructure/database/prisma.service";
import { Prisma } from "@prisma/client";
import { FindByIdWithOrganizationId } from "@app/common/types/repository.types";

@Injectable()
export class EmployeeRepository {
  constructor(
    private readonly _prismaService: PrismaService,
    private readonly _employeeMapper: EmployeeMapper,
  ) {}

  public async save(
    model: Employee,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const client = this._prismaService.getClient(tx);

    await client.employee.upsert({
      where: {
        id: model.id,
      },
      update: this._employeeMapper.toDatabase(model),
      create: this._employeeMapper.toDatabase(model),
    });
  }

  public async findByEmail(
    email: string,
    tx?: Prisma.TransactionClient,
  ): Promise<Employee> {
    const client = this._prismaService.getClient(tx);
    const employee = await client.employee.findFirst({
      where: {
        email,
      },
    });

    return employee ? this._employeeMapper.toModel(employee) : null;
  }

  public async findById(
    input: FindByIdWithOrganizationId,
    tx?: Prisma.TransactionClient,
  ): Promise<Employee> {
    const client = this._prismaService.getClient(tx);
    const employee = await client.employee.findUnique({
      where: {
        id: input.id,
        organizationId: input.organizationId,
      },
    });

    return employee ? this._employeeMapper.toModel(employee) : null;
  }

  public async delete(
    input: FindByIdWithOrganizationId,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const client = this._prismaService.getClient(tx);
    await this._prismaService.employee.delete({
      where: {
        id: input.id,
        organizationId: input.organizationId,
      },
    });
  }
}
