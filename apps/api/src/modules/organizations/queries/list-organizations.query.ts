import { IQuery } from "@app/common/interfaces/query";
import { OrganizationResponse } from "@pipu/api";
import { OrganizationRepository } from "@app/modules/organizations/repositories/organization.repository";
import { OrganizationMapper } from "@app/modules/organizations/mappers/organization.mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListOrganizationsQuery
  implements IQuery<void, OrganizationResponse[]>
{
  constructor(
    private readonly _organizationRepository: OrganizationRepository,
    private readonly _organizationMapper: OrganizationMapper,
  ) {}

  async execute(): Promise<OrganizationResponse[]> {
    const organizations = await this._organizationRepository.list();

    return organizations.map((organization) =>
      this._organizationMapper.toResponse(organization),
    );
  }
}
