import { Role } from "../../roles/types/role";

export type EmployeeProfile = {
  name: string;
  fallback: string;
  image: string;
  role: Role;
};
