import * as React from "react"
import { cn } from "@/lib/utils"

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(({ className, ...props }, ref) => {
  return (
    <input
      type="checkbox"
      className={cn(
        "peer relative h-6 w-11 shrink-0 cursor-pointer appearance-none rounded-full bg-gray-300 dark:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 checked:bg-primary checked:dark:bg-primary checked:after:translate-x-5 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-md after:transition-transform after:content-['']",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Switch.displayName = "Switch"
export { Switch }
