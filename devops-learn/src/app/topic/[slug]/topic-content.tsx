"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
import { TopicSidebar } from "@/components/topic-sidebar";
import { useProgress } from "@/hooks/use-progress";
import topicsData from "@/data/topics.json";

export function TopicContent({ slug }: { slug: string }) {
  const topic = topicsData.topics.find((t) => t.slug === slug);
  const { completed, toggle, isCompleted, getTopicProgress, resetAll, totalCount } = useProgress();
  const [search, setSearch] = useState("");
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});
  const [randomMode, setRandomMode] = useState(false);
  const [revealedAll, setRevealedAll] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const contentRef = useRef<HTMLDivElement>(null);

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
    section: (q as { section?: string }).section || null,
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

  const groupedSections = useMemo(() => {
    if (randomMode || search) return null;

    const sectionMap = new Map<string, { title: string; items: typeof allItems }>();

    for (const item of displayed) {
      const sectionId = item.section || "__general__";
      if (!sectionMap.has(sectionId)) {
        const sectionMeta = topic.sections.find((s: any) => s.id === sectionId);
        sectionMap.set(sectionId, {
          title: sectionMeta?.title || "Other",
          items: [],
        });
      }
      sectionMap.get(sectionId)!.items.push(item);
    }

    const groups: { id: string; title: string; items: typeof allItems }[] = [];
    for (const section of topic.sections) {
      const group = sectionMap.get(section.id);
      if (group && group.items.length > 0) {
        groups.push({ id: section.id, title: group.title, items: group.items });
        sectionMap.delete(section.id);
      }
    }
    for (const [id, group] of sectionMap) {
      if (group.items.length > 0) {
        groups.push({ id, title: group.title, items: group.items });
      }
    }

    return groups;
  }, [displayed, topic.sections, randomMode, search]);

  const sectionProgress = useMemo(() => {
    const progressMap: Record<string, { done: number; total: number }> = {};
    for (const section of topic.sections) {
      const sectionItems = allItems.filter((item) => item.section === section.id);
      const done = sectionItems.filter((item) => isCompleted(item.id)).length;
      progressMap[section.id] = { done, total: sectionItems.length };
    }
    return progressMap;
  }, [allItems, topic.sections, completed]);

  useEffect(() => {
    if (randomMode || search) {
      setActiveSection(null);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute("data-section-id");
            if (sectionId) setActiveSection(sectionId);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    const refs = sectionRefs.current;
    refs.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [randomMode, search, groupedSections]);

  const scrollToSection = useCallback((sectionId: string) => {
    const el = sectionRefs.current.get(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

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

  const showSidebar = !randomMode && !search && topic.sections.length > 0;

  return (
    <div className="min-h-screen mesh-bg">
      <Navbar totalCount={totalCount} onReset={resetAll} />

      <div className="flex max-w-7xl mx-auto px-4 py-8 sm:px-6 gap-6">
        {showSidebar && (
          <TopicSidebar
            sections={topic.sections}
            activeSection={activeSection}
            onSectionClick={scrollToSection}
            sectionProgress={sectionProgress}
            topicColor={topic.color}
          />
        )}

        <div className="flex-1 min-w-0" ref={contentRef}>
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

          <div className="flex items-center gap-3 mb-6">
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
                <span>Shuffle</span>
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
                <span>{revealedAll ? "Hide All" : "Reveal All"}</span>
              </Button>
            </div>
          </div>

          {displayed.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              No questions match &ldquo;{search}&rdquo;
            </div>
          ) : groupedSections ? (
            <div className="space-y-6">
              {groupedSections.map((group) => (
                <div key={group.id}>
                  <div
                    data-section-id={group.id}
                    ref={(el) => {
                      if (el) sectionRefs.current.set(group.id, el);
                    }}
                    className="sticky top-14 z-10 -mx-4 px-4 py-2 bg-background/80 backdrop-blur-sm border-b border-border/50"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm font-semibold text-foreground/80">
                        {group.title}
                      </h2>
                      <span className="text-xs text-muted-foreground">
                        {sectionProgress[group.id]?.done}/
                        {sectionProgress[group.id]?.total} completed
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2 mt-2">
                    {group.items.map((item, i) => (
                      <QuestionCard
                        key={item.id}
                        item={item}
                        index={i}
                        isOpen={!!showAnswers[item.id]}
                        done={isCompleted(item.id)}
                        onToggle={() => toggleAnswer(item.id)}
                        onToggleDone={() => toggle(item.id)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {displayed.map((item, i) => (
                <QuestionCard
                  key={item.id}
                  item={item}
                  index={i}
                  isOpen={!!showAnswers[item.id]}
                  done={isCompleted(item.id)}
                  onToggle={() => toggleAnswer(item.id)}
                  onToggleDone={() => toggle(item.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function QuestionCard({
  item,
  index,
  isOpen,
  done,
  onToggle,
  onToggleDone,
}: {
  item: { id: string; question: string; answer: string };
  index: number;
  isOpen: boolean;
  done: boolean;
  onToggle: () => void;
  onToggleDone: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.01, 0.2) }}
    >
      <div
        className={
          "group rounded-xl border transition-all duration-200 " +
          (done
            ? "border-emerald/30 bg-emerald/5"
            : isOpen
              ? "border-border bg-card"
              : "border-border/50 bg-card/50 hover:border-border hover:bg-card")
        }
      >
        <div
          className="flex items-center gap-3 px-4 py-3 cursor-pointer select-none"
          onClick={onToggle}
        >
          <button
            onClick={(e) => { e.stopPropagation(); onToggleDone(); }}
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
            className={
              "h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 " +
              (isOpen ? "rotate-180" : "")
            }
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
              <div className="border-t border-border/50 px-4 py-4 ml-7 text-sm text-muted-foreground leading-relaxed answer-content">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      const isInline = !match && !String(children).includes("\n");
                      if (isInline) {
                        return (
                          <code className="bg-muted/80 rounded px-1 py-0.5 text-xs font-mono" {...props}>
                            {children}
                          </code>
                        );
                      }
                      return (
                        <pre className="bg-muted/80 rounded-lg p-4 overflow-x-auto text-xs font-mono my-3">
                          <code className={className} {...props}>
                            {children}
                          </code>
                        </pre>
                      );
                    },
                    a({ href, children }) {
                      return (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan hover:underline"
                        >
                          {children}
                        </a>
                      );
                    },
                    table({ children }) {
                      return (
                        <div className="overflow-x-auto my-3">
                          <table className="min-w-full border-collapse border border-border/50 text-xs">
                            {children}
                          </table>
                        </div>
                      );
                    },
                    th({ children }) {
                      return (
                        <th className="border border-border/50 px-3 py-1.5 bg-muted/50 text-left font-semibold">
                          {children}
                        </th>
                      );
                    },
                    td({ children }) {
                      return (
                        <td className="border border-border/50 px-3 py-1.5">
                          {children}
                        </td>
                      );
                    },
                    ul({ children }) {
                      return <ul className="list-disc pl-5 my-2 space-y-0.5">{children}</ul>;
                    },
                    ol({ children }) {
                      return <ol className="list-decimal pl-5 my-2 space-y-0.5">{children}</ol>;
                    },
                    p({ children }) {
                      return <p className="my-1.5">{children}</p>;
                    },
                    strong({ children }) {
                      return <strong className="font-semibold text-foreground/90">{children}</strong>;
                    },
                    h1({ children }) {
                      return <h1 className="text-base font-bold mt-4 mb-2 text-foreground/90">{children}</h1>;
                    },
                    h2({ children }) {
                      return <h2 className="text-sm font-bold mt-3 mb-1.5 text-foreground/90">{children}</h2>;
                    },
                    h3({ children }) {
                      return <h3 className="text-sm font-semibold mt-3 mb-1 text-foreground/85">{children}</h3>;
                    },
                    hr() {
                      return <hr className="my-3 border-border/50" />;
                    },
                    blockquote({ children }) {
                      return (
                        <blockquote className="border-l-2 border-cyan/50 pl-3 my-2 italic text-muted-foreground/80">
                          {children}
                        </blockquote>
                      );
                    },
                  }}
                >
                  {item.answer}
                </ReactMarkdown>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
