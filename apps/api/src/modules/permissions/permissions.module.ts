import { Module } from "@nestjs/common";
import { PermissionsController } from "@app/modules/permissions/controllers/permissions.controller";
import { PermissionsService } from "@app/modules/permissions/services/permissions.service";
import { PermissionRepository } from "@app/modules/permissions/repositories/permission.repository";
import { PermissionMapper } from "@app/modules/permissions/mappers/permission.mapper";
import { ListPermissionsQuery } from "@app/modules/permissions/queries/list-permissions.query";
import { PermissionScopeMapper } from "@app/modules/permissions/mappers/permission-scope.mapper";

@Module({
  imports: [],
  providers: [
    PermissionsService,
    PermissionRepository,
    PermissionMapper,
    PermissionScopeMapper,
    ListPermissionsQuery,
  ],
  controllers: [PermissionsController],
  exports: [PermissionsService, PermissionRepository, PermissionMapper],
})
export class PermissionsModule {}
