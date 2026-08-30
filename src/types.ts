export type Priority = 'olympian' | 'hero' | 'mortal';

export interface Task {
  id: string;
  title: string;
  estimatedTime: number;
  priority: Priority;
  category: string;
  x: number;
  y: number;
  createdAt: number;
  completedAt: number | null;
}

export interface DayStats {
  date: string;
  destroyed: number;
  totalEstimatedMinutes: number;
  byPriority: { olympian: number; hero: number; mortal: number };
}

export const PRIORITY_CONFIG: Record<
  Priority,
  {
    label: string;
    god: string;
    symbol: string;
    aura: string;
    glow: string;
    border: string;
    text: string;
    floatSpeed: number;
    bobDistance: number;
  }
> = {
  olympian: {
    label: 'Olympian',
    god: 'Zeus',
    symbol: '⚡',
    aura: '#e8b54a',
    glow: 'rgba(232, 181, 74, 0.5)',
    border: 'rgba(232, 181, 74, 0.6)',
    text: '#fef0c7',
    floatSpeed: 2.4,
    bobDistance: 14,
  },
  hero: {
    label: 'Heroic',
    god: 'Athena',
    symbol: '🦉',
    aura: '#62c6cd',
    glow: 'rgba(98, 198, 205, 0.45)',
    border: 'rgba(98, 198, 205, 0.55)',
    text: '#9bdee2',
    floatSpeed: 3.2,
    bobDistance: 10,
  },
  mortal: {
    label: 'Mortal',
    god: 'Hermes',
    symbol: '✦',
    aura: '#a8324a',
    glow: 'rgba(168, 50, 74, 0.4)',
    border: 'rgba(168, 50, 74, 0.5)',
    text: '#d97a8e',
    floatSpeed: 4.2,
    bobDistance: 7,
  },
};
