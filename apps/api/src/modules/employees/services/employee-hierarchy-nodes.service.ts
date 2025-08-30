import { Injectable } from "@nestjs/common";
import {
  EmployeeHierarchyNodeRepository,
  FindNodeByEmployeeAndTypeInput,
} from "@app/modules/employees/repositories/employee-hierarchy-node.repository";
import { Employee } from "@app/modules/employees/entities/employee";
import { Prisma } from "@prisma/client";
import { EmployeeHierarchyNode } from "@app/modules/employees/entities/employee-hierarchy-node";
import { EmployeeHierarchyNodeType } from "@app/modules/employees/enums/employee-hierarchy-node-type";

@Injectable()
export class EmployeeHierarchyNodesService {
  constructor(
    private readonly _employeeHierarchyNodeRepository: EmployeeHierarchyNodeRepository,
  ) {}

  public async setupHierarchyNodes(
    employee: Employee,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    await this._createLeadershipNode(employee, tx);
    await this._createPeoplePartnerNode(employee, tx);
  }

  public async findNodeByEmployee(
    input: FindNodeByEmployeeAndTypeInput,
    tx?: Prisma.TransactionClient,
  ) {
    return this._employeeHierarchyNodeRepository.findNodeByEmployeeIdAndType(
      input,
      tx,
    );
  }

  public async moveUnderParent(
    node: EmployeeHierarchyNode,
    parentNode: EmployeeHierarchyNode,
    tx?: Prisma.TransactionClient,
  ) {
    node.moveUnderParent(parentNode);

    await this._employeeHierarchyNodeRepository.moveChildren(
      parentNode.path,
      node.path,
      tx,
    );
    await this._employeeHierarchyNodeRepository.save(node, tx);
  }

  private async _createLeadershipNode(
    employee: Employee,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const parentNode = employee.currentLeaderId
      ? await this._findNodeByEmployeeIdOrThrow(
          {
            employeeId: employee.currentLeaderId,
            organizationId: employee.organizationId,
            type: EmployeeHierarchyNodeType.LEADER,
          },
          tx,
        )
      : await this._findRootNodeOrThrow(
          employee.organizationId,
          EmployeeHierarchyNodeType.LEADER,
          tx,
        );

    const leadershipNode = this._buildHierarchyNode(
      employee,
      parentNode,
      EmployeeHierarchyNodeType.LEADER,
    );

    await this._employeeHierarchyNodeRepository.save(leadershipNode, tx);
  }

  private async _createPeoplePartnerNode(
    employee: Employee,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const parentNode = employee.currentPeoplePartnerId
      ? await this._findNodeByEmployeeIdOrThrow(
          {
            employeeId: employee.currentPeoplePartnerId,
            organizationId: employee.organizationId,
            type: EmployeeHierarchyNodeType.PEOPLE_PARTNER,
          },
          tx,
        )
      : await this._findRootNodeOrThrow(
          employee.organizationId,
          EmployeeHierarchyNodeType.PEOPLE_PARTNER,
          tx,
        );

    const ppNode = this._buildHierarchyNode(
      employee,
      parentNode,
      EmployeeHierarchyNodeType.PEOPLE_PARTNER,
    );

    await this._employeeHierarchyNodeRepository.save(ppNode, tx);
  }

  private _buildHierarchyNode(
    employee: Employee,
    parentNode: EmployeeHierarchyNode,
    type: EmployeeHierarchyNodeType,
  ): EmployeeHierarchyNode {
    return EmployeeHierarchyNode.create({
      employeeId: employee.id,
      path: `${parentNode.path}.${employee.id}`,
      organizationId: employee.organizationId,
      type,
    });
  }

  private async _findNodeByEmployeeIdOrThrow(
    input: FindNodeByEmployeeAndTypeInput,
    tx?: Prisma.TransactionClient,
  ): Promise<EmployeeHierarchyNode> {
    const node =
      await this._employeeHierarchyNodeRepository.findNodeByEmployeeIdAndType(
        input,
        tx,
      );

    if (!node) {
      throw new Error(
        `Employee hierarchy node not found for employee ID: ${input.employeeId}`,
      );
    }

    return node;
  }

  private async _findRootNodeOrThrow(
    organizationId: string,
    type: EmployeeHierarchyNodeType,
    tx?: Prisma.TransactionClient,
  ): Promise<EmployeeHierarchyNode> {
    const rootNode =
      await this._employeeHierarchyNodeRepository.findRootNodeByOrganizationAndType(
        {
          organizationId,
          type,
        },
        tx,
      );

    if (!rootNode) {
      throw new Error(
        `Root hierarchy node not found for organization: ${organizationId}`,
      );
    }

    return rootNode;
  }
}
