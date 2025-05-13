import { navLinks } from "@/constants";
import { cn } from "@/lib/utils";
import React from "react";
import { Link, useLocation } from "react-router";
import { buttonVariants } from "../ui/button";
import { motion } from "framer-motion";

const NavLinks = () => {
  const { pathname } = useLocation();
  return (
    <nav className="hidden lg:block mr-3 ml-0 lg:ml-3">
      <ul className="flex">
        {navLinks.map(({ label, href }) => {
          const isActive = pathname === href;
          return (
            <li key={label}>
              <Link
                to={href}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "text-base text-foreground/70",
                  isActive && "text-foreground"
                )}
              >
                <span className="relative">
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavLink"
                      className="absolute inset-x-0 bg-primary rounded-full h-1 -bottom-2"
                    />
                  )}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavLinks; 