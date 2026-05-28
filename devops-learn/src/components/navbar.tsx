"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, ExternalLink, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar({ totalCount, onReset }: { totalCount: number; onReset: () => void }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 glass">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-mono">
            DO
          </span>
          <span className="hidden sm:inline">DevOps Prep</span>
        </Link>

        <div className="flex items-center gap-2">
          {totalCount > 0 && (
            <span className="mr-2 hidden text-xs text-muted-foreground sm:inline">
              {totalCount} done
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onReset}
            title="Reset progress"
            className="text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title="Toggle theme"
            className="text-muted-foreground hover:text-foreground"
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          <a
            href="https://github.com/bregman-arie/devops-exercises"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
