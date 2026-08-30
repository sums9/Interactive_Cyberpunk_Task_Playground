import { motion, AnimatePresence } from 'framer-motion';
import { X, Skull, Clock, TrendingUp, Trash2, ScrollText } from 'lucide-react';
import type { DayStatsRecord } from '@/hooks/useTasks';

interface Props {
  open: boolean;
  onClose: () => void;
  todayStats: DayStatsRecord | null;
  streak: number;
  onClearCanvas: () => void;
}

export function OracleRecap({ open, onClose, todayStats, streak, onClearCanvas }: Props) {
  const destroyed = todayStats?.destroyed ?? 0;
  const minutes = todayStats?.totalEstimatedMinutes ?? 0;
  const byPriority = todayStats?.byPriority ?? { olympian: 0, hero: 0, mortal: 0 };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-gold-500/30 bg-[#0a0e1a]/95 p-6 temple-glow backdrop-blur-xl"
            initial={{ scale: 0.85, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 16, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 240, damping: 22 }}
          >
            <div className="pointer-events-none absolute left-0 top-0 h-16 w-16 rounded-tl-2xl border-l-2 border-t-2 border-gold-500/50" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-16 w-16 rounded-br-2xl border-b-2 border-r-2 border-aegean-400/50" />

            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ScrollText className="h-5 w-5 text-gold-400" />
                <h2 className="font-cinzel text-sm font-bold uppercase tracking-[0.25em] text-gold-gradient">
                  Oracle's Decree
                </h2>
              </div>
              <button
                onClick={onClose}
                className="grid h-8 w-8 place-items-center rounded-lg border border-marble-400/20 text-marble-300/60 transition hover:border-wine-500/50 hover:text-wine-400"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Big number */}
            <motion.div
              className="mb-6 flex flex-col items-center"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
            >
              <Skull className="mb-2 h-8 w-8 text-gold-400/60" />
              <div className="font-cinzel text-6xl font-black text-gold-gradient">{destroyed}</div>
              <p className="mt-1 font-marcellus text-[10px] uppercase tracking-[0.3em] text-gold-300/50">
                labors conquered
              </p>
            </motion.div>

            {/* Stats grid */}
            <div className="mb-6 grid grid-cols-2 gap-3">
              <StatCard
                icon={<Clock className="h-4 w-4 text-aegean-300" />}
                label="Time freed"
                value={`${minutes}m`}
                accent="aegean"
              />
              <StatCard
                icon={<TrendingUp className="h-4 w-4 text-gold-300" />}
                label="Streak"
                value={`${streak} day${streak === 1 ? '' : 's'}`}
                accent="gold"
              />
            </div>

            {/* Priority breakdown */}
            <div className="mb-6">
              <p className="mb-2 font-marcellus text-[10px] uppercase tracking-widest text-gold-300/40">
                Conquered by divine tier
              </p>
              <div className="space-y-2">
                <PriorityBar label="Olympian" count={byPriority.olympian} total={Math.max(1, destroyed)} color="#e8b54a" />
                <PriorityBar label="Heroic" count={byPriority.hero} total={Math.max(1, destroyed)} color="#62c6cd" />
                <PriorityBar label="Mortal" count={byPriority.mortal} total={Math.max(1, destroyed)} color="#a8324a" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-marble-400/20 bg-marble-900/30 px-4 py-3 font-cinzel text-xs font-bold uppercase tracking-widest text-marble-200/70 transition hover:bg-marble-900/50"
              >
                <ScrollText className="h-4 w-4" /> Continue
              </button>
              <button
                onClick={() => {
                  onClearCanvas();
                  onClose();
                }}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-wine-500/40 bg-wine-500/15 px-4 py-3 font-cinzel text-xs font-bold uppercase tracking-widest text-wine-400 transition hover:bg-wine-500/25"
              >
                <Trash2 className="h-4 w-4" /> Fresh start
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StatCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: 'aegean' | 'gold';
}) {
  const ring =
    accent === 'aegean'
      ? 'border-aegean-400/30 bg-aegean-500/5'
      : 'border-gold-500/30 bg-gold-500/5';
  return (
    <div className={`flex items-center gap-3 rounded-xl border ${ring} px-4 py-3 backdrop-blur-md`}>
      {icon}
      <div>
        <p className="font-cinzel text-lg font-bold text-marble-100">{value}</p>
        <p className="font-marcellus text-[9px] uppercase tracking-widest text-marble-300/40">{label}</p>
      </div>
    </div>
  );
}

function PriorityBar({
  label,
  count,
  total,
  color,
}: {
  label: string;
  count: number;
  total: number;
  color: string;
}) {
  const pct = (count / total) * 100;
  return (
    <div className="flex items-center gap-3">
      <span className="w-16 font-cinzel text-[10px] uppercase tracking-wider text-marble-300/50">{label}</span>
      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-marble-900/60">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: color, boxShadow: `0 0 8px ${color}` }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 120, damping: 18 }}
        />
      </div>
      <span className="w-6 text-right font-cinzel text-sm font-bold text-marble-100">{count}</span>
    </div>
  );
}
