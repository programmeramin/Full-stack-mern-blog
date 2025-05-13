import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { buttonVariants } from "./ui/button";

function PasswordInput({ className, disabled, ...props }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const Icon = showPassword ? EyeOff : Eye;
  return (
    <div className="relative">
      <input
        disabled={disabled}
        type={showPassword ? "text" : "password"}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 pr-10 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
      <div
        role="button"
        onClick={() => setShowPassword(!showPassword)}
        type="button"
        variant="ghost"
        size="icon"
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "rounded-full absolute right-1 top-1/2 -translate-y-1/2",
          disabled && "opacity-60 pointer-events-none"
        )}
      >
        <Icon className="size-4" />
      </div>
    </div>
  );
}

export { PasswordInput }; 