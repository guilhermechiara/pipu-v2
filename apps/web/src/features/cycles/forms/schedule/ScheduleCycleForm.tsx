"use client";

import { FormStep, FormWithSteps } from "@pipu/ui/components";
import { ScheduleCycleFormSteps } from "./ScheduleCycleFormSteps";
import { z } from "zod/v4";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { useScheduleCycleForm } from "./useScheduleCycleForm";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";

const ScheduleCycleForm = () => {
  type ScheduleCycleFormValues = z.infer<typeof scheduleCycleFormSchema>;

  const { schema: scheduleCycleFormSchema } = useScheduleCycleForm();

  const today = dayjs();
  const form = useForm<ScheduleCycleFormValues>({
    resolver: standardSchemaResolver(scheduleCycleFormSchema),
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
          <ScheduleCycleFormSteps.CycleName form={form} />
        </FormStep>
        <FormStep
          control={form.control}
          fields={["cycleDates", "cycleAdjustmentDates", "cycleShareDates"]}
        >
          <ScheduleCycleFormSteps.CycleDates form={form} />
        </FormStep>
        <FormStep>
          <ScheduleCycleFormSteps.CycleReview form={form} />
        </FormStep>
        <FormStep>
          <ScheduleCycleFormSteps.CycleMessage form={form} />
        </FormStep>
      </FormWithSteps>
    </div>
  );
};

export { ScheduleCycleForm };
