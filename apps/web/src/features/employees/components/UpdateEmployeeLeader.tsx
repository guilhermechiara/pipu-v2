"use client";

import { z } from "zod/v4";
import { useEmployeeUpdateMutation } from "../hooks/useEmployeeUpdateMutation";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import React, { Suspense } from "react";
import { EmployeeAvatarCard } from "./EmployeeAvatarCard";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, SubmitButton } from "@pipu/ui/components";
import { EmployeesSelect } from "./EmployeesSelect";

export interface UpdateEmployeeLeaderProps {
  employeeId: string;
  onSuccess: () => void;
}

type UpdateEmployeeLeaderFormValues = z.infer<typeof updateEmployeeLeaderSchema>;

const updateEmployeeLeaderSchema = z.object({
  leaderId: z.string().min(1),
});

export function UpdateEmployeeLeader({
  employeeId,
  onSuccess,
}: UpdateEmployeeLeaderProps) {
  const { mutate, isPending, isSuccess } = useEmployeeUpdateMutation({
    id: employeeId,
    onSuccess,
  });

  const form = useForm<UpdateEmployeeLeaderFormValues>({
    resolver: standardSchemaResolver(updateEmployeeLeaderSchema),
    defaultValues: {
      leaderId: "",
    },
  });

  function handleSubmit(data: UpdateEmployeeLeaderFormValues) {
    mutate({
      leaderId: data.leaderId,
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
              name="leaderId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quem assumirá a nova posição?</FormLabel>
                  <FormControl>
                    <EmployeesSelect field={field} />
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
