"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, BookOpen, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { TopicCard } from "@/components/topic-card";
import { useProgress } from "@/hooks/use-progress";
import topicsData from "@/data/topics.json";

const CATEGORIES = Object.entries(topicsData.categories) as [string, string][];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toggle, isCompleted, getTopicProgress, resetAll, totalCount } = useProgress();

  const filteredTopics = useMemo(() => {
    let topics = topicsData.topics;
    if (search) {
      const q = search.toLowerCase();
      topics = topics.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.categoryName.toLowerCase().includes(q)
      );
    }
    if (selectedCategory) {
      topics = topics.filter((t) => t.category === selectedCategory);
    }
    return topics;
  }, [search, selectedCategory]);

  const totalQuestions = topicsData.topics.reduce((s, t) => s + t.questionCount, 0);
  const totalExercises = topicsData.topics.reduce((s, t) => s + t.exerciseCount, 0);

  return (
    <div className="min-h-screen mesh-bg">
      <Navbar totalCount={totalCount} onReset={resetAll} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/50 px-4 py-1.5 text-xs text-muted-foreground mb-6">
              <Sparkles className="h-3.5 w-3.5 text-amber" />
              {totalQuestions + totalExercises} questions & exercises
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              DevOps
              <span className="bg-gradient-to-r from-cyan via-violet to-rose bg-clip-text text-transparent"> Interview </span>
              Prep
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Master your next DevOps interview with {topicsData.topics.length} topics, {totalQuestions} questions, and {totalExercises} hands-on exercises.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex items-center justify-center gap-8 text-sm"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="h-4 w-4 text-cyan" />
              <span><strong className="text-foreground">{totalQuestions}</strong> questions</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Zap className="h-4 w-4 text-amber" />
              <span><strong className="text-foreground">{totalExercises}</strong> exercises</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Sparkles className="h-4 w-4 text-violet" />
              <span><strong className="text-foreground">{topicsData.topics.length}</strong> topics</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {/* Search + Filters */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-11 bg-muted/50 border-border/50"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="rounded-full h-8 text-xs"
            >
              All
            </Button>
            {CATEGORIES.map(([key, label]) => {
              const count = topicsData.topics.filter((t) => t.category === key).length;
              if (count === 0) return null;
              return (
                <Button
                  key={key}
                  variant={selectedCategory === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
                  className="rounded-full h-8 text-xs"
                >
                  {label}
                  <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-[10px]">
                    {count}
                  </Badge>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        {filteredTopics.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No topics found for &ldquo;{search}&rdquo;
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTopics.map((topic, i) => {
              const allIds = [
                ...topic.questions.map((q, j) => `${topic.slug}-q${j}`),
                ...topic.exercises.map((e, j) => `${topic.slug}-e${j}`),
              ];
              return (
                <TopicCard
                  key={topic.slug}
                  slug={topic.slug}
                  name={topic.name}
                  color={topic.color}
                  category={topic.categoryName}
                  questionCount={topic.questionCount}
                  exerciseCount={topic.exerciseCount}
                  totalItems={topic.totalItems}
                  progress={getTopicProgress(allIds)}
                  index={i}
                />
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
