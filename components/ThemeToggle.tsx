"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { IoMoon } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  function toggleDarkMode() {
    document.querySelector("html")?.classList.toggle("dark");

    setDarkMode((prev) => {
      return !prev;
    });
  }

  useEffect(() => {
    localStorage.setItem("isDark", darkMode ? "true" : "false");
  }, [darkMode]);

  useEffect(() => {
    const isDark = localStorage.getItem("isDark");
    if (isDark === "true") {
      setDarkMode(true);
    }
  }, []);
  return (
    <div>
      <Button variant={"outline"} onClick={toggleDarkMode}>
        {darkMode ? <IoMoon /> : <IoMoonOutline />}
      </Button>
    </div>
  );
}
