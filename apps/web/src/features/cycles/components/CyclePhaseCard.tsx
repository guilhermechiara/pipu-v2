"use client";

import { Control } from "react-hook-form";
import { ScheduleCycleFormValues } from "../forms/schedule/useScheduleCycleForm";
import React from "react";
import dayjs from "dayjs";
import { Badge, OutlineCard, OutlineCardContent } from "@pipu/ui/components";
import { CycleRadialChart } from "./CycleRadialChart";
import { CycleConclusionWarning } from "./CycleConclusionWarning";
import { CircleCheckBig } from "lucide-react";

interface CyclePhaseCardProps {
  startDate: Date;
  endDate: Date;
  totalProcessed: number;
  totalToProcess: number;
  warningPhaseName: "assessment" | "adjustment" | "share";
  control: Control<ScheduleCycleFormValues>;
  minDatePicker: Date;
  maxDatePicker: Date;
  StartDateFieldComponent: React.ElementType;
  EndDateFieldComponent: React.ElementType;
  showConnectingLine: boolean;
}

const CyclePhaseCard: React.FC<CyclePhaseCardProps> = ({
  startDate,
  endDate,
  totalProcessed,
  totalToProcess,
  warningPhaseName,
  control,
  minDatePicker,
  maxDatePicker,
  StartDateFieldComponent,
  EndDateFieldComponent,
  showConnectingLine,
}) => {
  const shouldShowCart = dayjs(startDate).diff(dayjs(), "days") <= 0;
  const isFinished = dayjs().diff(endDate, "days") > 0;

  const cardBaseClassName = "border-2";
  const connectingLineClassName =
    "relative before:absolute before:content-[''] before:border-l-3 before:border-gray-300 before:h-15 before:left-1/16 before:top-full";

  const cardClassName = showConnectingLine
    ? `${cardBaseClassName} ${connectingLineClassName}`
    : cardBaseClassName;

  return (
    <OutlineCard type="cyan" className={cardClassName}>
      <OutlineCardContent className="flex flex-col gap-4">
        {isFinished && (
          <Badge className="flex flex-row gap-1 w-max" variant="cyan">
            <CircleCheckBig className="h-4" /> Etapa concluída
          </Badge>
        )}
        <div className="flex flex-row gap-8 justify-between items-center">
          {shouldShowCart && (
            <CycleRadialChart
              participants={totalProcessed}
              totalParticipants={totalToProcess}
            />
          )}
          <div className="grid grid-cols-2 gap-4 w-full">
            <StartDateFieldComponent
              minDatePicker={minDatePicker}
              maxDatePicker={maxDatePicker}
              control={control}
            />
            <EndDateFieldComponent
              minDatePicker={minDatePicker}
              maxDatePicker={maxDatePicker}
              control={control}
            />
          </div>
        </div>

        <CycleConclusionWarning phase={warningPhaseName} endDate={endDate} />
      </OutlineCardContent>
    </OutlineCard>
  );
};

export { CyclePhaseCard };
