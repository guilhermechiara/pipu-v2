import { Mapper } from "@app/common/mappers/mapper";
import { EmployeeHierarchyNode } from "@app/modules/employees/entities/employee-hierarchy-node";
import { EmployeeHierarchyNode as PrismaEmployeeHierarchyNode } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { EmployeeHierarchyNodeType } from "@app/modules/employees/enums/employee-hierarchy-node-type";

@Injectable()
export class EmployeeHierarchyNodeMapper
  implements Mapper<EmployeeHierarchyNode, PrismaEmployeeHierarchyNode, void>
{
  toModel(item: PrismaEmployeeHierarchyNode): EmployeeHierarchyNode {
    return EmployeeHierarchyNode.from({
      id: item.id,
      path: item.path,
      employeeId: item.employeeId,
      type: item.type as EmployeeHierarchyNodeType,
      organizationId: item.organizationId,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    });
  }

  toDatabase(item: EmployeeHierarchyNode): PrismaEmployeeHierarchyNode {
    return {
      id: item.id,
      path: item.path,
      employeeId: item.employeeId,
      type: item.type,
      organizationId: item.organizationId,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }

  toResponse(item: EmployeeHierarchyNode): void {}
}
