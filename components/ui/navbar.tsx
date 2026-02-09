import * as React from "react"
import { cn } from "@/lib/utils"

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
}

export function Navbar({ className, children, ...props }: NavbarProps) {
  return (
    <nav
      className={cn(
        "w-full sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b border-border",
        className
      )}
      {...props}
    >
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        {children}
      </div>
    </nav>
  )
}
