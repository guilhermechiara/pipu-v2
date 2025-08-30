import { BaseProps } from "@app/common/domain/entity";
import {
  AggregateRoot,
  ConstructorAggregateProps,
  CreateAggregateProps,
} from "@app/common/domain/aggregate-root";

export type PermissionProps = BaseProps & {
  name: string;
  description: string;
  organizationId?: string;
  scopeIds: string[];
};

export type CreatePermissionProps = CreateAggregateProps<PermissionProps>;

export class Permission extends AggregateRoot<PermissionProps> {
  private constructor(props: ConstructorAggregateProps<PermissionProps>) {
    super(props);
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get scopeIds() {
    return this.props.scopeIds;
  }

  get organizationId() {
    return this.props.organizationId;
  }

  static create(props: CreatePermissionProps) {
    return new Permission(props);
  }

  static from(props: PermissionProps) {
    return new Permission(props);
  }

  public isCustom() {
    return this.props.organizationId !== null;
  }
}
