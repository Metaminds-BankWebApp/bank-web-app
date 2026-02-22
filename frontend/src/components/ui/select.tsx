"use client"

import * as React from "react"
import { ChevronDown, Check } from "lucide-react"

import { cn } from "@/src/lib/utils"

type SelectContextType = {
  value: string | undefined
  onValueChange: (value: string) => void
  open: boolean
  setOpen: (open: boolean) => void
  selectedLabel: React.ReactNode
  setSelectedLabel: (label: React.ReactNode) => void
}

const SelectContext = React.createContext<SelectContextType | undefined>(undefined)

const Select = ({ children, value, onValueChange, defaultValue }: { children: React.ReactNode, value?: string, onValueChange?: (val: string) => void, defaultValue?: string }) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "")
  const [open, setOpen] = React.useState(false)
  const [selectedLabel, setSelectedLabel] = React.useState<React.ReactNode>(null)

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const handleValueChange = (val: string) => {
    if (!isControlled) {
      setInternalValue(val)
    }
    onValueChange?.(val)
    setOpen(false)
  }

  return (
    <SelectContext.Provider value={{ value: currentValue, onValueChange: handleValueChange, open, setOpen, selectedLabel, setSelectedLabel }}>
      <div className="relative w-full">{children}</div>
    </SelectContext.Provider>
  )
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    const ctx = React.useContext(SelectContext)
    return (
      <button
        ref={ref}
        type="button"
        onClick={() => ctx?.setOpen(!ctx.open)}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
    )
  }
)
SelectTrigger.displayName = "SelectTrigger"

const SelectValue = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement> & { placeholder?: string }>(
  ({ className, placeholder, ...props }, ref) => {
    const ctx = React.useContext(SelectContext)
    return (
      <span
        ref={ref}
        className={cn("block truncate", className)}
        {...props}
      >
        {ctx?.value ? (ctx.selectedLabel ?? ctx.value) : placeholder}
      </span>
    )
  }
)
SelectValue.displayName = "SelectValue"

const SelectContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const ctx = React.useContext(SelectContext)

    return (
      <div
        ref={ref}
        className={cn(
          "absolute top-full z-50 min-w-[8rem] overflow-hidden rounded-md border border-slate-200 bg-white text-slate-950 shadow-md animate-in fade-in-80 w-full mt-1",
          ctx?.open ? "block" : "hidden",
          className
        )}
        {...props}
      >
        <div className="p-1 max-h-60 overflow-y-auto w-full">
            {children}
        </div>
      </div>
    )
  }
)
SelectContent.displayName = "SelectContent"

const SelectItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value: string }>(
  ({ className, children, value, ...props }, ref) => {
    const ctx = React.useContext(SelectContext)
    const isSelected = ctx?.value === value

    React.useEffect(() => {
      if (isSelected) {
        ctx?.setSelectedLabel(children)
      }
    }, [isSelected, children, ctx])

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-slate-100 focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          isSelected && "font-semibold",
          className
        )}
        onClick={(e) => {
            e.stopPropagation()
            ctx?.onValueChange(value)
        }}
        {...props}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            {isSelected && <Check className="h-4 w-4" />}
        </span>
        <span className="truncate">{children}</span>
      </div>
    )
  }
)
SelectItem.displayName = "SelectItem"

// Shells for unused components to avoid export errors if imported elsewhere
const SelectGroup = ({ children }: { children: React.ReactNode }) => <>{children}</>
const SelectLabel = ({ children }: { children: React.ReactNode }) => <div className="px-2 py-1.5 text-sm font-semibold">{children}</div>
const SelectSeparator = () => <div className="-mx-1 my-1 h-px bg-slate-100" />

export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator }
