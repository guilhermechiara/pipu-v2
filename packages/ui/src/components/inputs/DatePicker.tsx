import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";
import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@pipu/ui/components";
import { cn } from "@pipu/ui/lib/utils";
import { CalendarIcon } from "lucide-react";
import dayjs from "dayjs";

interface DatePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  field: ControllerRenderProps<TFieldValues, TName>;
  placeholder?: string;
  className?: string;
  disabled?: boolean | ((date: Date) => boolean);
  minDate?: Date;
  maxDate?: Date;
}

export function DatePicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  field,
  placeholder = "Pick a date",
  className,
  disabled,
  minDate = new Date("1900-01-01"),
  maxDate = new Date(),
}: DatePickerProps<TFieldValues, TName>) {
  const isDateDisabled = (date: Date) => {
    const isOutOfRange = date > maxDate || date < minDate;

    if (typeof disabled === "function") {
      return isOutOfRange || disabled(date);
    }

    return isOutOfRange;
  };

  return (
    <div className={cn(className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full pl-3 text-left font-normal",
              !field.value && "text-muted-foreground",
            )}
            disabled={disabled === true}
          >
            {field.value ? (
              dayjs(field.value).format("DD/MM/YYYY")
            ) : (
              <span>{placeholder}</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto bg-white p-0" align="end">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            disabled={isDateDisabled}
            autoFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
