import * as React from "react";
import { LucideIcon } from "lucide-react";
import { Input } from "@pipu/ui/components";

interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  iconClassName?: string;
  containerClassName?: string;
  inputClassName?: string;
}

export function InputWithIcon({
  icon: Icon,
  iconClassName = "",
  containerClassName = "",
  inputClassName = "",
  className,
  ...props
}: InputWithIconProps) {
  return (
    <div className={`relative w-full ${containerClassName}`}>
      <Input
        className={`peer block w-full rounded-md border py-[9px] pl-10 text-sm ${inputClassName} ${className || ""}`}
        {...props}
      />
      {Icon && (
        <Icon
          className={`text-secondary pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 ${iconClassName}`}
        />
      )}
    </div>
  );
}
