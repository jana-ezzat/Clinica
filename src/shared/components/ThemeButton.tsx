"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "@/assets/icons/icons";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="ds-text cursor-pointer hover:opacity-70 transition-opacity"
      aria-label="Toggle theme">
      {isDark ? <Sun size={22} /> : <Moon size={22} />}
    </button>
  );
}
