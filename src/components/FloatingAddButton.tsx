import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface Props {
  onClick: () => void;
}

export function FloatingAddButton({ onClick }: Props) {
  return (
    <motion.button
      onClick={onClick}
      className="group fixed bottom-6 right-6 z-40 grid h-16 w-16 place-items-center rounded-full border border-gold-500/40 bg-gradient-to-br from-gold-500/25 to-aegean-500/25 backdrop-blur-xl"
      initial={{ scale: 0, rotate: -90 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.3 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      aria-label="Summon a labor"
    >
      {/* pulsing aura rings */}
      <motion.span
        className="absolute inset-0 rounded-full border border-gold-500/40"
        animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
      />
      <motion.span
        className="absolute inset-0 rounded-full border border-aegean-400/30"
        animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.6 }}
      />
      <Plus className="h-7 w-7 text-gold-100 transition group-hover:rotate-90" />
    </motion.button>
  );
}
