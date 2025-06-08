import {
  DatePicker,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@pipu/ui/components";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface AssessmentDatePickerFormFieldProps<TFormValues extends FieldValues> {
  control: Control<TFormValues>;
  name: FieldPath<TFormValues>;
  label: string;
  description: string;
  minDate?: Date;
  maxDate?: Date;
}

export const AssessmentDatePickerFormField = <TFormValues extends FieldValues>({
  control,
  name,
  label,
  description,
  minDate,
  maxDate,
}: AssessmentDatePickerFormFieldProps<TFormValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="h-fit">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <DatePicker field={field} minDate={minDate} maxDate={maxDate} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
