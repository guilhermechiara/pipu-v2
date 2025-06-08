import { CompetenceCategory } from "./competence-category";

export interface Competence {
  id: string;
  name: string;
  category: CompetenceCategory;
}
