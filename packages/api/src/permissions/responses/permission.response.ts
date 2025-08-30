export class PermissionResponse {
  id: string;
  organizationId?: string;
  name: string;
  description: string;
  scopeIds: string[];
  createdAt: Date;
  updatedAt: Date;
}
