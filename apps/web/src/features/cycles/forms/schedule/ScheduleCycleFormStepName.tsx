import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Title,
} from "@pipu/ui/components";
import Search from "../../../../../public/images/search.gif";
import { StepProps } from "./ScheduleCycleFormSteps";
import { CycleFormStepHeader } from "../CycleFormStepHeader";

const ScheduleCycleFormStepName = ({ form }: StepProps) => {
  return (
    <>
      <CycleFormStepHeader
        image={Search.src}
        title={
          <Title as="h3">
            Primeiramente, como podemos identificar seu ciclo?
          </Title>
        }
      />

      <div className="flex flex-col gap-10">
        <FormField
          control={form.control}
          name="cycleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do ciclo</FormLabel>
              <FormControl>
                <Input
                  placeholder="Escreva o nome escolhido, ele será exibido para todos da empresa, ex: Avaliação Líderes N1."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cycleFrequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Período de referência</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <div className="flex items-center space-x-2.5">
                    <RadioGroupItem value="every three months" id="r1" />
                    <Label htmlFor="r1">
                      <strong>Trimestral</strong> | quatro vezes no ano
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <RadioGroupItem value="every four months" id="r2" />
                    <Label htmlFor="r2">
                      <strong>Quadrimestral</strong> | três vezes no ano
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <RadioGroupItem value="every six months" id="r3" />
                    <Label htmlFor="r3">
                      <strong>Semestral</strong> | duas vezes no ano
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <RadioGroupItem value="every year" id="r4" />
                    <Label htmlFor="r4">
                      <strong>Anual</strong> | uma vez no ano
                    </Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export { ScheduleCycleFormStepName };
