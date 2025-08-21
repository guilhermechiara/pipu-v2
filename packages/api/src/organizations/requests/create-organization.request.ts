import { z } from "zod";

export const CreateOrganizationRequestSchema = z.object({
  legalName: z.string().min(1, "legal name is required"),
  tradingName: z.string().min(1, "trading name is required"),
  slug: z.string().min(1, "slug is required"),
  document: z.string().min(1, "document is required"),
  documentType: z.string().min(1, "document type is required"),
  financialContact: z.string().min(1, "financial contact is required"),
});

export type CreateOrganizationRequest = z.infer<
  typeof CreateOrganizationRequestSchema
>;
