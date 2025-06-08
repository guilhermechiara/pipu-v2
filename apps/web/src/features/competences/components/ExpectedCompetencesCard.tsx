import { Competence } from "../types/competence";
import {
  OutlineCard,
  OutlineCardContent,
  OutlineCardHeader,
} from "@pipu/ui/components";
import { Rocket } from "lucide-react";

interface ExpectedEmployeeCompetencesViewProps {
  competences: Competence[];
}

interface GroupedCompetences {
  [categoryName: string]: Competence[];
}

const groupCompetencesByCategory = (
  competences: Competence[],
): GroupedCompetences => {
  return competences.reduce((groups, competence) => {
    const categoryName = competence.category.name;

    if (!groups[categoryName]) {
      groups[categoryName] = [];
    }

    groups[categoryName].push(competence);
    return groups;
  }, {} as GroupedCompetences);
};

const ExpectedCompetencesCard = ({
  competences,
}: ExpectedEmployeeCompetencesViewProps) => {
  const groupedCompetences = groupCompetencesByCategory(competences);

  return (
    <OutlineCard type="danger">
      <OutlineCardHeader className="flex flex-row">
        <Rocket className="mr-4" /> Competências esperadas
      </OutlineCardHeader>
      <OutlineCardContent>
        {Object.entries(groupedCompetences).map(
          ([categoryName, competences]) => (
            <div
              key={categoryName}
              className="grid grid-cols-6 not-last-of-type:border-b-2 border-b-destructive py-8"
            >
              <p className="col-span-1">{categoryName}</p>
              <ul className="col-span-5 list-disc">
                {competences.map((competence) => (
                  <li key={competence.id}>{competence.name}</li>
                ))}
              </ul>
            </div>
          ),
        )}
      </OutlineCardContent>
    </OutlineCard>
  );
};

export { ExpectedCompetencesCard };
