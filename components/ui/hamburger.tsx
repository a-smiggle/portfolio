import * as React from "react";
import { cn } from "@/lib/utils";

export interface HamburgerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  open: boolean;
}

export const Hamburger = React.forwardRef<HTMLButtonElement, HamburgerProps>(
  ({ className, open, ...props }, ref) => (
    <button
      ref={ref}
      className={cn("flex items-center justify-center w-10 h-10 p-2 rounded focus:outline-none", className)}
      aria-label="Toggle menu"
      aria-expanded={open}
      {...props}
    >
      <span className="sr-only">Toggle menu</span>
      <span className="block relative w-6 h-6">
        <span
          className={cn(
            "absolute left-0 top-1 w-6 h-0.5 bg-current transition-all",
            open ? "rotate-45 top-3" : ""
          )}
        />
        <span
          className={cn(
            "absolute left-0 top-3 w-6 h-0.5 bg-current transition-all",
            open ? "opacity-0" : ""
          )}
        />
        <span
          className={cn(
            "absolute left-0 top-5 w-6 h-0.5 bg-current transition-all",
            open ? "-rotate-45 top-3" : ""
          )}
        />
      </span>
    </button>
  )
);
Hamburger.displayName = "Hamburger";
