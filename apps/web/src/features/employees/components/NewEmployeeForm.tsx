"use client";

import { z } from "zod/v4";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import {
  Button,
  CurrencyInput,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  SubmitButton,
} from "@pipu/ui/components";
import React, { Suspense, useEffect, useRef } from "react";
import { EmployeesSelect } from "./EmployeesSelect";
import { RolesSelect } from "../../roles/components/RolesSelect";
import { ChaptersSelect } from "../../chapters/components/ChaptersSelect";
import Link from "next/link";
import { useEmployeeMutation } from "../hooks/useEmployeeMutation";
import {
  SuccessDialog,
  SuccessDialogRef,
} from "../../../components/dialogs/SuccessDialog";
import { useRouter } from "next/navigation";

type NewEmployeeFormValues = z.infer<typeof newCycleFormSchema>;

const newCycleFormSchema = z.object({
  name: z.string().min(1),
  email: z.email().min(1),
  roleId: z.string().min(1),
  chapterId: z.string().min(1),
  initialSalary: z.number().min(1),
  leaderId: z.string().min(1),
  peoplePartnerId: z.string().min(1),
});

export const NewEmployeeForm = () => {
  const { isPending, isSuccess, isError, mutate } = useEmployeeMutation();
  const successDialogRef = useRef<SuccessDialogRef>(null);
  const router = useRouter();

  const form = useForm<NewEmployeeFormValues>({
    resolver: standardSchemaResolver(newCycleFormSchema),
    defaultValues: {
      name: "",
      email: "",
      roleId: "",
      chapterId: "",
      leaderId: "",
      peoplePartnerId: "",
      initialSalary: 0,
    },
  });

  useEffect(() => {
    if (isSuccess) {
      successDialogRef.current?.show();
    }
  }, [isSuccess]);

  function handleSubmit(data: NewEmployeeFormValues) {
    mutate({
      name: data.name,
      email: data.email,
      roleId: data.roleId,
      chapterId: data.chapterId,
      initialSalary: data.initialSalary,
      leaderId: data.leaderId,
      peoplePartnerId: data.peoplePartnerId,
    });
  }

  function handleClose() {
    router.push("/employees");
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full flex flex-col gap-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome completo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insira o nome completo para facilitar a identificação"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email corporativo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insira o e-email corporativo"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="leaderId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Liderança</FormLabel>
                <FormControl>
                  <Suspense fallback={<p>Loading...</p>}>
                    <EmployeesSelect field={field} />
                  </Suspense>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="peoplePartnerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>BP de RH</FormLabel>
                <FormControl>
                  <Suspense fallback={<p>Loading...</p>}>
                    <EmployeesSelect field={field} />
                  </Suspense>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="roleId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Posição</FormLabel>
                <FormControl>
                  <Suspense fallback={<p>Loading...</p>}>
                    <RolesSelect field={field} />
                  </Suspense>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="chapterId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chapter</FormLabel>
                <FormControl>
                  <Suspense fallback={<p>Loading...</p>}>
                    <ChaptersSelect field={field} />
                  </Suspense>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="initialSalary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chapter</FormLabel>
                <FormControl>
                  <CurrencyInput field={field} prefix="R$" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end flex-row gap-4">
            <Button variant="outline" asChild>
              <Link href="/employees">Cancelar</Link>
            </Button>
            <SubmitButton isPending={isPending}>Salvar</SubmitButton>
          </div>
        </form>
      </Form>

      <SuccessDialog
        ref={successDialogRef}
        message="Agora você pode visualizar a mudança na tela de Gestão de Pessoas."
        title="Pessoa adicionada com sucesso!"
        onClose={handleClose}
      />
    </>
  );
};
