export interface UserResponse {
  id: string;
  email: string;
  externalId?: string;
  status: string;
  organizationId: string;
  updatedAt: Date;
  createdAt: Date;
}
