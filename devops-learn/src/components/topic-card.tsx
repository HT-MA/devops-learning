"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface TopicCardProps {
  slug: string;
  name: string;
  color: string;
  category: string;
  questionCount: number;
  exerciseCount: number;
  totalItems: number;
  progress: { done: number; total: number; percent: number };
  index: number;
}

export function TopicCard({
  slug,
  name,
  color,
  category,
  questionCount,
  exerciseCount,
  totalItems,
  progress,
  index,
}: TopicCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
    >
      <Link href={`/topic/${slug}`} className="group block">
        <div className="relative overflow-hidden rounded-xl border border-border/50 bg-card p-5 transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5 hover:-translate-y-0.5">
          {/* Color accent line */}
          <div
            className="absolute left-0 top-0 h-1 w-full opacity-60 transition-opacity group-hover:opacity-100"
            style={{ background: color }}
          />

          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base truncate group-hover:text-primary transition-colors">
                {name}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground capitalize">
                {category}
              </p>
            </div>
            <ArrowRight className="mt-1 h-4 w-4 text-muted-foreground/50 transition-all group-hover:text-foreground group-hover:translate-x-0.5 shrink-0" />
          </div>

          <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
            {questionCount > 0 && (
              <span className="flex items-center gap-1">
                <span className="font-medium text-foreground/80">{questionCount}</span> questions
              </span>
            )}
            {exerciseCount > 0 && (
              <span className="flex items-center gap-1">
                <span className="font-medium text-foreground/80">{exerciseCount}</span> exercises
              </span>
            )}
          </div>

          {progress.total > 0 && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">
                  {progress.done}/{progress.total}
                </span>
                {progress.percent === 100 && (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald" />
                )}
              </div>
              <Progress value={progress.percent} className="h-1.5" />
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
