"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  MessageCard,
  MessageCardContent,
  MessageCardHeader,
  MessageCardTitle,
  OutlineButton,
  SubmitButton,
} from "@pipu/ui/components";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useVerifyCode } from "../hooks/useVerifyCode";
import { useEffect } from "react";
import { ErrorCardMessage } from "../../../components/layout/ErrorCardMessage";

const formSchema = z.object({
  code: z
    .string()
    .min(1, { message: "O código deve ter 6 números" })
    .max(6, { message: "O código deve ter 6 números" })
    .regex(/^\d+$/, { message: "Código deve conter apenas números" }),
});

type VerifyCodeValues = z.infer<typeof formSchema>;

export interface VerifyCodeFormProps {
  email: string;
  onPrevious: () => void;
  onSuccess: () => void;
}

export function VerifyCodeForm({
  email,
  onPrevious,
  onSuccess,
}: VerifyCodeFormProps) {
  const { mutate, isSuccess, isPending, error, isError } = useVerifyCode();

  const form = useForm<VerifyCodeValues>({
    resolver: standardSchemaResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  useEffect(() => {
    if (isSuccess && onSuccess) {
      onSuccess();
    }
  }, [isSuccess, onSuccess]);

  function onSubmit(input: VerifyCodeValues) {
    mutate({
      email: email,
      code: input.code,
    });
  }

  return (
    <>
      <MessageCard>
        <MessageCardHeader className="text-">
          <MessageCardTitle>E-mail enviado com sucesso!</MessageCardTitle>
        </MessageCardHeader>
        <MessageCardContent>
          Para acessar a <strong>pipu</strong>, você só precisa preencher o
          campo abaixo com o código enviado para o seu e-mail.
        </MessageCardContent>
      </MessageCard>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton isPending={isPending}> Validar código </SubmitButton>
          <OutlineButton onClick={onPrevious}>Voltar</OutlineButton>
          {isError && <ErrorCardMessage error={error} />}
        </form>
      </Form>
    </>
  );
}
