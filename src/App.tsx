import { useCallback, useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { OlympusBackground } from '@/components/OlympusBackground';
import { HeroSection } from '@/components/HeroSection';
import { DivineHeader } from '@/components/DivineHeader';
import { AgoraCanvas } from '@/components/AgoraCanvas';
import { SummonModal } from '@/components/SummonModal';
import { OracleRecap } from '@/components/OracleRecap';
import { FloatingAddButton } from '@/components/FloatingAddButton';
import { PantheonSection } from '@/components/PantheonSection';
import { useTasks } from '@/hooks/useTasks';
import { destroyTask, celebrateStreak } from '@/lib/particles';

function App() {
  const { tasks, stats, streak, addTask, moveTask, completeTask, clearAll, bumpStreak } = useTasks();
  const [addOpen, setAddOpen] = useState(false);
  const [recapOpen, setRecapOpen] = useState(false);

  const today = new Date().toISOString().slice(0, 10);
  const todayStats = stats[today] ?? null;

  // Scroll progress bar at top
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const handleAdd = useCallback(
    (data: { title: string; estimatedTime: number; priority: 'olympian' | 'hero' | 'mortal'; category: string }) => {
      addTask(data);
    },
    [addTask]
  );

  const handleDestroy = useCallback(
    (id: string, screenX: number, screenY: number) => {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;
      destroyTask(screenX, screenY, task.priority);
      const beforeCount = stats[today]?.destroyed ?? 0;
      completeTask(id);
      bumpStreak();
      const afterCount = beforeCount + 1;
      if (afterCount > 0 && afterCount % 5 === 0) {
        setTimeout(celebrateStreak, 150);
      }
    },
    [tasks, stats, today, completeTask, bumpStreak]
  );

  // Spacebar opens add modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        const target = e.target as HTMLElement;
        const tag = target?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || target?.isContentEditable) return;
        e.preventDefault();
        setAddOpen((v) => !v);
      }
      if (e.key === 'Escape') {
        setAddOpen(false);
        setRecapOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#06080f] font-marcellus text-marble-100">
      <OlympusBackground />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-0.5 origin-left bg-gradient-to-r from-gold-400 via-aegean-400 to-gold-200"
        style={{ scaleX: progress }}
      />

      {/* Hero */}
      <HeroSection />

      {/* Sticky header appears after hero */}
      <DivineHeader
        streak={streak}
        tasks={tasks}
        todayStats={todayStats}
        onOpenRecap={() => setRecapOpen(true)}
        onClearAll={clearAll}
      />

      {/* Agora — task canvas */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-center"
        >
          <p className="font-marcellus text-xs uppercase tracking-[0.4em] text-gold-300/40">
            The Agora
          </p>
          <h2 className="mt-2 font-cinzel text-3xl font-bold tracking-[0.1em] text-gold-gradient sm:text-4xl">
            Your Labors Await
          </h2>
          <div className="mx-auto mt-4 h-px w-32 gold-divider" />
          <p className="mx-auto mt-4 max-w-lg font-cormorant text-lg italic text-marble-300/50">
            Drag the tablets across the sacred grounds. Strike the mark to conquer
            each labor and claim its glory.
          </p>
        </motion.div>

        <AgoraCanvas tasks={tasks} onMove={moveTask} onDestroy={handleDestroy} />

        <p className="mt-6 text-center font-marcellus text-xs uppercase tracking-[0.3em] text-gold-300/30">
          Press spacebar or tap the sigil to summon a new labor
        </p>
      </section>

      {/* Pantheon showcase */}
      <PantheonSection />

      {/* Footer */}
      <footer className="relative z-10 border-t border-gold-700/20 px-4 py-12 text-center">
        <div className="mx-auto mb-4 h-px w-48 gold-divider" />
        <p className="font-cinzel text-sm font-bold tracking-[0.3em] text-gold-gradient">OLYMPUS</p>
        <p className="mt-2 font-cormorant text-sm italic text-marble-300/30">
          For mortals who dare to be legendary
        </p>
      </footer>

      <FloatingAddButton onClick={() => setAddOpen(true)} />

      <SummonModal open={addOpen} onClose={() => setAddOpen(false)} onAdd={handleAdd} />

      <OracleRecap
        open={recapOpen}
        onClose={() => setRecapOpen(false)}
        todayStats={todayStats}
        streak={streak.count}
        onClearCanvas={clearAll}
      />
    </div>
  );
}

export default App;
