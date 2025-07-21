/* eslint-disable @typescript-eslint/no-empty-interface */
import * as React from 'react';
import { Mail } from 'lucide-react';
import { Input, InputProps } from '@pipu/ui/components';

export interface EmailInputProps extends InputProps {}

export const EmailInput = React.forwardRef<HTMLInputElement, EmailInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Mail className="h-5 w-5 text-blue-400" />
        </div>
        <Input
          id="email"
          type="email"
          ref={ref}
          className="pl-10"
          placeholder="Enter your email"
          autoComplete="email"
          {...props}
        />
      </div>
    );
  }
);
