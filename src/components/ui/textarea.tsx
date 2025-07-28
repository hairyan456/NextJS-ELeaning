import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        `flex outline-none min-h-20 rounded-md px-3 w-full text-sm border border-gray-200 focus:!border-primary focus:!transition-all 
        dark:border-opacity-10 dark:bg-grayDarker resize-none p-3 focus-primary`,
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
