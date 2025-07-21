import { PaginatedResponse } from "../../../types/pagination";

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: {
    id: string;
    name: string;
  };
  chapter: string;
  status: "active" | "inactive";
  leadership: {
    id: string;
    name: string;
  };
  peoplePartner: {
    id: string;
    name: string;
  };
}

export type EmployeePaginatedResponse = PaginatedResponse<Employee>;
