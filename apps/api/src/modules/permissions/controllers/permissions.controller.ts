import { Controller, Get } from "@nestjs/common";
import { ListPermissionsQuery } from "@app/modules/permissions/queries/list-permissions.query";
import { PermissionResponse } from "@pipu/api";
import { CurrentUser } from "@app/modules/auth/decorators/current-user.decorator";
import { AuthenticatedUser } from "@app/modules/auth/types/authenticated-user";

@Controller("permissions")
export class PermissionsController {
  constructor(private readonly _listPermissionsQuery: ListPermissionsQuery) {}

  @Get()
  public list(
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<PermissionResponse[]> {
    return this._listPermissionsQuery.execute({ user });
  }
}
