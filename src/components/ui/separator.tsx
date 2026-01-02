'use client';

import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cn } from '@/lib/utils';

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = 'horizontal', decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

// Séparateur décoratif islamique
const IslamicSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center justify-center my-8', className)}
    {...props}
  >
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
    <div className="mx-4">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="text-secondary"
      >
        <path
          d="M12 2L14.4 9.2H22L16 13.8L18.4 21L12 16.4L5.6 21L8 13.8L2 9.2H9.6L12 2Z"
          fill="currentColor"
        />
      </svg>
    </div>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
  </div>
));
IslamicSeparator.displayName = 'IslamicSeparator';

export { Separator, IslamicSeparator };
