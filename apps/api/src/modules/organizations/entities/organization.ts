import {
  AggregateRoot,
  CreateAggregateProps,
} from "@app/common/domain/aggregate-root";
import { BaseProps } from "@app/common/domain/entity";
import { OrganizationStatus } from "@app/modules/organizations/enums/organization-status";
import { OrganizationDocumentType } from "@app/modules/organizations/enums/organization-document-type";

export type OrganizationProps = BaseProps & {
  tradingName: string;
  legalName: string;
  slug: string;
  status: OrganizationStatus;
  document: string;
  documentType: OrganizationDocumentType;
  financialContact: string;
  externalId?: string;
};

export type CreateOrganizationProps = CreateAggregateProps<OrganizationProps>;

export class Organization extends AggregateRoot<OrganizationProps> {
  private constructor(props: CreateOrganizationProps) {
    super(props);
  }

  get legalName(): string {
    return this.props.legalName;
  }

  get tradingName(): string {
    return this.props.tradingName;
  }

  get slug(): string {
    return this.props.slug;
  }

  get status(): OrganizationStatus {
    return this.props.status;
  }

  get document(): string {
    return this.props.document;
  }

  get documentType(): OrganizationDocumentType {
    return this.props.documentType;
  }

  get financialContact(): string {
    return this.props.financialContact;
  }

  get externalId(): string {
    return this.props.externalId;
  }

  static create(props: CreateOrganizationProps) {
    return new Organization(props);
  }

  static from(props: OrganizationProps) {
    return new Organization(props);
  }

  public assignExternalId(externalId: string) {
    this.props.externalId = externalId;
    this.touch();
  }
}
