import { Check, Moon, Sun } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useTheme } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function ThemeToggler({ className, showLabel }) {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const themes = ["system", "dark", "light"];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          buttonVariants({
            variant: "outline",
            size: showLabel ? "default" : "icon",
          }),
          className
        )}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className={cn("sr-only")}>Toggle theme</span>
        <span className={cn("hidden", showLabel && "block")}>Toggle theme</span>
      </PopoverTrigger>
      <PopoverContent align="end" className="flex flex-col px-0 py-2 w-[120px]">
        {themes.map((t) => (
          <Button
            onClick={() => {
              setTheme(t);
              setOpen(false);
            }}
            className="capitalize justify-start"
            key={t}
            variant="ghost"
          >
            {t}
            <Check
              className={cn(
                "size-4 opacity-0",
                theme === t && "opacity-100 ml-auto"
              )}
            />
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
} 