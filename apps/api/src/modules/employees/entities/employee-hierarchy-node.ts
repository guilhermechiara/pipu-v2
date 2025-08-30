import { BaseProps } from "@app/common/domain/entity";
import {
  AggregateRoot,
  ConstructorAggregateProps,
  CreateAggregateProps,
} from "@app/common/domain/aggregate-root";
import { EmployeeHierarchyNodeType } from "@app/modules/employees/enums/employee-hierarchy-node-type";

export type EmployeeHierarchyNodeProps = BaseProps & {
  organizationId: string;
  employeeId: string;
  path: string;
  type: EmployeeHierarchyNodeType;
};

export type CreateEmployeeHierarchyNodeProps =
  CreateAggregateProps<EmployeeHierarchyNodeProps>;

export class EmployeeHierarchyNode extends AggregateRoot<EmployeeHierarchyNodeProps> {
  private constructor(
    props: ConstructorAggregateProps<EmployeeHierarchyNodeProps>,
  ) {
    super(props);
  }

  get employeeId() {
    return this.props.employeeId;
  }

  get path() {
    return this.props.path;
  }

  get type() {
    return this.props.type;
  }

  get organizationId() {
    return this.props.organizationId;
  }

  static create(props: CreateEmployeeHierarchyNodeProps) {
    return new EmployeeHierarchyNode(props);
  }

  static from(props: EmployeeHierarchyNodeProps) {
    return new EmployeeHierarchyNode(props);
  }

  public moveUnderParent(parentNode: EmployeeHierarchyNode) {
    this.props.path = `${parentNode.path}.${this.employeeId}`;
    this.touch();
  }
}
