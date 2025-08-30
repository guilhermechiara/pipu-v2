import { Mapper } from "@app/common/mappers/mapper";
import { Permission } from "@app/modules/permissions/entities/permission";
import { Permission as PrismaPermission } from "@prisma/client";
import { PermissionResponse } from "@pipu/api";
import { Injectable } from "@nestjs/common";
import { PermissionScopeMapper } from "@app/modules/permissions/mappers/permission-scope.mapper";

export type PrismaPermissionWithScopeIds = PrismaPermission & {
  scopes: { id: string }[];
};

@Injectable()
export class PermissionMapper
  implements
    Mapper<Permission, PrismaPermissionWithScopeIds, PermissionResponse>
{
  constructor(private readonly _permissionScopeMapper: PermissionScopeMapper) {}

  toModel(item: PrismaPermissionWithScopeIds): Permission {
    return Permission.from({
      id: item.id,
      name: item.name,
      description: item.description,
      scopeIds: item.scopes.map((scope) => scope.id),
      organizationId: item.organizationId,
      updatedAt: item.updatedAt,
      createdAt: item.createdAt,
    });
  }

  toDatabase(item: Permission): PrismaPermissionWithScopeIds {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      scopes: item.scopeIds.map((scope) => ({ id: scope })),
      organizationId: item.organizationId,
      updatedAt: item.updatedAt,
      createdAt: item.createdAt,
    };
  }

  toResponse(item: Permission): PermissionResponse {
    return item.toJSON();
  }
}
