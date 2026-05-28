"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  ChevronDown,
  CheckCircle2,
  Circle,
  Shuffle,
  Eye,
  EyeOff,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/navbar";
import { useProgress } from "@/hooks/use-progress";
import topicsData from "@/data/topics.json";

export function TopicContent({ slug }: { slug: string }) {
  const topic = topicsData.topics.find((t) => t.slug === slug);
  const { toggle, isCompleted, getTopicProgress, resetAll, totalCount } = useProgress();
  const [search, setSearch] = useState("");
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});
  const [randomMode, setRandomMode] = useState(false);
  const [revealedAll, setRevealedAll] = useState(false);

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Topic not found</h1>
          <Link href="/" className="text-cyan hover:underline">
            Go back
          </Link>
        </div>
      </div>
    );
  }

  const allItems = topic.questions.map((q, i) => ({
    id: slug + "-q" + i,
    type: "question" as const,
    question: q.question,
    answer: q.answer,
  }));

  const progress = getTopicProgress(allItems.map((q) => q.id));

  const filtered = useMemo(() => {
    if (!search) return allItems;
    const q = search.toLowerCase();
    return allItems.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
    );
  }, [search, allItems]);

  const displayed = useMemo(() => {
    if (!randomMode) return filtered;
    return [...filtered].sort(() => Math.random() - 0.5);
  }, [filtered, randomMode]);

  const toggleAnswer = (id: string) => {
    setShowAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const revealAll = () => {
    const newState = !revealedAll;
    setRevealedAll(newState);
    const updates: Record<string, boolean> = {};
    allItems.forEach((item) => {
      updates[item.id] = newState;
    });
    setShowAnswers((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen mesh-bg">
      <Navbar totalCount={totalCount} onReset={resetAll} />

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            All Topics
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ background: topic.color }}
            />
            <h1 className="text-3xl font-bold tracking-tight">{topic.name}</h1>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <div className="flex-1">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">
                  {progress.done} of {progress.total} completed
                </span>
                <span className="text-muted-foreground">{progress.percent}%</span>
              </div>
              <Progress value={progress.percent} className="h-2" />
            </div>
            <Badge variant="secondary" className="shrink-0">
              {allItems.length} items
            </Badge>
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-10 bg-muted/50 border-border/50"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={randomMode ? "default" : "outline"}
              size="sm"
              onClick={() => setRandomMode((p) => !p)}
              className="gap-1.5"
            >
              <Shuffle className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Shuffle</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={revealAll}
              className="gap-1.5"
            >
              {revealedAll ? (
                <EyeOff className="h-3.5 w-3.5" />
              ) : (
                <Eye className="h-3.5 w-3.5" />
              )}
              <span className="hidden sm:inline">
                {revealedAll ? "Hide All" : "Reveal All"}
              </span>
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          {displayed.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              No questions match &ldquo;{search}&rdquo;
            </div>
          ) : (
            displayed.map((item, i) => {
              const isOpen = showAnswers[item.id];
              const done = isCompleted(item.id);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: Math.min(i * 0.01, 0.2) }}
                >
                  <div
                    className={"group rounded-xl border transition-all duration-200 " + (
                      done
                        ? "border-emerald/30 bg-emerald/5"
                        : isOpen
                        ? "border-border bg-card"
                        : "border-border/50 bg-card/50 hover:border-border hover:bg-card"
                    )}
                  >
                    <div
                      className="flex items-center gap-3 px-4 py-3 cursor-pointer select-none"
                      onClick={() => toggleAnswer(item.id)}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggle(item.id);
                        }}
                        className="shrink-0 mt-0.5"
                      >
                        {done ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald" />
                        ) : (
                          <Circle className="h-4 w-4 text-muted-foreground/50 hover:text-muted-foreground transition-colors" />
                        )}
                      </button>
                      <p className="flex-1 text-sm font-medium leading-relaxed pr-2">
                        {item.question}
                      </p>
                      <ChevronDown
                        className={"h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 " + (
                          isOpen ? "rotate-180" : ""
                        )}
                      />
                    </div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-border/50 px-4 py-4 ml-7 text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
