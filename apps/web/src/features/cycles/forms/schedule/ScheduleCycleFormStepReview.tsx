import { StepProps } from "./ScheduleCycleFormSteps";
import { Title } from "@pipu/ui/components";
import React from "react";
import Image from "next/image";
import Search from "../../../../../public/images/search.gif";
import Calendar from "../../../../../public/images/calendar.gif";
import { cn } from "@pipu/ui/lib/utils";

const ScheduleCycleFormReviewCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(
  (
    { children, className, ...props }: React.HTMLAttributes<HTMLDivElement>,
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(className, "border rounded-lg p-6 border-gray-200")}
      >
        {children}
      </div>
    );
  },
);
ScheduleCycleFormReviewCard.displayName = "ScheduleCycleFormReviewCard";

const ScheduleCycleFormStepReview = ({ form }: StepProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Title as="h3">Revisão do ciclo</Title>
      <p className="text-sm">Esta é sua última chance para edição.</p>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <ScheduleCycleFormReviewCard className="flex flex-row gap-8">
          <div className="grid col-span-2 content-center">
            <Image src={Search} alt="Search" width={62} height={62} />
          </div>
          <div className="flex flex-col gap-4 self-center">
            <div>
              <p>Nome</p>
              <Title as="h4">{form.getValues("cycleName")}</Title>
            </div>
            <div>
              <p>Período de referência</p>
              <Title as="h4">{form.getValues("cycleFrequency")}</Title>
            </div>
          </div>
        </ScheduleCycleFormReviewCard>

        <ScheduleCycleFormReviewCard className="flex flex-row gap-8">
          <div className="grid col-span-2 content-center">
            <Image src={Calendar} alt="Search" width={62} height={62} />
          </div>
          <div className="flex flex-col gap-4 self-center">
            <div>
              <p>Data para os líderes avaliarem</p>
              <Title as="h4">
                {form.getValues("cycleDates.startDate").toLocaleDateString()} -{" "}
                {form.getValues("cycleDates.endDate").toLocaleDateString()}
              </Title>
            </div>
            <div>
              <p>Data para calibração</p>
              <Title as="h4">
                {form
                  .getValues("cycleAdjustmentDates.startDate")
                  .toLocaleDateString()}{" "}
                -{" "}
                {form
                  .getValues("cycleAdjustmentDates.endDate")
                  .toLocaleDateString()}
              </Title>
            </div>
            <div>
              <p>Data para resultados</p>
              <Title as="h4">
                {form
                  .getValues("cycleShareDates.startDate")
                  .toLocaleDateString()}{" "}
                -{" "}
                {form.getValues("cycleShareDates.endDate").toLocaleDateString()}
              </Title>
            </div>
          </div>
        </ScheduleCycleFormReviewCard>
      </div>
    </div>
  );
};

export { ScheduleCycleFormStepReview };
