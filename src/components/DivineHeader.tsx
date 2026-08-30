import { motion } from 'framer-motion';
import { Flame, Sparkles, Trash2, BookOpen } from 'lucide-react';
import type { StreakState, DayStatsRecord } from '@/hooks/useTasks';
import type { Task } from '@/types';

interface Props {
  streak: StreakState;
  tasks: Task[];
  todayStats: DayStatsRecord | null;
  onOpenRecap: () => void;
  onClearAll: () => void;
}

export function DivineHeader({ streak, tasks, todayStats, onOpenRecap, onClearAll }: Props) {
  const totalToday = todayStats?.destroyed ?? 0;
  const energy = Math.min(100, (totalToday / 5) * 100);
  const active = tasks.length;

  return (
    <header className="sticky top-0 z-30 border-b border-gold-700/30 bg-[#0a0e1a]/80 backdrop-blur-xl">
      <div className="flex flex-wrap items-center gap-3 px-4 py-3 sm:px-8 sm:py-3.5">
        {/* Emblem */}
        <div className="flex items-center gap-2.5">
          <motion.div
            initial={{ rotate: -8, scale: 0.8 }}
            animate={{ rotate: [-6, 6, -6], scale: [0.9, 1, 0.9] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="grid h-9 w-9 place-items-center rounded-full border border-gold-500/40 bg-gold-500/10"
          >
            <Sparkles className="h-4 w-4 text-gold-300" />
          </motion.div>
          <div className="leading-tight">
            <h1 className="font-cinzel text-base font-bold tracking-[0.2em] text-gold-gradient sm:text-lg">
              OLYMPUS
            </h1>
            <p className="font-marcellus text-[9px] uppercase tracking-[0.3em] text-gold-300/40">
              tasks of the gods
            </p>
          </div>
        </div>

        <div className="flex-1" />

        {/* Streak — eternal flame */}
        <div className="flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/5 px-3 py-1.5 backdrop-blur-md">
          <motion.span
            animate={{ scale: streak.count > 0 ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 1.2, repeat: streak.count > 0 ? Infinity : 0, ease: 'easeInOut' }}
          >
            <Flame
              className="h-4 w-4 text-gold-400"
              fill={streak.count > 0 ? 'currentColor' : 'none'}
            />
          </motion.span>
          <span className="font-cinzel text-sm font-bold text-gold-200">{streak.count}</span>
          <span className="font-marcellus text-[10px] uppercase tracking-widest text-gold-300/50">
            streak
          </span>
        </div>

        {/* Divine Favor meter */}
        <div className="flex min-w-[130px] items-center gap-2 rounded-full border border-aegean-400/30 bg-aegean-500/5 px-3 py-1.5 backdrop-blur-md">
          <Sparkles className="h-4 w-4 text-aegean-300" />
          <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-aegean-950/60">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-aegean-400 via-gold-400 to-gold-200"
              initial={{ width: 0 }}
              animate={{ width: `${energy}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            />
            {energy >= 100 && (
              <motion.div
                className="absolute inset-0 rounded-full bg-gold-100/40"
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </div>
          <span className="font-marcellus text-[10px] uppercase tracking-widest text-aegean-200/70">
            {totalToday}
          </span>
        </div>

        {/* Active labors */}
        <div className="hidden items-center gap-2 rounded-full border border-marble-400/20 bg-marble-500/5 px-3 py-1.5 backdrop-blur-md sm:flex">
          <span className="font-cinzel text-sm font-bold text-marble-200">{active}</span>
          <span className="font-marcellus text-[10px] uppercase tracking-widest text-marble-300/50">
            labors
          </span>
        </div>

        {/* Oracle recap */}
        <button
          onClick={onOpenRecap}
          className="group flex items-center gap-1.5 rounded-full border border-gold-500/30 bg-gold-500/5 px-3 py-1.5 backdrop-blur-md transition hover:border-gold-500/60 hover:bg-gold-500/15"
        >
          <BookOpen className="h-4 w-4 text-gold-300 transition group-hover:scale-110" />
          <span className="font-marcellus text-[10px] uppercase tracking-widest text-gold-200/80">
            oracle
          </span>
        </button>

        {/* Clear */}
        <button
          onClick={onClearAll}
          className="group flex items-center gap-1.5 rounded-full border border-wine-500/30 bg-wine-500/5 px-3 py-1.5 backdrop-blur-md transition hover:border-wine-500/60 hover:bg-wine-500/15"
        >
          <Trash2 className="h-4 w-4 text-wine-400 transition group-hover:scale-110" />
          <span className="font-marcellus text-[10px] uppercase tracking-widest text-wine-400/80">
            banish
          </span>
        </button>
      </div>
    </header>
  );
}
