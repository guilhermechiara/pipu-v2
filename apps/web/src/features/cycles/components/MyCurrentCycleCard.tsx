import {
  OutlineCard,
  OutlineCardContent,
  Tag,
  Title,
} from "@pipu/ui/components";
import * as React from "react";
import { cn } from "@pipu/ui/lib/utils";
import { useMyAssessmentCycles } from "../hooks/useMyAssessmentCycles";
import {
  AssessmentCycle,
  AssessmentCycleStatus,
} from "../types/assessmentCycle";

interface AssessmentDateCardProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "start" | "end";
}

const AssessmentDateCard = React.forwardRef<
  HTMLDivElement,
  AssessmentDateCardProps
>(({ className, children, type = "start", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        className,
        "flex flex-col w-fit shadow-[3px_6px_32px_0px_rgba(0,0,0,0.06)] rounded-md p-6 gap-2.5",
      )}
      {...props}
    >
      <p className="text-gray-400 font-bold text-xs">
        {type === "start" ? "início do ciclo" : "fim do ciclo"}
      </p>
      <Title as="h2">{children}</Title>
    </div>
  );
});

const MyCurrentCycleCard = () => {
  const { data: assessmentCycles } = useMyAssessmentCycles();

  const findCurrentOrUpcomingCycle = (cycles: AssessmentCycle[]) => {
    return cycles
      .filter(
        (cycle: AssessmentCycle) =>
          cycle.status === AssessmentCycleStatus.IN_PROGRESS ||
          cycle.status === AssessmentCycleStatus.UPCOMING,
      )
      .sort(
        (a, b) =>
          new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
      )
      .shift();
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR", {});
  };

  const currentCycle = findCurrentOrUpcomingCycle(assessmentCycles);
  const hasCycle = currentCycle;

  const TITLE = hasCycle ? "Avaliação em andamento" : "Sem avaliação";
  const NO_CYCLE_MESSAGE = (
    <>
      Aguarde o próximo ciclo para ter seus resultados aqui na{" "}
      <strong>pipu</strong>
    </>
  );

  return (
    <OutlineCard type="primary">
      <OutlineCardContent className="flex flex-col gap-8">
        <div className="flex flex-row gap-4">
          <Title as="h3">{TITLE}</Title>
          <Tag type="secondary">Novidade</Tag>
        </div>

        {hasCycle ? (
          <div className="flex flex-row gap-4">
            <AssessmentDateCard type="start">
              {formatDate(currentCycle.startsAt)}
            </AssessmentDateCard>
            <AssessmentDateCard type="end">
              {formatDate(currentCycle.endsAt)}
            </AssessmentDateCard>
          </div>
        ) : (
          <p>{NO_CYCLE_MESSAGE}</p>
        )}
      </OutlineCardContent>
    </OutlineCard>
  );
};

export { MyCurrentCycleCard };
