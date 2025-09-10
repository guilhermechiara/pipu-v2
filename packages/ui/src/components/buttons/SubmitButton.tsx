import { Loader2 } from "lucide-react";
import { PropsWithChildren } from "react";
import { Button } from "@pipu/ui/components";

type SubmitButtonProps = {
  isPending: boolean;
  className?: string;
};

const SubmitButton = ({
  isPending,
  children,
  className,
}: PropsWithChildren<SubmitButtonProps>) => {
  return (
    <Button
      type="submit"
      disabled={isPending}
      variant="default"
      size="lg"
      className={className}
    >
      {children}
      {isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
    </Button>
  );
};

export { SubmitButton };
