"use client";

import Calendar from "../../../../../public/images/calendar.gif";
import { StepProps } from "./ScheduleCycleFormSteps";
import { Title } from "@pipu/ui/components";
import dayjs from "dayjs";
import { CycleDatesFormField } from "../fields/CycleDatesFormField";
import { CycleFormStepHeader } from "../CycleFormStepHeader";

const ScheduleCycleFormStepDates = ({ form }: StepProps) => {
  const minDatePicker = dayjs().toDate();
  const maxDatePicker = dayjs().add(1, "year").toDate();

  return (
    <>
      <CycleFormStepHeader
        image={Calendar.src}
        title={
          <Title as="h3">
            Selecione as datas do ciclo: {form.getValues("cycleName")}
          </Title>
        }
      />

      <div className="grid grid-cols-2 gap-8">
        <CycleDatesFormField.StartDate
          minDatePicker={minDatePicker}
          maxDatePicker={maxDatePicker}
          control={form.control}
        />

        <CycleDatesFormField.EndDate
          minDatePicker={minDatePicker}
          maxDatePicker={maxDatePicker}
          control={form.control}
        />

        <CycleDatesFormField.AdjustmentStartDate
          minDatePicker={minDatePicker}
          maxDatePicker={maxDatePicker}
          control={form.control}
        />

        <CycleDatesFormField.AdjustmentEndDate
          minDatePicker={minDatePicker}
          maxDatePicker={maxDatePicker}
          control={form.control}
        />

        <CycleDatesFormField.ShareStartDate
          minDatePicker={minDatePicker}
          maxDatePicker={maxDatePicker}
          control={form.control}
        />

        <CycleDatesFormField.ShareEndDate
          minDatePicker={minDatePicker}
          maxDatePicker={maxDatePicker}
          control={form.control}
        />
      </div>
    </>
  );
};

export { ScheduleCycleFormStepDates };
