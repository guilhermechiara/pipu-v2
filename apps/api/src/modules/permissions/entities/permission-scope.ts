import { BaseProps } from "@app/common/domain/entity";
import {
  AggregateRoot,
  ConstructorAggregateProps,
  CreateAggregateProps,
} from "@app/common/domain/aggregate-root";
import { ScopeAction } from "@app/modules/permissions/enums/scope-action";
import { ScopeSubject } from "@app/modules/permissions/enums/scope-subject";
import { ScopeType } from "@app/modules/permissions/enums/scope-type";

export type PermissionScopeProps = BaseProps & {
  action: ScopeAction;
  subject: ScopeSubject;
  type: ScopeType;
};

export type CreatePermissionScopeProps =
  CreateAggregateProps<PermissionScopeProps>;

export class PermissionScope extends AggregateRoot<PermissionScopeProps> {
  private constructor(props: ConstructorAggregateProps<PermissionScopeProps>) {
    super(props);
  }

  get action() {
    return this.props.action;
  }

  get subject() {
    return this.props.subject;
  }

  get type() {
    return this.props.type;
  }

  static create(props: CreatePermissionScopeProps) {
    return new PermissionScope(props);
  }

  static from(props: PermissionScopeProps) {
    return new PermissionScope(props);
  }
}
