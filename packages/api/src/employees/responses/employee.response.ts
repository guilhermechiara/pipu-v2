export interface EmployeeResponse {
  id: string;
  fullName: string;
  email: string;
  organizationId: string;
  userId?: string;
  currentLeaderId?: string;
  currentPeoplePartnerId?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
