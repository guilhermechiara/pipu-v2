import { Injectable } from "@nestjs/common";
import { Employee } from "@app/modules/employees/entities/employee";
import { Employee as PrismaEmployee } from "@prisma/client";
import { Mapper } from "@app/common/mappers/mapper";
import { EmployeeStatus } from "@app/modules/employees/enums/employee-status";
import { EmployeeResponse } from "@pipu/api";

@Injectable()
export class EmployeeMapper extends Mapper<Employee, PrismaEmployee, any> {
  toModel(item: PrismaEmployee): Employee {
    return Employee.from({
      id: item.id,
      email: item.email,
      fullName: item.fullName,
      organizationId: item.organizationId,
      userId: item.userId,
      status: item.status,
      currentLeaderId: item.currentLeaderId,
      currentPeoplePartnerId: item.currentPeoplePartnerId,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    });
  }

  toDatabase(item: Employee): PrismaEmployee {
    return {
      id: item.id,
      fullName: item.fullName,
      email: item.email,
      organizationId: item.organizationId,
      userId: item.userId,
      status: item.status as EmployeeStatus,
      currentLeaderId: item.currentLeaderId,
      currentPeoplePartnerId: item.currentPeoplePartnerId,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }

  toResponse(item: Employee): EmployeeResponse {
    return item.toJSON();
  }
}
