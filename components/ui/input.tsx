import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Render a styled native input element with default classes while forwarding all standard input props.
 *
 * Merges the provided `className` with the component's default utility classes, sets `data-slot="input"`, and spreads any other `input` props onto the underlying element.
 *
 * @param className - Additional CSS classes to append to the component's default styles.
 * @param type - HTML input `type` attribute to apply to the element.
 * @param props - Any other standard `input` element props which will be forwarded to the rendered element.
 * @returns The rendered `<input>` element.
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }