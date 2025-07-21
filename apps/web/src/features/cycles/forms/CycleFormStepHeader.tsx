import Image from "next/image";
import { Title } from "@pipu/ui/components";

interface CycleFormStepHeader {
  image: string;
  title: React.ReactElement<typeof Title>;
}

const CycleFormStepHeader = ({ image, title }: CycleFormStepHeader) => {
  return (
    <div className="flex flex-col items-center gap-4 mb-14">
      <Image src={image} alt={"Search"} width={120} height={120} />
      {title}
    </div>
  );
};

export { CycleFormStepHeader };
