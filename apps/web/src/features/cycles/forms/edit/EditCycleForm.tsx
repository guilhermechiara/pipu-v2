"use client";

import {
  DEFAULT_ASSESSMENT_CYCLE_MAX_DATES,
  DEFAULT_ASSESSMENT_CYCLE_MIN_DATES,
  ScheduleCycleFormValues,
  useScheduleCycleForm,
} from "../schedule/useScheduleCycleForm";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { CycleDatesFormField } from "../fields/CycleDatesFormField";
import { Form, OutlineButton, SubmitButton, Title } from "@pipu/ui/components";
import { TriangleAlert } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { CyclePhaseCard } from "../../components/CyclePhaseCard";
import { useEditAssessmentCycle } from "../../hooks/useEditAssessmentCycle";
import {
  SuccessDialog,
  SuccessDialogRef,
} from "../../../../components/layout/SuccessDialog";
import {
  ConfirmationDialog,
  ConfirmationDialogRef,
} from "../../../../components/layout/ConfirmationDialog";
import { useAssessmentCycle } from "../../hooks/useAssessmentCycle";
import dayjs from "dayjs";

interface EditAssessmentCycleFormProps {
  id: string;
}

interface PhaseProgressData {
  startDate: Date;
  endDate: Date;
}

const EditCycleForm = ({ id }: EditAssessmentCycleFormProps) => {
  const { data: cycle } = useAssessmentCycle(id);

  const { schema: editAssessmentCycleFormSchema } = useScheduleCycleForm();
  const form = useForm<ScheduleCycleFormValues>({
    resolver: standardSchemaResolver(editAssessmentCycleFormSchema),
    defaultValues: {
      cycleName: cycle.name,
      cycleFrequency: cycle.frequency as any,
      cycleDates: {
        startDate: dayjs(cycle.cycleDates.startDate).toDate(),
        endDate: dayjs(cycle.cycleDates.endDate).toDate(),
      },
      cycleAdjustmentDates: {
        startDate: dayjs(cycle.adjustmentDates.startDate).toDate(),
        endDate: dayjs(cycle.adjustmentDates.endDate).toDate(),
      },
      cycleShareDates: {
        startDate: dayjs(cycle.shareDates.startDate).toDate(),
        endDate: dayjs(cycle.shareDates.endDate).toDate(),
      },
      cycleOptionalMessage: "",
    },
  });

  const { isPending, isSuccess, isError, mutate } = useEditAssessmentCycle(id);
  const successDialogRef = useRef<SuccessDialogRef>(null);
  const stopCycleDialogRef = useRef<ConfirmationDialogRef>(null);

  const phases: Array<{
    id: string;
    data: PhaseProgressData;
    statistics: { completed: number; total: number };
    fields: {
      StartDateComponent: React.ElementType;
      EndDateComponent: React.ElementType;
    };
    warningPhaseName: "assessment" | "adjustment" | "share";
    showConnectingLine: boolean;
  }> = [
    {
      id: "cycleDates",
      data: cycle.cycleDates,
      statistics: cycle.statistics.assessment,
      fields: {
        StartDateComponent: CycleDatesFormField.StartDate,
        EndDateComponent: CycleDatesFormField.EndDate,
      },
      warningPhaseName: "assessment" as const,
      showConnectingLine: true,
    },
    {
      id: "adjustmentDates",
      data: cycle.adjustmentDates,
      statistics: cycle.statistics.adjustment,
      fields: {
        StartDateComponent: CycleDatesFormField.AdjustmentStartDate,
        EndDateComponent: CycleDatesFormField.AdjustmentEndDate,
      },
      warningPhaseName: "adjustment" as const,
      showConnectingLine: true,
    },
    {
      id: "shareDates",
      data: cycle.shareDates,
      statistics: cycle.statistics.share,
      fields: {
        StartDateComponent: CycleDatesFormField.ShareStartDate,
        EndDateComponent: CycleDatesFormField.ShareEndDate,
      },
      warningPhaseName: "share" as const,
      showConnectingLine: false,
    },
  ];

  function onSubmit(data: ScheduleCycleFormValues) {
    mutate({
      cycleDates: {
        startDate: data.cycleDates.startDate,
        endDate: data.cycleDates.endDate,
      },
      adjustmentDates: {
        startDate: data.cycleAdjustmentDates.startDate,
        endDate: data.cycleAdjustmentDates.endDate,
      },
      shareDates: {
        startDate: data.cycleShareDates.startDate,
        endDate: data.cycleShareDates.endDate,
      },
    });
  }

  function onStopCycle() {
    stopCycleDialogRef.current?.show(() => {
      console.log(`confirmed`);
    });
  }

  useEffect(() => {
    if (isSuccess) {
      successDialogRef.current?.show();
    }
  }, [isSuccess]);

  return (
    <>
      <div className="flex flex-col gap-12">
        <div className="flex flex-row justify-between items-center gap-4">
          <p className="text-2xl">
            <strong>Você tem o ciclo</strong> {cycle.name}{" "}
            <strong> em andamento </strong>
          </p>
          <OutlineButton variant="destructive" onClick={onStopCycle}>
            <TriangleAlert /> Interromper Cyclo
          </OutlineButton>
        </div>
        <div className="flex flex-col gap-4">
          <Title as="h3">Datas do ciclo</Title>
          <p className="font-light text-sm">As datas podem ser alteradas</p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-14"
          >
            {phases.map((phase) => (
              <CyclePhaseCard
                key={phase.id}
                startDate={phase.data.startDate}
                endDate={phase.data.endDate}
                totalProcessed={phase.statistics.completed}
                totalToProcess={phase.statistics.total}
                warningPhaseName={phase.warningPhaseName}
                control={form.control}
                minDatePicker={DEFAULT_ASSESSMENT_CYCLE_MIN_DATES}
                maxDatePicker={DEFAULT_ASSESSMENT_CYCLE_MAX_DATES}
                StartDateFieldComponent={phase.fields.StartDateComponent}
                EndDateFieldComponent={phase.fields.EndDateComponent}
                showConnectingLine={phase.showConnectingLine}
              />
            ))}

            <SubmitButton isPending={isPending}>Atualizar</SubmitButton>
          </form>
        </Form>
      </div>

      <SuccessDialog
        ref={successDialogRef}
        message="As datas do ciclo foram alteradas!"
        title="Ciclo atualizado com sucesso!"
      />

      <ConfirmationDialog
        confirmText="Interromper"
        cancelText="Cancelar"
        title="Você deseja interromper esse ciclo?"
        message="A liderança será notificada dessa mudança e não será possível avançar para as próximas etapas do ciclo"
        variant="destructive"
        ref={stopCycleDialogRef}
      />
    </>
  );
};

export { EditCycleForm };
