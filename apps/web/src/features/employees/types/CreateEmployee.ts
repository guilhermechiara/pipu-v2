import { Employee } from "./Employee";

export type CreateEmployeeRequest = {
  name: string;
  email: string;
  initialSalary: number;
  roleId: string;
  chapterId: string;
  peoplePartnerId: string;
  leaderId: string;
};

export type CreateEmployeeResponse = Employee;
