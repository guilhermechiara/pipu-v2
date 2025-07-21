import { UseFormReturn } from "react-hook-form";
import { ScheduleCycleFormStepName } from "./ScheduleCycleFormStepName";
import { ScheduleCycleFormStepDates } from "./ScheduleCycleFormStepDates";
import { ScheduleCycleFormStepReview } from "./ScheduleCycleFormStepReview";
import { ScheduleCycleFormStepMessage } from "./ScheduleCycleFormStepMessage";
import { ScheduleCycleFormValues } from "./useScheduleCycleForm";

export interface StepProps {
  form: UseFormReturn<ScheduleCycleFormValues>;
}

export const ScheduleCycleFormSteps = {
  CycleName: ScheduleCycleFormStepName,
  CycleDates: ScheduleCycleFormStepDates,
  CycleReview: ScheduleCycleFormStepReview,
  CycleMessage: ScheduleCycleFormStepMessage,
};
