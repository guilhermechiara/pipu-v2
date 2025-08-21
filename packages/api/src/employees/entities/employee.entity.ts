export interface EmployeeResponse {
  id: string;
  fullName: string;
  email: string;
  organizationId: string;
  userId?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
