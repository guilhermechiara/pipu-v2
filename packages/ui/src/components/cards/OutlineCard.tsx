"use client";

import * as React from "react";
import { cn } from "@pipu/ui/lib/utils";

type CardContextType = {
  type: "primary" | "danger" | "warning" | "success" | "cyan";
};

const CardContext = React.createContext<CardContextType>({ type: "primary" });

const OutlineCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { type } = React.useContext(CardContext);

  const textColor = {
    primary: "text-blue-secondary",
    danger: "text-destructive",
    warning: "text-warning",
    success: "text-success",
    cyan: "text-pipu-cyan",
  }[type];

  return (
    <div
      ref={ref}
      className={cn("text-xl font-medium", textColor, className)}
      {...props}
    />
  );
});
OutlineCardHeader.displayName = "OutlineCardHeader";

const OutlineCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-sm", className)} {...props} />
));
OutlineCardContent.displayName = "OutlineCardContent";

type OutlineCardProps = CardContextType;

const OutlineCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & OutlineCardProps
>(({ className, type, children, ...props }, ref) => {
  const borderColor = {
    primary: "border-primary",
    danger: "border-destructive",
    warning: "border-warning",
    success: "border-success",
    cyan: "border-pipu-cyan",
  }[type];

  return (
    <CardContext.Provider value={{ type }}>
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-4 px-6 py-6 bg-white border rounded-md",
          borderColor,
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </CardContext.Provider>
  );
});
OutlineCard.displayName = "OutlineCard";

export { OutlineCard, OutlineCardContent, OutlineCardHeader };
