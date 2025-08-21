import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@pipu/ui/components";

export interface ConfirmationDialogRef {
  show: (onConfirm?: () => void) => void;
  hide: () => void;
}

interface ConfirmationDialogProps {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
}

const ConfirmationDialog = forwardRef<
  ConfirmationDialogRef,
  ConfirmationDialogProps
>(
  (
    {
      title = "Confirmar ação",
      message = "Tem certeza que deseja continuar?",
      confirmText = "Confirmar",
      cancelText = "Cancelar",
      variant = "default",
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [onConfirmCallback, setOnConfirmCallback] = useState<
      (() => void) | null
    >(null);

    useImperativeHandle(ref, () => ({
      show: (onConfirm?: () => void) => {
        setOnConfirmCallback(() => onConfirm || null);
        setIsOpen(true);
      },
      hide: () => setIsOpen(false),
    }));

    const handleConfirm = () => {
      if (onConfirmCallback) {
        onConfirmCallback();
      }
      setIsOpen(false);
      setOnConfirmCallback(null);
    };

    const handleCancel = () => {
      setIsOpen(false);
      setOnConfirmCallback(null);
    };

    return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{message}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel onClick={handleCancel}>
              {cancelText}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className={
                variant === "destructive"
                  ? "bg-destructive hover:bg-destructive/80"
                  : ""
              }
            >
              {confirmText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
);

ConfirmationDialog.displayName = "ConfirmationDialog";

export { ConfirmationDialog };
