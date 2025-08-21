import { Injectable } from "@nestjs/common";
import { PrismaService } from "@app/infrastructure/database/prisma.service";
import { OrganizationMapper } from "@app/modules/organizations/mappers/organization.mapper";
import { Organization } from "@app/modules/organizations/entities/organization";

@Injectable()
export class OrganizationRepository {
  constructor(
    private readonly _prismaService: PrismaService,
    private readonly _organizationMapper: OrganizationMapper,
  ) {}

  async save(input: Organization): Promise<void> {
    await this._prismaService.organization.upsert({
      where: {
        id: input.id,
      },
      update: this._organizationMapper.toDatabase(input),
      create: this._organizationMapper.toDatabase(input),
    });
  }

  async delete(id: string): Promise<void> {
    await this._prismaService.organization.delete({
      where: {
        id,
      },
    });
  }

  async findByDocument(document: string): Promise<Organization | null> {
    const organization = await this._prismaService.organization.findUnique({
      where: {
        document,
      },
    });

    return organization ? this._organizationMapper.toModel(organization) : null;
  }

  async list(): Promise<Organization[]> {
    const organizations = await this._prismaService.organization.findMany();

    return organizations.map((organization) =>
      this._organizationMapper.toModel(organization),
    );
  }
}
