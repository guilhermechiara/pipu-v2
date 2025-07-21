import { Badge } from "@pipu/ui/components";
import { CalendarFold } from "lucide-react";
import dayjs from "dayjs";

type CycleAssessmentConclusionWarningProps = {
  phase: "assessment" | "adjustment" | "share";
  endDate: Date;
};

const CycleConclusionWarning = ({
  phase,
  endDate,
}: CycleAssessmentConclusionWarningProps) => {
  const remainingDays = dayjs(endDate).diff(dayjs(), "days");
  const shouldShowWarning = remainingDays <= 5 && remainingDays >= 0;

  const phaseSpecificText = {
    assessment:
      "para a etapa de avaliação finalizar e não será possível responder novas avaliações.",
    adjustment:
      "para a etapa de ajuste finalizar e não será possível realizar novos ajustes.",
    share:
      "para a etapa de compartilhamento finalizar e não será possível compartilhar novos resultados.",
  }[phase];

  return (
    <>
      {shouldShowWarning ? (
        <Badge variant="warning" className="flex flex-row gap-1">
          <CalendarFold className="h-3.5" />
          {remainingDays >= 1 ? (
            <p>
              Faltam <strong>{remainingDays} dias</strong> {phaseSpecificText}
            </p>
          ) : (
            <p>
              Hoje é o <strong>último dia</strong> {phaseSpecificText}
            </p>
          )}
        </Badge>
      ) : null}
    </>
  );
};

export { CycleConclusionWarning };
