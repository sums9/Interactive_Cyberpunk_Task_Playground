import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Clock, Flag, Tag } from 'lucide-react';
import type { Priority } from '@/types';
import { PRIORITY_CONFIG } from '@/types';

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (data: { title: string; estimatedTime: number; priority: Priority; category: string }) => void;
}

const PRIORITIES: Priority[] = ['olympian', 'hero', 'mortal'];
const TIME_PRESETS = [5, 15, 30, 60, 90];

export function SummonModal({ open, onClose, onAdd }: Props) {
  const [title, setTitle] = useState('');
  const [estimatedTime, setEstimatedTime] = useState(15);
  const [priority, setPriority] = useState<Priority>('hero');
  const [category, setCategory] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTitle('');
      setEstimatedTime(15);
      setPriority('hero');
      setCategory('');
      const t = setTimeout(() => titleRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [open]);

  const submit = () => {
    if (!title.trim()) return;
    onAdd({ title, estimatedTime, priority, category });
    onClose();
  };

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
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-gold-500/30 bg-[#0a0e1a]/95 p-6 temple-glow backdrop-blur-xl"
            initial={{ scale: 0.85, y: 24, opacity: 0, rotateX: -10 }}
            animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.9, y: 16, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            style={{ transformPerspective: 800 }}
          >
            {/* corner ornaments */}
            <div className="pointer-events-none absolute left-0 top-0 h-16 w-16 rounded-tl-2xl border-l-2 border-t-2 border-gold-500/50" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-16 w-16 rounded-br-2xl border-b-2 border-r-2 border-gold-500/50" />

            {/* header */}
            <div className="mb-1 flex items-center justify-between">
              <h2 className="font-cinzel text-sm font-bold uppercase tracking-[0.25em] text-gold-gradient">
                Summon a Labor
              </h2>
              <button
                onClick={onClose}
                className="grid h-8 w-8 place-items-center rounded-lg border border-marble-400/20 text-marble-300/60 transition hover:border-wine-500/50 hover:text-wine-400"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mb-5 font-cormorant text-sm italic text-marble-300/40">
              Consult the oracle. Declare your task.
            </p>

            {/* Title */}
            <label className="mb-1.5 block font-marcellus text-[10px] uppercase tracking-widest text-gold-300/50">
              Labor
            </label>
            <input
              ref={titleRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              placeholder="What labor must be conquered?"
              maxLength={80}
              className="mb-5 w-full rounded-xl border border-marble-400/15 bg-marble-900/40 px-4 py-3 font-cormorant text-base text-marble-100 placeholder:text-marble-300/25 outline-none transition focus:border-gold-500/50 focus:bg-gold-500/5"
            />

            {/* Time */}
            <label className="mb-1.5 flex items-center gap-1.5 font-marcellus text-[10px] uppercase tracking-widest text-gold-300/50">
              <Clock className="h-3 w-3" /> Estimated minutes
            </label>
            <div className="mb-5 flex flex-wrap gap-2">
              {TIME_PRESETS.map((t) => (
                <button
                  key={t}
                  onClick={() => setEstimatedTime(t)}
                  className={`rounded-lg border px-3 py-1.5 font-cinzel text-xs transition ${
                    estimatedTime === t
                      ? 'border-gold-500/50 bg-gold-500/15 text-gold-200'
                      : 'border-marble-400/15 bg-marble-900/30 text-marble-300/50 hover:border-marble-400/30'
                  }`}
                >
                  {t}m
                </button>
              ))}
              <input
                type="number"
                min={1}
                max={600}
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(Math.max(1, Math.min(600, Number(e.target.value) || 1)))}
                className="w-20 rounded-lg border border-marble-400/15 bg-marble-900/30 px-3 py-1.5 font-cinzel text-xs text-marble-100 outline-none focus:border-gold-500/50"
              />
            </div>

            {/* Priority — divine tier */}
            <label className="mb-1.5 flex items-center gap-1.5 font-marcellus text-[10px] uppercase tracking-widest text-gold-300/50">
              <Flag className="h-3 w-3" /> Divine tier
            </label>
            <div className="mb-5 grid grid-cols-3 gap-2">
              {PRIORITIES.map((p) => {
                const cfg = PRIORITY_CONFIG[p];
                const active = priority === p;
                return (
                  <button
                    key={p}
                    onClick={() => setPriority(p)}
                    className={`relative overflow-hidden rounded-xl border px-2 py-2.5 text-center transition ${
                      active ? 'text-white' : 'text-marble-300/40 hover:text-marble-100/70'
                    }`}
                    style={{
                      borderColor: active ? cfg.border : 'rgba(184,169,143,0.1)',
                      background: active ? cfg.glow : 'rgba(20,20,30,0.4)',
                      boxShadow: active ? `0 0 20px ${cfg.glow}` : 'none',
                    }}
                  >
                    <div className="mb-0.5 text-base">{cfg.symbol}</div>
                    <div className="font-cinzel text-[10px] font-semibold uppercase tracking-wider">
                      {cfg.label}
                    </div>
                    <div className="font-cormorant text-[9px] italic opacity-60">{cfg.god}</div>
                  </button>
                );
              })}
            </div>

            {/* Category */}
            <label className="mb-1.5 flex items-center gap-1.5 font-marcellus text-[10px] uppercase tracking-widest text-gold-300/50">
              <Tag className="h-3 w-3" /> Domain <span className="text-marble-300/30">(optional)</span>
            </label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              placeholder="e.g. forge, quest, council"
              maxLength={24}
              className="mb-6 w-full rounded-xl border border-marble-400/15 bg-marble-900/40 px-4 py-3 font-cormorant text-base text-marble-100 placeholder:text-marble-300/25 outline-none transition focus:border-aegean-400/50 focus:bg-aegean-500/5"
            />

            <button
              onClick={submit}
              disabled={!title.trim()}
              className="group flex w-full items-center justify-center gap-2 rounded-xl border border-gold-500/40 bg-gradient-to-r from-gold-500/20 to-aegean-500/20 px-4 py-3 font-cinzel text-sm font-bold uppercase tracking-widest text-gold-100 transition enabled:hover:from-gold-500/30 enabled:hover:to-aegean-500/30 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus className="h-4 w-4 transition group-enabled:group-hover:rotate-90" />
              Inscribe Labor
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
