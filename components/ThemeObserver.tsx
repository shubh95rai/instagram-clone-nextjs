"use client";

import { useEffect } from "react";

export default function ThemeObserver() {
  useEffect(() => {
    const isDark = localStorage.getItem("isDark");

    if (isDark === "true") {
      document.querySelector("html")?.classList.add("dark");
    }
  }, []);
  return null;
}
