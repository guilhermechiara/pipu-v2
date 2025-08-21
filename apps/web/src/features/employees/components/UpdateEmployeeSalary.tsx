import { z } from "zod/v4";
import { useEmployeeUpdateMutation } from "../hooks/useEmployeeUpdateMutation";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import React, { Suspense } from "react";
import { EmployeeAvatarCard } from "./EmployeeAvatarCard";
import {
  CurrencyInput,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  SubmitButton,
} from "@pipu/ui/components";

export interface UpdateEmployeeSalaryProps {
  employeeId: string;
  onSuccess: () => void;
}

type UpdateEmployeeSalaryFormValues = z.infer<
  typeof updateEmployeeSalarySchema
>;

const updateEmployeeSalarySchema = z.object({
  salary: z.number().min(1),
});

export function UpdateEmployeeSalary({
  employeeId,
  onSuccess,
}: UpdateEmployeeSalaryProps) {
  const { mutate, isPending } = useEmployeeUpdateMutation({
    id: employeeId,
    onSuccess,
  });

  const form = useForm<UpdateEmployeeSalaryFormValues>({
    resolver: standardSchemaResolver(updateEmployeeSalarySchema),
    defaultValues: {
      salary: 0,
    },
  });

  function handleSubmit(data: UpdateEmployeeSalaryFormValues) {
    mutate({
      salary: data.salary,
    });
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <p>Atual</p>
        <Suspense fallback="Loading...">
          <EmployeeAvatarCard employeeId={employeeId} />
        </Suspense>
      </div>

      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full flex flex-col gap-8"
          >
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qual será o novo salário?</FormLabel>
                  <FormControl>
                    <CurrencyInput field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SubmitButton isPending={isPending}>Atualizar</SubmitButton>
          </form>
        </Form>
      </div>
    </div>
  );
}
