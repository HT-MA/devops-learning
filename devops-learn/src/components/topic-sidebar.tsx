"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface Section {
  id: string;
  title: string;
  questionCount: number;
}

interface TopicSidebarProps {
  sections: Section[];
  activeSection: string | null;
  onSectionClick: (sectionId: string) => void;
  sectionProgress: Record<string, { done: number; total: number }>;
  topicColor: string;
}

export function TopicSidebar({
  sections,
  activeSection,
  onSectionClick,
  sectionProgress,
  topicColor,
}: TopicSidebarProps) {
  const filteredSections = useMemo(
    () => sections.filter((s) => s.questionCount > 0),
    [sections]
  );

  return (
    <nav className="w-56 shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-4 pr-2">
      <div className="space-y-0.5">
        {filteredSections.map((section) => {
          const isActive = activeSection === section.id;
          const progress = sectionProgress[section.id];

          return (
            <button
              key={section.id}
              onClick={() => onSectionClick(section.id)}
              className={
                "w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-150 group flex items-center gap-2 relative " +
                (isActive
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50")
              }
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="absolute left-0 w-0.5 h-5 rounded-r"
                  style={{ background: topicColor }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="flex-1 truncate">{section.title}</span>
              {progress && progress.total > 0 && (
                <span className="text-xs text-muted-foreground/70 shrink-0 tabular-nums">
                  {progress.done}/{progress.total}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
