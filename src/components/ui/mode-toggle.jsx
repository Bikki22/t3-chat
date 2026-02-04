"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sunrise, Sunset } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <Sunset className="size-5" />
      ) : (
        <Sunrise className="size-5" />
      )}
    </Button>
  );
}
