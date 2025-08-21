import { z } from "zod/v4";
import { useEmployeeUpdateMutation } from "../hooks/useEmployeeUpdateMutation";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import React, { Suspense } from "react";
import { EmployeeAvatarCard } from "./EmployeeAvatarCard";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  SubmitButton,
} from "@pipu/ui/components";
import { RolesSelect } from "../../roles/components/RolesSelect";

export interface UpdateEmployeeRoleProps {
  employeeId: string;
  onSuccess: () => void;
}

type UpdateEmployeeRoleFormValues = z.infer<typeof updateEmployeeRoleSchema>;

const updateEmployeeRoleSchema = z.object({
  roleId: z.string().min(1),
});

export function UpdateEmployeeRole({
  employeeId,
  onSuccess,
}: UpdateEmployeeRoleProps) {
  const { mutate, isPending } = useEmployeeUpdateMutation({
    id: employeeId,
    onSuccess,
  });

  const form = useForm<UpdateEmployeeRoleFormValues>({
    resolver: standardSchemaResolver(updateEmployeeRoleSchema),
    defaultValues: {
      roleId: "",
    },
  });

  function handleSubmit(data: UpdateEmployeeRoleFormValues) {
    mutate({
      roleId: data.roleId,
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
              name="roleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qual será a nova posição?</FormLabel>
                  <FormControl>
                    <RolesSelect field={field} />
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
