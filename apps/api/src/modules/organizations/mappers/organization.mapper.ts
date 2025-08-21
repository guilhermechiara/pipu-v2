import { Injectable } from "@nestjs/common";
import { Mapper } from "@app/common/mappers/mapper";
import { Organization as PrismaOrganization } from "@prisma/client";
import { Organization } from "@app/modules/organizations/entities/organization";
import { OrganizationStatus } from "@app/modules/organizations/enums/organization-status";
import { OrganizationResponse } from "@pipu/api";
import { OrganizationDocumentType } from "@app/modules/organizations/enums/organization-document-type";

@Injectable()
export class OrganizationMapper
  implements Mapper<Organization, PrismaOrganization, OrganizationResponse>
{
  constructor() {}

  toDatabase(item: Organization): PrismaOrganization {
    return {
      id: item.id,
      legalName: item.legalName,
      tradingName: item.tradingName,
      slug: item.slug,
      status: item.status,
      document: item.document,
      documentType: item.documentType,
      financialContact: item.financialContact,
      externalId: item.externalId,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }

  toModel(item: PrismaOrganization): Organization {
    return Organization.from({
      id: item.id,
      legalName: item.legalName,
      tradingName: item.tradingName,
      slug: item.slug,
      status: item.status as OrganizationStatus,
      document: item.document,
      documentType: item.documentType as OrganizationDocumentType,
      financialContact: item.financialContact,
      externalId: item.externalId,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    });
  }

  toResponse(item: Organization): OrganizationResponse {
    return item.toJSON();
  }
}
