import React from "react";
import { cn } from "@pipu/ui/lib/utils";
import { Progress } from "@pipu/ui/components";

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: number;
  currentStep: number;
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ className, children, steps, currentStep, ...props }, ref) => {
    const totalSteps = steps - 1;
    const currentProgressValue = (100 / totalSteps) * currentStep;

    return (
      <div>
        <div className={cn(className)} {...props}>
          <Progress value={currentProgressValue} className="h-4" />
          {children}
        </div>
      </div>
    );
  },
);

export { Stepper };
