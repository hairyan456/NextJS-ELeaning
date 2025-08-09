import * as React from 'react'

import { cn } from '@/lib/utils'

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          'focus-primary flex h-10 w-full rounded-md border border-gray-200 px-3 text-sm outline-none focus:!border-primary focus:!transition-all disabled:cursor-not-allowed dark:border-opacity-10 dark:bg-grayDarker',
          className,
        )}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
