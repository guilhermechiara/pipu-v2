import { ICommand } from "@app/common/interfaces/command";
import { Injectable, Logger } from "@nestjs/common";
import {
  CreateOrganizationProps,
  Organization,
} from "@app/modules/organizations/entities/organization";
import { OrganizationStatus } from "@app/modules/organizations/enums/organization-status";
import { OrganizationRepository } from "@app/modules/organizations/repositories/organization.repository";
import { OrganizationAlreadyExistsException } from "@app/modules/organizations/exceptions/organization-already-exists.exception";
import { OrganizationResponse } from "@pipu/api";
import { OrganizationMapper } from "@app/modules/organizations/mappers/organization.mapper";
import { AuthService } from "@app/modules/auth/services/auth.service";

export type CreateOrganizationInput = Omit<
  CreateOrganizationProps,
  "status" | "externalId"
>;
export type CreateOrganizationOutput = OrganizationResponse;

@Injectable()
export class CreateOrganizationCommand
  implements ICommand<CreateOrganizationInput, CreateOrganizationOutput>
{
  private readonly _logger = new Logger(CreateOrganizationCommand.name);

  constructor(
    private readonly _organizationRepository: OrganizationRepository,
    private readonly _organizationMapper: OrganizationMapper,
    private readonly _authService: AuthService,
  ) {}

  async execute(
    input: CreateOrganizationInput,
  ): Promise<CreateOrganizationOutput> {
    const organizationExists =
      await this._organizationRepository.findByDocument(input.document);

    if (organizationExists) {
      throw new OrganizationAlreadyExistsException();
    }

    const organization = Organization.create({
      ...input,
      status: OrganizationStatus.ACTIVE,
    });

    try {
      const externalOrganization =
        await this._authService.createExternalOrganization({
          id: organization.id,
          name: organization.legalName,
        });

      organization.assignExternalId(externalOrganization.id);

      await this._organizationRepository.save(organization);
      return this._organizationMapper.toResponse(organization);
    } catch (error) {
      this._logger.error(`Failed to create organization`, error);

      this._logger.log(`Rolling back organization creation...`);

      await this._authService.deleteExternalOrganization(organization.id);
      await this._organizationRepository.delete(organization.id);

      this._logger.log(`Organization creation rolled back`);

      throw error;
    }
  }
}
