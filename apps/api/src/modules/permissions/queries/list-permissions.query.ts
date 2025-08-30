import { IQuery } from "@app/common/interfaces/query";
import { PermissionResponse } from "@pipu/api";
import { AuthenticatedUser } from "@app/modules/auth/types/authenticated-user";
import { Injectable } from "@nestjs/common";
import { PermissionRepository } from "@app/modules/permissions/repositories/permission.repository";
import { PermissionMapper } from "@app/modules/permissions/mappers/permission.mapper";

export type ListPermissionsQueryInput = {
  user: AuthenticatedUser;
};

export type ListPermissionsQueryResponse = PermissionResponse[];

@Injectable()
export class ListPermissionsQuery
  implements IQuery<ListPermissionsQueryInput, ListPermissionsQueryResponse>
{
  constructor(
    private readonly _permissionRepository: PermissionRepository,
    private readonly _permissionMapper: PermissionMapper,
  ) {}

  async execute(
    input: ListPermissionsQueryInput,
  ): Promise<ListPermissionsQueryResponse> {
    const permissions = await this._permissionRepository.findAll(
      input.user.organizationId,
    );

    return permissions.map((permission) =>
      this._permissionMapper.toResponse(permission),
    );
  }
}
