import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex h-screen flex-col items-center justify-center overflow-hidden px-4"
    >
      {/* Laurel wreath emblem */}
      <motion.div
        initial={{ scale: 0, rotate: -20, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 1.2, type: 'spring', stiffness: 80, delay: 0.2 }}
        className="mb-8"
      >
        <LaurelWreath />
      </motion.div>

      <motion.div style={{ y: titleY, opacity: titleOpacity }} className="text-center">
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-cinzel text-5xl font-black tracking-[0.15em] text-gold-gradient sm:text-7xl md:text-8xl"
        >
          OLYMPUS
        </motion.h1>
      </motion.div>

      <motion.div
        style={{ y: subtitleY, opacity: titleOpacity }}
        className="mt-4 text-center"
      >
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="font-marcellus text-base tracking-[0.4em] text-gold-200/70 sm:text-xl"
        >
          TASKS OF THE GODS
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mx-auto mt-6 max-w-md font-cormorant text-lg italic leading-relaxed text-marble-300/60 sm:text-xl"
        >
          Where mortals become legends. Conquer your daily labors and earn the
          favor of Olympus.
        </motion.p>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: scrollOpacity }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="font-marcellus text-xs uppercase tracking-[0.3em] text-gold-300/50">
          Descend to the Agora
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-5 w-5 text-gold-300/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function LaurelWreath() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      {/* Left laurel branch */}
      <g stroke="#e8b54a" strokeWidth="1.5" fill="none" opacity="0.7">
        <path d="M60 100 Q40 80 30 50 Q28 35 35 20" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i}>
            <ellipse
              cx={42 - i * 3}
              cy={88 - i * 14}
              rx="8"
              ry="3.5"
              transform={`rotate(${-50 - i * 5} ${42 - i * 3} ${88 - i * 14})`}
            />
            <ellipse
              cx={36 - i * 2}
              cy={84 - i * 14}
              rx="7"
              ry="3"
              transform={`rotate(${-30 - i * 5} ${36 - i * 2} ${84 - i * 14})`}
            />
          </g>
        ))}
      </g>
      {/* Right laurel branch (mirror) */}
      <g stroke="#e8b54a" strokeWidth="1.5" fill="none" opacity="0.7">
        <path d="M60 100 Q80 80 90 50 Q92 35 85 20" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i}>
            <ellipse
              cx={78 + i * 3}
              cy={88 - i * 14}
              rx="8"
              ry="3.5"
              transform={`rotate(${50 + i * 5} ${78 + i * 3} ${88 - i * 14})`}
            />
            <ellipse
              cx={84 + i * 2}
              cy={84 - i * 14}
              rx="7"
              ry="3"
              transform={`rotate(${30 + i * 5} ${84 + i * 2} ${84 - i * 14})`}
            />
          </g>
        ))}
      </g>
      {/* Center lightning bolt */}
      <path
        d="M58 38 L52 58 L60 58 L54 82 L70 52 L62 52 L68 38 Z"
        fill="#e8b54a"
        opacity="0.9"
        style={{ filter: 'drop-shadow(0 0 6px rgba(232,181,74,0.6))' }}
      />
    </svg>
  );
}
