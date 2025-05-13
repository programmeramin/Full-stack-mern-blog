import { TriangleAlert } from "lucide-react";
import React from "react";

const Error = ({ error }) => {
  if (!error) return;
  return (
    <div className="text-destructive text-center bg-destructive/10 text-sm py-2 px-4 rounded-lg justify-center flex items-center gap-3">
      <TriangleAlert className="size-4" />
      {error}
    </div>
  );
};

export default Error;
