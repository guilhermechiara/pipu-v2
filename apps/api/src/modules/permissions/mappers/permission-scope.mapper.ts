import { Mapper } from "@app/common/mappers/mapper";
import { PermissionScope } from "@app/modules/permissions/entities/permission-scope";
import { PermissionScope as PrismaPermissionScope } from "@prisma/client";
import { PermissionScopeResponse } from "@pipu/api";
import { ScopeAction } from "@app/modules/permissions/enums/scope-action";
import { ScopeSubject } from "@app/modules/permissions/enums/scope-subject";
import { ScopeType } from "@app/modules/permissions/enums/scope-type";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PermissionScopeMapper
  implements
    Mapper<PermissionScope, PrismaPermissionScope, PermissionScopeResponse>
{
  toModel(item: PrismaPermissionScope): PermissionScope {
    return PermissionScope.from({
      id: item.id,
      action: item.action as ScopeAction,
      subject: item.subject as ScopeSubject,
      type: item.type as ScopeType,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    });
  }

  toDatabase(item: PermissionScope): PrismaPermissionScope {
    return {
      id: item.id,
      action: item.action,
      subject: item.subject,
      type: item.type,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }

  toResponse(item: PermissionScope): PermissionScopeResponse {
    return item.toJSON();
  }
}
