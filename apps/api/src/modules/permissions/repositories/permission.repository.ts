import { Injectable } from "@nestjs/common";
import { PrismaService } from "@app/infrastructure/database/prisma.service";
import { PermissionMapper } from "@app/modules/permissions/mappers/permission.mapper";
import { Permission } from "@app/modules/permissions/entities/permission";

@Injectable()
export class PermissionRepository {
  constructor(
    private readonly _prismaService: PrismaService,
    private readonly _permissionMapper: PermissionMapper,
  ) {}

  async findAll(organizationId: string): Promise<Permission[]> {
    const permissions = await this._prismaService.permission.findMany({
      where: {
        OR: [
          {
            organizationId,
          },
          { organizationId: null },
        ],
      },
      include: {
        scopes: {
          select: { id: true },
        },
      },
    });

    return permissions.map((permission) =>
      this._permissionMapper.toModel(permission),
    );
  }
}
