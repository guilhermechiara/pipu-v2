"use client";

import React, { Suspense } from "react";
import { EmployeeAvatarCard } from "./EmployeeAvatarCard";
import { EmployeesSelect } from "./EmployeesSelect";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, SubmitButton } from "@pipu/ui/components";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useEmployeeUpdateMutation } from "../hooks/useEmployeeUpdateMutation";

export interface UpdateEmployeePeoplePartnerProps {
  employeeId: string;
  onSuccess: () => void;
}

type UpdateEmployeePeoplePartnerFormValues = z.infer<typeof updateEmployeePeoplePartnerSchema>;

const updateEmployeePeoplePartnerSchema = z.object({
  peoplePartnerId: z.string().min(1),
});

export function UpdateEmployeePeoplePartner({
  employeeId,
  onSuccess,
}: UpdateEmployeePeoplePartnerProps) {
  const { mutate, isPending, isSuccess, isError, error, data } =
    useEmployeeUpdateMutation({
      id: employeeId,
      onSuccess,
    });

  const form = useForm<UpdateEmployeePeoplePartnerFormValues>({
    resolver: standardSchemaResolver(updateEmployeePeoplePartnerSchema),
    defaultValues: {
      peoplePartnerId: "",
    },
  });

  function handleSubmit(data: UpdateEmployeePeoplePartnerFormValues) {
    mutate({
      peoplePartnerId: data.peoplePartnerId,
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
              name="peoplePartnerId"
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
