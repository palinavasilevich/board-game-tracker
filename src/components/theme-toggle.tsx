"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const isLight = resolvedTheme === "light";

  const toggleTheme = () => {
    setTheme(isLight ? "dark" : "light");
  };

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" disabled aria-label="Toggle theme">
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    );
  }

  return (
    <Button
      variant={isLight ? "outline" : "default"}
      size="icon"
      onClick={toggleTheme}
      aria-label={`Toggle ${isLight ? "dark" : "light"} mode`}
    >
      {isLight ? (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      )}
    </Button>
  );
}
