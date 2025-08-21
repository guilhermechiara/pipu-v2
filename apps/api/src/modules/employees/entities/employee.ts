import {
  AggregateRoot,
  ConstructorAggregateProps,
  CreateAggregateProps,
} from "@app/common/domain/aggregate-root";
import { BaseProps } from "@app/common/domain/entity";

export type EmployeeProps = BaseProps & {
  fullName: string;
  email: string;
  organizationId: string;
  userId?: string;
  status: string;
};

export type CreateEmployeeProps = CreateAggregateProps<EmployeeProps>;

export class Employee extends AggregateRoot<EmployeeProps> {
  private constructor(props: ConstructorAggregateProps<EmployeeProps>) {
    super(props);
  }

  get id() {
    return this.props.id;
  }

  get fullName() {
    return this.props.fullName;
  }

  get email() {
    return this.props.email;
  }

  get organizationId() {
    return this.props.organizationId;
  }

  get userId() {
    return this.props.userId;
  }

  get status() {
    return this.props.status;
  }

  static create(props: CreateEmployeeProps) {
    return new Employee({ ...props, status: "ACTIVE" });
  }

  static from(props: EmployeeProps) {
    return new Employee(props);
  }
}
