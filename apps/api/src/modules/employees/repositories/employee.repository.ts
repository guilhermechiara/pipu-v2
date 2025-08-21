import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../infrastructure/database/prisma.service";
import { Employee } from "@app/modules/employees/entities/employee";
import { EmployeeMapper } from "../mappers/employee.mapper";

@Injectable()
export class EmployeeRepository {
  constructor(
    private readonly _prismaService: PrismaService,
    private readonly _employeeMapper: EmployeeMapper,
  ) {}

  public async save(model: Employee): Promise<void> {
    await this._prismaService.employee.upsert({
      where: {
        id: model.id,
      },
      update: this._employeeMapper.toDatabase(model),
      create: this._employeeMapper.toDatabase(model),
    });
  }

  public async findByEmail(email: string): Promise<Employee> {
    const employee = await this._prismaService.employee.findFirst({
      where: {
        email,
      },
    });

    return employee ? this._employeeMapper.toModel(employee) : null;
  }
}
