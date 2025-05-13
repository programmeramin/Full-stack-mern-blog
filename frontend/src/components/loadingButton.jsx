import React from "react";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

const LoadingButton = ({ className, children, isLoading }) => {
  return (
    <Button className={cn(className)} disabled={isLoading}>
      {isLoading ? <Loader className="size-5 animate-spin" /> : children}
    </Button>
  );
};

export default LoadingButton; 