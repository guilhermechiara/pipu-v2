import * as React from 'react';
import { cn } from '@pipu/ui/lib/utils';

const MessageCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-2 px-6 py-6 bg-white border border-zinc-200 rounded-md shadow-lg',
        className
      )}
      {...props}
    />
  )
);
MessageCard.displayName = 'MessageCard';

const MessageCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1', className)} {...props} />
  )
);
MessageCardHeader.displayName = 'MessageCardHeader';

const MessageCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('font-semibold text-sm leading-none tracking-tight text-primary', className)}
    {...props}
  />
));
MessageCardTitle.displayName = 'MessageCardTitle';

const MessageCardContent = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-blue-secondary', className)} {...props} />
));
MessageCardContent.displayName = 'MessageCardContent';

export { MessageCard, MessageCardHeader, MessageCardTitle, MessageCardContent };
