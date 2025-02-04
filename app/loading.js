"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";

function Loader({ className }) {
  const pathname = usePathname();

  if (pathname.startsWith("/posts")) {
    return null;
  }

  return (
    <div className="flex min-h-[calc(100vh-88px)] items-center justify-center">
      <Loader2
        className={cn("my-28 h-12 w-12 animate-spin text-primary", className)}
      />
    </div>
  );
}

export default Loader;
