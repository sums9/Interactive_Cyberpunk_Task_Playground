import { useCallback, useEffect, useState } from 'react';
import type { Task, Priority } from '@/types';

const TASKS_KEY = 'olympus:tasks';
const STATS_KEY = 'olympus:stats';
const STREAK_KEY = 'olympus:streak';

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore quota errors */
  }
}

export interface StreakState {
  count: number;
  lastDay: string;
}

export interface DayStatsRecord {
  date: string;
  destroyed: number;
  totalEstimatedMinutes: number;
  byPriority: { olympian: number; hero: number; mortal: number };
}

const EMPTY_BY_PRIORITY = { olympian: 0, hero: 0, mortal: 0 };

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => read<Task[]>(TASKS_KEY, []));
  const [stats, setStats] = useState(() => read<Record<string, DayStatsRecord>>(STATS_KEY, {}));
  const [streak, setStreak] = useState<StreakState>(() =>
    read<StreakState>(STREAK_KEY, { count: 0, lastDay: '' })
  );

  useEffect(() => write(TASKS_KEY, tasks), [tasks]);
  useEffect(() => write(STATS_KEY, stats), [stats]);
  useEffect(() => write(STREAK_KEY, streak), [streak]);

  const addTask = useCallback(
    (data: { title: string; estimatedTime: number; priority: Priority; category: string }) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const task: Task = {
        id,
        title: data.title.trim(),
        estimatedTime: data.estimatedTime,
        priority: data.priority,
        category: data.category.trim() || 'unbound',
        x: 12 + Math.random() * 72,
        y: 16 + Math.random() * 64,
        createdAt: Date.now(),
        completedAt: null,
      };
      setTasks((prev) => [...prev, task]);
      return task;
    },
    []
  );

  const moveTask = useCallback((id: string, x: number, y: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, x, y } : t)));
  }, []);

  const completeTask = useCallback((id: string): Task | undefined => {
    let destroyed: Task | undefined;
    setTasks((prev) => {
      const found = prev.find((t) => t.id === id);
      if (!found) return prev;
      destroyed = found;
      return prev.filter((t) => t.id !== id);
    });
    if (!destroyed) return undefined;
    const d = destroyed;
    const day = todayStr();
    setStats((prev) => {
      const existing = prev[day] ?? {
        date: day,
        destroyed: 0,
        totalEstimatedMinutes: 0,
        byPriority: { ...EMPTY_BY_PRIORITY },
      };
      return {
        ...prev,
        [day]: {
          ...existing,
          destroyed: existing.destroyed + 1,
          totalEstimatedMinutes: existing.totalEstimatedMinutes + d.estimatedTime,
          byPriority: {
            ...existing.byPriority,
            [d.priority]: existing.byPriority[d.priority] + 1,
          },
        },
      };
    });
    return d;
  }, []);

  const clearAll = useCallback(() => setTasks([]), []);

  const bumpStreak = useCallback(() => {
    const day = todayStr();
    setStreak((prev) => {
      if (prev.lastDay === day) return prev;
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const next = prev.lastDay === yesterday ? prev.count + 1 : 1;
      return { count: next, lastDay: day };
    });
  }, []);

  return { tasks, stats, streak, addTask, moveTask, completeTask, clearAll, bumpStreak };
}
