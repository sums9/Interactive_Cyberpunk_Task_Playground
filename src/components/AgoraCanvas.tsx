import { AnimatePresence } from 'framer-motion';
import type { Task } from '@/types';
import { LaborTablet } from './LaborTablet';

interface Props {
  tasks: Task[];
  onMove: (id: string, x: number, y: number) => void;
  onDestroy: (id: string, screenX: number, screenY: number) => void;
}

export function AgoraCanvas({ tasks, onMove, onDestroy }: Props) {
  return (
    <div className="relative min-h-[70vh] w-full overflow-hidden rounded-2xl border border-gold-700/20 bg-gradient-to-b from-[#0d1019]/60 to-[#06080f]/60 backdrop-blur-sm">
      {/* inner decorative border */}
      <div className="pointer-events-none absolute inset-2 rounded-xl border border-gold-700/10" />

      <div className="absolute inset-0">
        <AnimatePresence>
          {tasks.map((task, i) => (
            <LaborTablet key={task.id} task={task} index={i} onMove={onMove} onDestroy={onDestroy} />
          ))}
        </AnimatePresence>

        {tasks.length === 0 && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="font-cinzel text-sm uppercase tracking-[0.3em] text-gold-300/30">
              The Agora lies empty
            </p>
            <p className="mt-2 font-cormorant text-base italic text-marble-300/30">
              Summon a labor to begin your legend
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
