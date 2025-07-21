import { Button, Form, Stepper, SubmitButton } from "@pipu/ui/components";
import React, { PropsWithChildren } from "react";
import { cn } from "@pipu/ui/lib/utils";
import {
  Control,
  FieldValues,
  get,
  Path,
  UseFormReturn,
} from "react-hook-form";

interface FormWithStepsActionProps {
  onPrevious?: () => void;
  onNext?: () => void;
  onSaveAndContinue?: () => void;
  isPending?: boolean;
}

interface FormStepProps<T extends FieldValues = FieldValues>
  extends PropsWithChildren {
  control?: Control<T>;
  fields?: Path<T>[];
}

function FormStepInner<T extends FieldValues>(
  { children, fields, control, ...rest }: FormStepProps<T>,
  ref: React.Ref<HTMLDivElement>,
) {
  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
}

const FormStep = React.forwardRef(FormStepInner) as <
  T extends FieldValues = FieldValues,
>(
  p: FormStepProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement | null;

interface FormWithStepsProps<T extends FieldValues = FieldValues>
  extends FormWithStepsActionProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void | Promise<void>;
  children: React.ReactElement | React.ReactElement[];
}

interface FormWithStepperFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    FormWithStepsActionProps {
  isLastStep?: boolean;
}

const FormWithStepsFooter = React.forwardRef<
  HTMLDivElement,
  FormWithStepperFooterProps
>(
  (
    {
      children,
      className,
      onPrevious,
      onNext,
      onSaveAndContinue,
      isLastStep = false,
      isPending = false,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          className,
          "flex flex-row justify-end align-middle w-full fixed right-0 bottom-0 p-8 shadow-header bg-white",
        )}
        {...props}
        ref={ref}
      >
        <div className="flex flex-row gap-4">
          <Button type="button" variant="ghost" onClick={onPrevious}>
            Voltar
          </Button>
          {onSaveAndContinue ? (
            <Button type="button" variant="outline" onClick={onSaveAndContinue}>
              Salvar e continuar
            </Button>
          ) : null}
          {isLastStep ? (
            <SubmitButton isPending={isPending}>Finalizar</SubmitButton>
          ) : (
            <Button type="button" variant="default" onClick={onNext}>
              Continuar
            </Button>
          )}
        </div>
      </div>
    );
  },
);

function FormWithStepsInner<T extends FieldValues>(
  {
    className,
    children,
    form,
    onSubmit,
    onSaveAndContinue,
    onPrevious,
    onNext,
    isPending,
    ...props
  }: FormWithStepsProps<T>,
  ref: React.Ref<HTMLDivElement>,
) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const totalSteps = React.Children.count(children);
  const steps = React.Children.toArray(children);

  const handleNext = async () => {
    if (currentStep >= totalSteps - 1) return;

    await form.trigger();

    const currentStepElement = steps[currentStep] as React.ReactElement<
      FormStepProps<T>
    >;
    const fieldsForCurrentStep = currentStepElement.props.fields || [];

    let isStepValid = true;
    if (fieldsForCurrentStep.length > 0) {
      const errors = form.formState.errors;

      for (const fieldPath of fieldsForCurrentStep) {
        if (get(errors, fieldPath)) {
          isStepValid = false;
          form.setFocus(fieldPath);
          break;
        }
      }
    }

    if (isStepValid) {
      setCurrentStep(currentStep + 1);
      if (onNext) onNext();
    }
  };

  const handlePrevious = () => {
    if (currentStep <= 0) return;

    setCurrentStep(currentStep - 1);

    if (onPrevious) onPrevious();
  };

  return (
    <div ref={ref} {...props}>
      <Stepper
        className={cn(className, "mb-12")}
        steps={totalSteps}
        currentStep={currentStep}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8 pb-14"
        >
          {steps[currentStep]}

          <FormWithStepsFooter
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSaveAndContinue={onSaveAndContinue}
            isLastStep={currentStep === totalSteps - 1}
            isPending={isPending}
          />
        </form>
      </Form>
    </div>
  );
}

const FormWithSteps = React.forwardRef(FormWithStepsInner) as <
  T extends FieldValues = FieldValues,
>(
  props: FormWithStepsProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement | null;

export { FormWithSteps, FormStep };
