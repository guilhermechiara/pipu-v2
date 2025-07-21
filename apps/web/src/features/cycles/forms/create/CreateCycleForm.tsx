"use client";

import { z } from "zod/v4";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { FormStep, FormWithSteps } from "@pipu/ui/components";
import { CreateCycleFormStepChapters } from "./CreateCycleFormStepChapters";

type CreateCycleFormValues = z.infer<typeof createCycleFormSchema>;

const createCycleFormSchema = z.object({
  chapterIds: z.array(z.string()).min(1),
  roleIds: z.array(z.string()).min(1),
});

const CreateCycleForm = () => {
  const form = useForm<CreateCycleFormValues>({
    resolver: standardSchemaResolver(createCycleFormSchema),
    defaultValues: {
      chapterIds: [],
      roleIds: [],
    },
  });

  return (
    <FormWithSteps form={form} onSubmit={() => console.log(`submitted!`)}>
      <FormStep control={form.control} fields={["chapterIds", "roleIds"]}>
        <CreateCycleFormStepChapters />
      </FormStep>
    </FormWithSteps>
  );
};

export { CreateCycleForm };
