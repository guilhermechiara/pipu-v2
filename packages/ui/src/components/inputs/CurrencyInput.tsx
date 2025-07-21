import { NumericFormat, NumericFormatProps } from "react-number-format";
import * as React from "react";
import { Input } from "@pipu/ui/components";
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";

export interface CurrencyInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<NumericFormatProps, "value" | "onValueChange"> {
  field: ControllerRenderProps<TFieldValues, TName>;
}

export function CurrencyInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  className,
  type,
  field,
  ...props
}: CurrencyInputProps<TFieldValues, TName>) {
  const displayValue = field.value ? field.value / 100 : field.value;

  return (
    <NumericFormat
      {...props}
      customInput={Input}
      prefix={"R$ "}
      allowNegative={false}
      fixedDecimalScale={true}
      decimalSeparator={","}
      decimalScale={2}
      thousandSeparator={"."}
      value={displayValue}
      onValueChange={(values) => {
        if (values.floatValue) {
          const valueInCents = Math.round(values.floatValue * 100);

          if (valueInCents !== field.value) {
            field.onChange(valueInCents);
          }
        } else {
          field.onChange(null);
        }
      }}
      onBlur={field.onBlur}
    />
  );
}

CurrencyInput.displayName = "CurrencyInput";
