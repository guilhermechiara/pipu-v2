"use client";

import {
  EmailInput,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  SubmitButton,
} from "@pipu/ui/components";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "../hooks/useSignIn";
import { useEffect } from "react";

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({ message: "Must be a valid email" }),
});

type LoginFormValues = z.infer<typeof formSchema>;

export interface LoginFormProps {
  onSuccess: (email: string) => void;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { mutate, isPending, isError, isSuccess, data } = useSignIn();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (onSuccess && isSuccess) {
      onSuccess(form.getValues().email);
    }
  }, [isSuccess, form, onSuccess]);

  async function onSubmit(info: LoginFormValues) {
    mutate({
      email: info.email,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-8 grid grid-cols-1 gap-4"
      >
        <h2 className="text-primary mt-6 text-3xl font-normal">
          Cada equipe tem potencial para ser
          <span className="font-semibold"> extraordinária.</span>
        </h2>

        <h5 className="text-blue-secondary">
          Para realizar o primeiro acesso a plataforma, você precisa preencher o
          campo abaixo. Após isso, irá receber o link de acesso
        </h5>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <EmailInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton isPending={isPending}> Receber link </SubmitButton>
        {/*{isError && <ErrorAlert error={error as ApiError}/>}*/}
        {/*{isSuccess && (*/}
        {/*    <MessageCard>*/}
        {/*        <MessageCardHeader className="text-">*/}
        {/*            <MessageCardTitle>Acesso enviado por e-mail</MessageCardTitle>*/}
        {/*        </MessageCardHeader>*/}
        {/*        <MessageCardContent>*/}
        {/*            Para acessar a <strong>pipu</strong>, você só precisa clicar no*/}
        {/*            link que enviamos pro seu e-mail profissional*/}
        {/*        </MessageCardContent>*/}
        {/*    </MessageCard>*/}
        {/*)}*/}
      </form>
    </Form>
  );
};

export { LoginForm };
