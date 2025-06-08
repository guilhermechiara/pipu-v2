"use client";

import { FormStep, FormWithSteps } from "@pipu/ui/components";
import { NewAssessmentCycleFormSteps } from "./steps/NewAssessmentCycleFormSteps";
import { z } from "zod/v4";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { useAssessmentCycleForm } from "../../hooks/useAssessmentCycleForm";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";

const NewAssessmentCycleForm = () => {
  type NewAssessmentCycleFormValues = z.infer<
    typeof newAssessmentCycleFormSchema
  >;

  const { schema: newAssessmentCycleFormSchema } = useAssessmentCycleForm();

  const today = dayjs();
  const form = useForm<NewAssessmentCycleFormValues>({
    resolver: standardSchemaResolver(newAssessmentCycleFormSchema),
    defaultValues: {
      cycleName: "",
      cycleFrequency: "every three months",
      cycleDates: {
        startDate: new Date(),
        endDate: today.add(15, "day").toDate(),
      },
      cycleAdjustmentDates: {
        startDate: today.add(16, "day").toDate(),
        endDate: today.add(31, "day").toDate(),
      },
      cycleShareDates: {
        startDate: today.add(46, "day").toDate(),
        endDate: today.add(61, "days").toDate(),
      },
      cycleOptionalMessage: "",
    },
  });

  return (
    <div>
      <FormWithSteps
        form={form}
        onSubmit={(data) => console.log("submitted", data)}
      >
        <FormStep
          control={form.control}
          fields={["cycleName", "cycleFrequency"]}
        >
          <NewAssessmentCycleFormSteps.CycleName form={form} />
        </FormStep>
        <FormStep
          control={form.control}
          fields={["cycleDates", "cycleAdjustmentDates", "cycleShareDates"]}
        >
          <NewAssessmentCycleFormSteps.CycleDates form={form} />
        </FormStep>
        <FormStep>
          <NewAssessmentCycleFormSteps.CycleReview form={form} />
        </FormStep>
        <FormStep>
          <NewAssessmentCycleFormSteps.CycleMessage form={form} />
        </FormStep>
      </FormWithSteps>
    </div>
  );
};

export { NewAssessmentCycleForm };
