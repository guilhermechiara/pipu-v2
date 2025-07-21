import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { Button } from "@pipu/ui/components";
import { cn } from "@pipu/ui/lib/utils";

const outlineButtonVariants = cva("", {
  variants: {
    variant: {
      default: "",
      destructive:
        "border-destructive text-destructive hover:text-destructive hover:bg-destructive/10",
      primary:
        "border-primary text-primary hover:text-primary hover:bg-primary/10",
      warning:
        "border-warning text-warning hover:text-warning hover:bg-warning/10",
      success:
        "border-success text-success hover:text-success hover:bg-success/10",
    },
  },
});

const OutlineButton = ({
  className,
  variant,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof outlineButtonVariants>) => {
  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      className={cn(outlineButtonVariants({ variant, className }))}
      {...props}
    >
      {children}
    </Button>
  );
};

export { OutlineButton };
