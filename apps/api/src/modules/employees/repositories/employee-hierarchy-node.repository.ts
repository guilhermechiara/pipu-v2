import { Injectable } from "@nestjs/common";
import { PrismaService } from "@app/infrastructure/database/prisma.service";
import { EmployeeHierarchyNodeMapper } from "@app/modules/employees/mappers/employee-hierarchy-node.mapper";
import { EmployeeHierarchyNode } from "@app/modules/employees/entities/employee-hierarchy-node";
import {
  EmployeeHierarchyNode as PrismaEmployeeHierarchyNode,
  Prisma,
} from "@prisma/client";
import { EmployeeHierarchyNodeType } from "@app/modules/employees/enums/employee-hierarchy-node-type";
import { findRootNodeByOrganization } from "@prisma/client/sql";

export type FindNodeByEmployeeInput = {
  employeeId: string;
  organizationId: string;
};

export type FindNodeByEmployeeAndTypeInput = FindNodeByEmployeeInput & {
  type: EmployeeHierarchyNodeType;
};

export type FindRootNodeByOrganizationAndTypeInput = {
  organizationId: string;
  type: EmployeeHierarchyNodeType;
};

@Injectable()
export class EmployeeHierarchyNodeRepository {
  constructor(
    private readonly _prismaService: PrismaService,
    private readonly _employeeHierarchyNodeMapper: EmployeeHierarchyNodeMapper,
  ) {}

  async save(
    item: EmployeeHierarchyNode,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const client = this._prismaService.getClient(tx);

    await client.employeeHierarchyNode.upsert({
      where: {
        id: item.id,
      },
      update: this._employeeHierarchyNodeMapper.toDatabase(item),
      create: this._employeeHierarchyNodeMapper.toDatabase(item),
    });
  }

  async findNodeByEmployeeIdAndType(
    input: FindNodeByEmployeeAndTypeInput,
    tx?: Prisma.TransactionClient,
  ): Promise<EmployeeHierarchyNode> {
    const client = this._prismaService.getClient(tx);

    const node = await client.employeeHierarchyNode.findFirst({
      where: {
        employeeId: input.employeeId,
        organizationId: input.organizationId,
        type: input.type,
      },
    });

    return node ? this._employeeHierarchyNodeMapper.toModel(node) : null;
  }

  async findAllNodesByEmployee(
    input: FindNodeByEmployeeInput,
    tx?: Prisma.TransactionClient,
  ): Promise<EmployeeHierarchyNode[]> {
    const client = this._prismaService.getClient(tx);
    const node = await client.employeeHierarchyNode.findMany({
      where: {
        employeeId: input.employeeId,
        organizationId: input.organizationId,
      },
    });

    return node.map((item) => this._employeeHierarchyNodeMapper.toModel(item));
  }

  async findRootNodeByOrganizationAndType(
    input: FindRootNodeByOrganizationAndTypeInput,
    tx?: Prisma.TransactionClient,
  ): Promise<EmployeeHierarchyNode> {
    const client = this._prismaService.getClient(tx);
    const node = await client.$queryRawTyped<PrismaEmployeeHierarchyNode>(
      findRootNodeByOrganization(input.organizationId, input.type),
    );

    return node ? this._employeeHierarchyNodeMapper.toModel(node[0]) : null;
  }

  async moveChildren(
    newParent: string,
    oldParent: string,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const client = this._prismaService.getClient(tx);

    await client.$executeRaw`
        UPDATE 
          employee_hierarchy_nodes 
        SET path = (${newParent} || subpath(path::ltree, nlevel(${oldParent}::ltree))) 
        WHERE 
          path::ltree <@ ${oldParent}::ltree;`;
  }
}
