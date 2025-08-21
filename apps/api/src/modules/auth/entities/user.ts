import { BaseProps } from "@app/common/domain/entity";
import {
  AggregateRoot,
  ConstructorAggregateProps,
  CreateAggregateProps,
} from "@app/common/domain/aggregate-root";
import { UserStatus } from "@app/modules/auth/enums/user-status";

export type UserProps = BaseProps & {
  organizationId: string;
  externalId?: string;
  email: string;
  status: UserStatus;
};

export type CreateUserProps = CreateAggregateProps<UserProps>;

export class User extends AggregateRoot<UserProps> {
  private constructor(props: ConstructorAggregateProps<UserProps>) {
    super(props);
  }

  get organizationId() {
    return this.props.organizationId;
  }

  get externalId() {
    return this.props.externalId;
  }

  get email() {
    return this.props.email;
  }

  get status() {
    return this.props.status;
  }

  static create(props: CreateUserProps) {
    return new User(props);
  }

  static from(props: UserProps) {
    return new User(props);
  }

  public assignExternalId(externalId: string) {
    this.props.externalId = externalId;
    this.touch();
  }

  public isActive(): boolean {
    return this.props.status === UserStatus.ACTIVE;
  }
}
