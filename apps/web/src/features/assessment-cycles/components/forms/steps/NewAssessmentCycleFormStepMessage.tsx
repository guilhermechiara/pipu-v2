import { StepProps } from "./NewAssessmentCycleFormSteps";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Textarea,
  Title,
} from "@pipu/ui/components";
import React from "react";

const PLACEHOLDER =
  "Escreva aqui mensagens que podem incluir orientações, direcionamentos e quaisquer outras informações relevantes para o ciclo de desempenho. Essas mensagens serão exibidas nos perfis de colaboradores e lideranças e podem ser ajustadas para cada persona, permitindo uma comunicação mais direcionada e alinhada com o papel de cada um no processo de avaliação.";

const NewAssessmentCycleFormStepMessage = ({ form }: StepProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Title as="h3">Mensagem sobre o ciclo</Title>
        <p className="text-sm italic">Campo opcional</p>
      </div>

      <div>
        <FormField
          control={form.control}
          name="cycleOptionalMessage"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea {...field} placeholder={PLACEHOLDER} rows={10} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export { NewAssessmentCycleFormStepMessage };
