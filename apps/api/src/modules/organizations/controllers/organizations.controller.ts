import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateOrganizationCommand } from "@app/modules/organizations/commands/create-organization.command";
import {
  CreateOrganizationRequest,
  CreateOrganizationRequestSchema,
  OrganizationResponse,
} from "@pipu/api";
import { ZodValidationPipe } from "@app/common/pipes/zod-validation.pipe";
import { ListOrganizationsQuery } from "@app/modules/organizations/queries/list-organizations.query";
import { OrganizationDocumentType } from "@app/modules/organizations/enums/organization-document-type";

@Controller("organizations")
export class OrganizationsController {
  constructor(
    private readonly _createOrganizationCommand: CreateOrganizationCommand,
    private readonly _listOrganizationsQuery: ListOrganizationsQuery,
  ) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(CreateOrganizationRequestSchema))
    input: CreateOrganizationRequest,
  ): Promise<OrganizationResponse> {
    return this._createOrganizationCommand.execute({
      legalName: input.legalName,
      tradingName: input.tradingName,
      slug: input.slug,
      financialContact: input.slug,
      document: input.document,
      documentType: input.documentType as OrganizationDocumentType,
    });
  }

  @Get()
  async list(): Promise<OrganizationResponse[]> {
    return this._listOrganizationsQuery.execute();
  }
}
