import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Menu } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import Logo from "../logo";
import { navLinks } from "@/constants";
import { Link, useLocation } from "react-router";
import { ThemeToggler } from "./themeToggler";

const MobileSidebar = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "lg:hidden"
        )}
      >
        <Menu className="size-4" />
      </SheetTrigger>
      <SheetContent side="left" className="py-5">
        <SheetHeader className="hidden">
          <SheetTitle>Title</SheetTitle>
          <SheetDescription>Description</SheetDescription>
        </SheetHeader>
        <Logo className="ml-4" />
        <nav className="mt-6">
          <ul className="space-y-2">
            {navLinks.map(({ label, href, icon }) => {
              const isActive = href === pathname;
              const Icon = icon;
              return (
                <li key={label}>
                  <Link
                    onClick={() => setOpen(false)}
                    to={href}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "lg" }),
                      "justify-start w-full",
                      isActive && "bg-accent"
                    )}
                  >
                    <Icon className="size-5" />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <ThemeToggler className="mt-auto" showLabel/>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar; 