"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "devops-interview-progress";

export function useProgress() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setCompleted(JSON.parse(stored));
    } catch {}
  }, []);

  const save = useCallback((data: Record<string, boolean>) => {
    setCompleted(data);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
  }, []);

  const toggle = useCallback(
    (id: string) => {
      save({ ...completed, [id]: !completed[id] });
    },
    [completed, save]
  );

  const isCompleted = useCallback(
    (id: string) => !!completed[id],
    [completed]
  );

  const getTopicProgress = useCallback(
    (ids: string[]) => {
      const done = ids.filter((id) => completed[id]).length;
      return { done, total: ids.length, percent: ids.length ? Math.round((done / ids.length) * 100) : 0 };
    },
    [completed]
  );

  const resetAll = useCallback(() => {
    save({});
  }, [save]);

  const totalCount = Object.values(completed).filter(Boolean).length;

  return { completed, toggle, isCompleted, getTopicProgress, resetAll, totalCount };
}
