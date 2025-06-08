import { Competence } from "../../competences/types/competence";

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
