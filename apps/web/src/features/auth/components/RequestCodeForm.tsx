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
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useRequestCode } from "../hooks/useRequestCode";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.email({ error: `must be a valid email` }).min(1, {
    message: "Email is required",
  }),
});

type RequestCodeValues = z.infer<typeof formSchema>;

export interface RequestCodeFormProps {
  initialEmail: string;
  onSuccess: (email: string) => void;
}

export function RequestCodeForm({
  onSuccess,
  initialEmail,
}: RequestCodeFormProps) {
  const { mutate, isPending, isError, isSuccess, data } = useRequestCode();

  const form = useForm<RequestCodeValues>({
    resolver: standardSchemaResolver(formSchema),
    defaultValues: {
      email: initialEmail,
    },
  });

  useEffect(() => {
    if (initialEmail) {
      form.setValue("email", initialEmail);
    }
  }, [initialEmail, form]);

  useEffect(() => {
    if (isSuccess && onSuccess) {
      onSuccess(form.getValues("email"));
    }
  }, [isSuccess, onSuccess, form]);

  function onSubmit(info: RequestCodeValues) {
    mutate({
      email: info.email,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <EmailInput
                  {...field}
                  autoComplete="email"
                  autoFocus={!initialEmail}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton isPending={isPending}> Enviar código </SubmitButton>
      </form>
    </Form>
  );
}
