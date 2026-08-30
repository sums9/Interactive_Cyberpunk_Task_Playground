import { useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { Clock, X } from 'lucide-react';
import type { Task } from '@/types';
import { PRIORITY_CONFIG } from '@/types';

interface Props {
  task: Task;
  index: number;
  onMove: (id: string, x: number, y: number) => void;
  onDestroy: (id: string, screenX: number, screenY: number) => void;
}

export function LaborTablet({ task, index, onMove, onDestroy }: Props) {
  const cfg = PRIORITY_CONFIG[task.priority];
  const controls = useDragControls();
  const ref = useRef<HTMLDivElement>(null);
  const phase = (index * 1.7) % (Math.PI * 2);

  const handleDestroy = () => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    onDestroy(task.id, rect.left + rect.width / 2, rect.top + rect.height / 2);
  };

  return (
    <motion.div
      ref={ref}
      drag
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0.12}
      onDragEnd={(_, info) => {
        const canvas = ref.current?.parentElement;
        if (!canvas) return;
        const cw = canvas.clientWidth;
        const ch = canvas.clientHeight;
        let nx = task.x + (info.offset.x / cw) * 100;
        let ny = task.y + (info.offset.y / ch) * 100;
        nx = Math.max(6, Math.min(88, nx));
        ny = Math.max(8, Math.min(86, ny));
        onMove(task.id, nx, ny);
      }}
      initial={{ scale: 0, opacity: 0, rotate: -12 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      exit={{ scale: 0, opacity: 0, rotate: 20, transition: { duration: 0.25 } }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className="absolute z-10 touch-none select-none"
      style={{ left: `${task.x}%`, top: `${task.y}%` }}
    >
      {/* bobbing wrapper */}
      <motion.div
        animate={{ y: [0, -cfg.bobDistance, 0] }}
        transition={{ duration: cfg.floatSpeed, repeat: Infinity, ease: 'easeInOut', delay: phase }}
      >
        {/* wobble */}
        <motion.div
          animate={{ rotate: [-1.5, 1.5, -1.5] }}
          transition={{ duration: cfg.floatSpeed * 1.6, repeat: Infinity, ease: 'easeInOut', delay: phase }}
          onPointerDown={(e) => controls.start(e)}
          className="group relative w-44 cursor-grab active:cursor-grabbing"
        >
          {/* aura */}
          <motion.div
            className="pointer-events-none absolute -inset-3 rounded-2xl"
            style={{ background: `radial-gradient(circle, ${cfg.glow} 0%, transparent 70%)` }}
            animate={{ opacity: [0.5, 0.85, 0.5], scale: [0.96, 1.04, 0.96] }}
            transition={{ duration: cfg.floatSpeed, repeat: Infinity, ease: 'easeInOut', delay: phase }}
          />

          {/* marble tablet */}
          <div
            className="relative overflow-hidden rounded-xl border bg-gradient-to-b from-[#1a1a24]/90 to-[#14141e]/90 p-3.5 backdrop-blur-xl"
            style={{
              borderColor: cfg.border,
              boxShadow: `0 0 24px ${cfg.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`,
            }}
          >
            {/* top gold line */}
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${cfg.aura}, transparent)` }}
            />

            {/* god symbol + category */}
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <motion.span
                  className="grid h-5 w-5 place-items-center rounded-full text-[10px]"
                  style={{ background: cfg.glow, color: cfg.text }}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {cfg.symbol}
                </motion.span>
                <span
                  className="font-cinzel text-[9px] font-semibold uppercase tracking-widest"
                  style={{ color: cfg.text }}
                >
                  {cfg.label}
                </span>
              </div>
              <span className="rounded-full border border-marble-400/20 bg-marble-500/5 px-2 py-0.5 font-marcellus text-[9px] uppercase tracking-wider text-marble-300/50">
                {task.category}
              </span>
            </div>

            {/* title */}
            <p className="mb-3 min-h-[2.5rem] font-cormorant text-base font-medium leading-snug text-marble-100">
              {task.title}
            </p>

            {/* footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 font-marcellus text-[11px] text-marble-300/50">
                <Clock className="h-3 w-3" />
                {task.estimatedTime}m
              </div>

              {/* destroy button */}
              <motion.button
                onClick={handleDestroy}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                className="grid h-7 w-7 place-items-center rounded-lg border transition"
                style={{ borderColor: cfg.border, background: cfg.glow }}
                aria-label="Conquer labor"
              >
                <X className="h-3.5 w-3.5 text-white" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
