import {
  AggregateRoot,
  ConstructorAggregateProps,
  CreateAggregateProps,
} from "@app/common/domain/aggregate-root";
import { BaseProps } from "@app/common/domain/entity";
import { EmployeeStatus } from "@app/modules/employees/enums/employee-status";
import { EmployeeNotActiveException } from "@app/modules/employees/exceptions/employee-not-active.exception";
import { EmployeeCannotBeAManagerOfItselfException } from "@app/modules/employees/exceptions/employee-cannot-be-leader.exception";

export type EmployeeProps = BaseProps & {
  fullName: string;
  email: string;
  organizationId: string;
  userId?: string;
  status: string;
  currentLeaderId?: string;
  currentPeoplePartnerId?: string;
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

  get currentLeaderId() {
    return this.props.currentLeaderId;
  }

  get currentPeoplePartnerId() {
    return this.props.currentPeoplePartnerId;
  }

  static create(props: CreateEmployeeProps) {
    return new Employee({ ...props, status: "ACTIVE" });
  }

  static from(props: EmployeeProps) {
    return new Employee(props);
  }

  public isActive() {
    return this.props.status === EmployeeStatus.ACTIVE;
  }

  public assertCanChangeLeaderOrPeoplePartner(employee: Employee) {
    if (!this.isActive()) {
      throw new EmployeeNotActiveException(this.id);
    }

    if (!employee.isActive()) {
      throw new EmployeeNotActiveException(employee.id);
    }

    if (this.id === employee.id) {
      throw new EmployeeCannotBeAManagerOfItselfException();
    }
  }

  public changeLeader(leader: Employee) {
    this.assertCanChangeLeaderOrPeoplePartner(leader);
    this.props.currentLeaderId = leader.id;
    this.touch();
  }

  public changePeoplePartner(peoplePartner: Employee) {
    this.assertCanChangeLeaderOrPeoplePartner(peoplePartner);
    this.props.currentPeoplePartnerId = peoplePartner.id;
    this.touch();
  }
}
