"use client";

import { NewAssessmentCycleFormStepHeader } from "./NewAssessmentCycleFormStepHeader";
import Calendar from "../../../../../../public/images/calendar.gif";
import { StepProps } from "./NewAssessmentCycleFormSteps";
import { Title } from "@pipu/ui/components";
import dayjs from "dayjs";
import { AssessmentCycleDatesFormField } from "../fields/AssessmentCycleDatesFormField";

const NewAssessmentCycleFormStepDates = ({ form }: StepProps) => {
  const minDatePicker = dayjs().toDate();
  const maxDatePicker = dayjs().add(1, "year").toDate();

  return (
    <>
      <NewAssessmentCycleFormStepHeader
        image={Calendar.src}
        title={
          <Title as="h3">
            Selecione as datas do ciclo: {form.getValues("cycleName")}
          </Title>
        }
      />

      <div className="grid grid-cols-2 gap-8">
        <AssessmentCycleDatesFormField.StartDate
          minDatePicker={minDatePicker}
          maxDatePicker={maxDatePicker}
          control={form.control}
        />

        <AssessmentCycleDatesFormField.EndDate
          minDatePicker={minDatePicker}
          maxDatePicker={maxDatePicker}
          control={form.control}
        />

        <AssessmentCycleDatesFormField.AdjustmentStartDate
          minDatePicker={minDatePicker}
          maxDatePicker={maxDatePicker}
          control={form.control}
        />

        <AssessmentCycleDatesFormField.AdjustmentEndDate
          minDatePicker={minDatePicker}
          maxDatePicker={maxDatePicker}
          control={form.control}
        />

        <AssessmentCycleDatesFormField.ShareStartDate
          minDatePicker={minDatePicker}
          maxDatePicker={maxDatePicker}
          control={form.control}
        />
        
        <AssessmentCycleDatesFormField.ShareEndDate
          minDatePicker={minDatePicker}
          maxDatePicker={maxDatePicker}
          control={form.control}
        />
      </div>
    </>
  );
};

export { NewAssessmentCycleFormStepDates };
