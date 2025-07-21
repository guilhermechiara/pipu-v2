import { Competence } from "../../competences/types/competence";
import { PaginatedResponse } from "../../../types/pagination";

export type Role = {
  id: string;
  name: string;
  description: string;
};

export type FindRoleByIdRequest = {
  id: string;
};

export type FindRoleByIdResponse = Role & {
  competences: Competence[];
};

export type PaginatedRolesResponse = PaginatedResponse<Role>;
