import { Button, Title } from "@pipu/ui/components";
import { Assessment } from "../../assessments/types/assessment";
import { AssessmentItem } from "../types/profileAssessment";

const CRITERIA_DESCRIPTIONS = {
  under: "abaixo do esperado",
  meet: "dentro do esperado",
  over: "acima do esperado",
} as const;

const CONTENT_TYPES = {
  highlight: {
    title: "Destaques",
    subtitle: "Maiores notas",
    borderColor: "border-success",
    textColor: "text-success",
  },
  improvement: {
    title: "Oportunidades",
    subtitle: "Menores notas",
    borderColor: "border-destructive",
    textColor: "text-destructive",
  },
} as const;

interface ProfileContentProps {
  assessment: Assessment;
}

interface ProfileContentSummaryProps {
  items: AssessmentItem[];
  type: keyof typeof CONTENT_TYPES;
}

const ProfileAssessmentCompleted = ({ assessment }: ProfileContentProps) => {
  const criteriaPhrase =
    CRITERIA_DESCRIPTIONS[
      assessment.criteria as keyof typeof CRITERIA_DESCRIPTIONS
    ];

  return (
    <div className="flex flex-col gap-16">
      <div>
        <Title as="h2">De acordo com sua última avaliação</Title>
        <Title as="h1" className="text-secondary">
          você está {criteriaPhrase}
        </Title>
      </div>
      <div className="flex flex-col gap-4">
        <Title as="h2">Versão resumida</Title>
        <div className="grid grid-cols-2 gap-4">
          <ProfileAssessmentSummary
            items={assessment.highlights}
            type="highlight"
          />
          <ProfileAssessmentSummary
            items={assessment.improvements}
            type="improvement"
          />
        </div>

        <Button className="mt-6 self-center h-12">
          Ver avaliação completa
        </Button>
      </div>
    </div>
  );
};

const ProfileAssessmentSummary = ({
  items,
  type,
}: ProfileContentSummaryProps) => {
  const { title, subtitle, borderColor, textColor } = CONTENT_TYPES[type];

  return (
    <div className={`flex flex-col rounded-xl border p-8 gap-8 ${borderColor}`}>
      <div>
        <Title as="h3" className={textColor}>
          {title}
        </Title>
        <Title as="h6">{subtitle}</Title>
      </div>
      <ul className="list-disc pl-4">
        {items.map((item, index) => (
          <li key={index}>
            <strong>{item.title}:</strong> {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export { ProfileAssessmentCompleted };
