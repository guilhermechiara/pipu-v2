import React from "react";
import { cn } from "@pipu/ui/lib/utils";

interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "primary" | "secondary" | "destructive" | "warning" | "success";
}

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ className, children, type = "primary", ...props }, ref) => {
    const variants = {
      primary: "bg-primary text-primary-foreground",
      destructive: "bg-destructive text-destructive-foreground",
      warning: "bg-warning text-warning-foreground",
      success: "bg-success text-success-foreground",
      secondary: "bg-secondary text-secondary-foreground",
    };

    return (
      <div
        ref={ref}
        className={cn(
          className,
          variants[type],
          "flex rounded-2xl text-xs items-center font-medium py-0.5 px-3",
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Tag.displayName = "Tag";

export { Tag };
