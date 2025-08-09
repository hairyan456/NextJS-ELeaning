import * as React from 'react';

import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        'focus-primary flex min-h-20 w-full resize-none rounded-md border border-gray-200 p-3 px-3 text-sm outline-none focus:!border-primary focus:!transition-all dark:border-opacity-10 dark:bg-grayDarker',
        className,
      )}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
