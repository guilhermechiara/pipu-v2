import { cn } from "@pipu/ui/lib/utils";
import React from "react";

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  type?: "primary" | "secondary" | "tertiary" | "success";
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
  ({ className, children, as = "h1", type, ...props }, ref) => {
    const Component = as;

    return (
      <Component
        ref={ref}
        className={cn(
          className,
          "font-medium",
          {
            "text-3xl": as === "h1",
            "text-2xl": as === "h2",
            "text-xl": as === "h3",
            "text-lg": as === "h4",
            "text-base": as === "h5",
            "text-sm": as === "h6",
          },
          {
            "font-bold": as === "h1" || as === "h2",
            "font-light": as === "h5" || as === "h6",
          },
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Title.displayName = "Title";
