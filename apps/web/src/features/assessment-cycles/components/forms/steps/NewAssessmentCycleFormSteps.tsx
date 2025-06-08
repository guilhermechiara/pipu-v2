import { UseFormReturn } from "react-hook-form";
import { NewAssessmentCycleFormStepName } from "./NewAssessmentCycleFormStepName";
import { NewAssessmentCycleFormStepDates } from "./NewAssessmentCycleFormStepDates";
import { NewAssessmentCycleFormStepReview } from "./NewAssessmentCycleFormStepReview";
import { NewAssessmentCycleFormStepMessage } from "./NewAssessmentCycleFormStepMessage";
import { AssessmentCycleFormValues } from "../../../hooks/useAssessmentCycleForm";

export interface StepProps {
  form: UseFormReturn<AssessmentCycleFormValues>;
}

export const NewAssessmentCycleFormSteps = {
  CycleName: NewAssessmentCycleFormStepName,
  CycleDates: NewAssessmentCycleFormStepDates,
  CycleReview: NewAssessmentCycleFormStepReview,
  CycleMessage: NewAssessmentCycleFormStepMessage,
};
