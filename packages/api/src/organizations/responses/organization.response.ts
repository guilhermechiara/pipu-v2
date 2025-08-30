export interface OrganizationResponse {
  id: string;
  tradingName: string;
  legalName: string;
  slug: string;
  status: string;
  document: string;
  documentType: string;
  financialContact: string;
  createdAt: Date;
  updatedAt: Date;
}
