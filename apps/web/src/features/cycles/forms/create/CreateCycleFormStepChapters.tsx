import CycleImagem from "../../../../../public/images/cycle.png";
import { Title } from "@pipu/ui/components";
import { CycleFormStepHeader } from "../CycleFormStepHeader";

const CreateCycleFormStepChapters = () => {
  return (
    <>
      <CycleFormStepHeader
        image={CycleImagem.src}
        title={
          <Title as="h3">
            Para começar selecione os chapters que deseja que seja incluído no
            ciclo
          </Title>
        }
      />
    </>
  );
};

export { CreateCycleFormStepChapters };
