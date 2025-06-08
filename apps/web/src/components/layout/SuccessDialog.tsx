import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@pipu/ui/components";
import { forwardRef, useImperativeHandle, useState } from "react";
import { CircleCheckBig } from "lucide-react";

export interface SuccessDialogRef {
  show: () => void;
  hide: () => void;
}

interface SuccessDialogProps {
  title?: string;
  message?: string;
}

const SuccessDialog = forwardRef<SuccessDialogRef, SuccessDialogProps>(
  (
    { title = "Sucesso!", message = "Operação realizada com sucesso." },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      show: () => setIsOpen(true),
      hide: () => setIsOpen(false),
    }));

    return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex flex-row gap-4 items-center text-green-700 text-lg">
              <CircleCheckBig />
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="ml-10">
              {message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsOpen(false)}>
              Fechar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
);

SuccessDialog.displayName = "SuccessDialog";

export { SuccessDialog };
