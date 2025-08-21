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
  onClose?: () => void;
}

const SuccessDialog = forwardRef<SuccessDialogRef, SuccessDialogProps>(
  (
    {
      title = "Sucesso!",
      message = "Operação realizada com sucesso.",
      onClose,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      show: () => setIsOpen(true),
      hide: () => setIsOpen(false),
    }));

    function handleClose() {
      setIsOpen(false);

      if (onClose) {
        onClose();
      }
    }

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
            <AlertDialogAction onClick={handleClose}>Fechar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
);

SuccessDialog.displayName = "SuccessDialog";

export { SuccessDialog };
