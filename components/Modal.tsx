"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function Modal({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <div>
      <div
        className="fixed inset-0 z-20 bg-black/80"
        onClick={() => {
          router.back();
        }}
      >
        <div
          className="absolute inset-10 rounded-md bg-white dark:bg-neutral-900"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="absolute inset-1 overflow-y-auto rounded-md bg-white dark:bg-neutral-900 sm:p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
