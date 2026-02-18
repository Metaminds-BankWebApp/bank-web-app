import * as React from "react"
import { cn } from "@/src/lib/utils"

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, children, ...props }, ref) => {
  return (
    <label ref={ref} className={cn("text-sm font-medium text-(--primecore-foreground)", className)} {...props}>
      {children}
    </label>
  )
})

Label.displayName = "Label"
