import { AssessmentDatePickerFormField } from "./AssessmentDatePickerFormField";
import { Control, FieldValues } from "react-hook-form";
import { AssessmentCycleFormValues } from "../../../hooks/useAssessmentCycleForm";

interface AssessmentCycleDatesFormFieldProps<
  TFormValues extends AssessmentCycleFormValues,
> {
  minDatePicker: Date;
  maxDatePicker: Date;
  control: Control<TFormValues>;
}

const AssessmentCycleStartDateFormField = <TFormValues extends FieldValues>({
  minDatePicker,
  maxDatePicker,
  control,
}: AssessmentCycleDatesFormFieldProps<AssessmentCycleFormValues>) => (
  <AssessmentDatePickerFormField
    minDate={minDatePicker}
    maxDate={maxDatePicker}
    name="cycleDates.startDate"
    control={control}
    description="A Pipu dispara e inicia as avaliações."
    label="Início das avaliações"
  />
);

const AssessmentCycleEndDateFormField = <TFormValues extends FieldValues>({
  minDatePicker,
  maxDatePicker,
  control,
}: AssessmentCycleDatesFormFieldProps<AssessmentCycleFormValues>) => (
  <AssessmentDatePickerFormField
    minDate={minDatePicker}
    maxDate={maxDatePicker}
    name="cycleDates.endDate"
    control={control}
    description="Nesta data automaticamente o sistema não vai aceitar mais
                  avaliações."
    label="Fim das avaliações"
  />
);

const AssessmentCycleAdjustmentStartDateFormField = <
  TFormValues extends FieldValues,
>({
  minDatePicker,
  maxDatePicker,
  control,
}: AssessmentCycleDatesFormFieldProps<AssessmentCycleFormValues>) => (
  <AssessmentDatePickerFormField
    minDate={minDatePicker}
    maxDate={maxDatePicker}
    name="cycleAdjustmentDates.startDate"
    control={control}
    description="Início do período para as calibrações das avaliações realizadas na etapa anterior"
    label="Início da calibração"
  />
);

const AssessmentCycleAdjustmentEndDateFormField = <
  TFormValues extends FieldValues,
>({
  minDatePicker,
  maxDatePicker,
  control,
}: AssessmentCycleDatesFormFieldProps<AssessmentCycleFormValues>) => (
  <AssessmentDatePickerFormField
    minDate={minDatePicker}
    maxDate={maxDatePicker}
    name="cycleAdjustmentDates.endDate"
    control={control}
    description="Fim do período de calibrações deste ciclo."
    label="Fim da calibração"
  />
);

const AssessmentCycleShareStartDateFormField = <
  TFormValues extends FieldValues,
>({
  minDatePicker,
  maxDatePicker,
  control,
}: AssessmentCycleDatesFormFieldProps<AssessmentCycleFormValues>) => (
  <AssessmentDatePickerFormField
    minDate={minDatePicker}
    maxDate={maxDatePicker}
    name="cycleShareDates.startDate"
    control={control}
    description="Início do período de devolução das avaliações realizadas."
    label="Início do período de devolutiva"
  />
);

const AssessmentCycleShareEndDateFormField = <TFormValues extends FieldValues>({
  minDatePicker,
  maxDatePicker,
  control,
}: AssessmentCycleDatesFormFieldProps<AssessmentCycleFormValues>) => (
  <AssessmentDatePickerFormField
    minDate={minDatePicker}
    maxDate={maxDatePicker}
    name="cycleShareDates.endDate"
    control={control}
    description="Fim do período de devolução das avaliações realizadas."
    label="Fim do período de devolutiva"
  />
);

export const AssessmentCycleDatesFormField = {
  StartDate: AssessmentCycleStartDateFormField,
  EndDate: AssessmentCycleEndDateFormField,
  AdjustmentStartDate: AssessmentCycleAdjustmentStartDateFormField,
  AdjustmentEndDate: AssessmentCycleAdjustmentEndDateFormField,
  ShareStartDate: AssessmentCycleShareStartDateFormField,
  ShareEndDate: AssessmentCycleShareEndDateFormField,
};
