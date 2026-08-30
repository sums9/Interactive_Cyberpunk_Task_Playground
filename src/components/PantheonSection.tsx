import { motion } from 'framer-motion';

const PANTHEON = [
  { name: 'Zeus', domain: 'Sky · Thunder', tier: 'Olympian', symbol: '⚡', color: '#e8b54a' },
  { name: 'Athena', domain: 'Wisdom · Strategy', tier: 'Heroic', symbol: '🦉', color: '#62c6cd' },
  { name: 'Hermes', domain: 'Messenger · Speed', tier: 'Mortal', symbol: '✦', color: '#a8324a' },
  { name: 'Apollo', domain: 'Light · Arts', tier: 'Olympian', symbol: '☉', color: '#f5cd6e' },
  { name: 'Artemis', domain: 'Hunt · Moon', tier: 'Heroic', symbol: '☾', color: '#9bdee2' },
  { name: 'Hephaestus', domain: 'Forge · Craft', tier: 'Mortal', symbol: '⚒', color: '#d97a8e' },
];

export function PantheonSection() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-5xl px-4 py-24">
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="mb-12 text-center"
      >
        <p className="font-marcellus text-xs uppercase tracking-[0.4em] text-gold-300/40">
          The Divine Tiers
        </p>
        <h2 className="mt-2 font-cinzel text-3xl font-bold tracking-[0.1em] text-gold-gradient sm:text-4xl">
          The Pantheon
        </h2>
        <div className="mx-auto mt-4 h-px w-32 gold-divider" />
        <p className="mx-auto mt-4 max-w-lg font-cormorant text-lg italic text-marble-300/50">
          Each labor is blessed by a god. Their favor determines the urgency and
          glory of your task.
        </p>
      </motion.div>

      {/* God cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PANTHEON.map((god, i) => (
          <motion.div
            key={god.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-2xl border bg-gradient-to-b from-[#14141e]/80 to-[#0d1019]/80 p-6 backdrop-blur-md"
            style={{ borderColor: `${god.color}40` }}
          >
            {/* glow on hover */}
            <div
              className="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: `radial-gradient(circle at 50% 0%, ${god.color}20, transparent 70%)` }}
            />

            <div className="relative flex items-center gap-4">
              {/* symbol circle */}
              <div
                className="grid h-14 w-14 shrink-0 place-items-center rounded-full border text-2xl"
                style={{
                  borderColor: `${god.color}50`,
                  background: `${god.color}10`,
                  boxShadow: `0 0 16px ${god.color}30`,
                }}
              >
                {god.symbol}
              </div>

              <div>
                <h3 className="font-cinzel text-lg font-bold tracking-wide" style={{ color: god.color }}>
                  {god.name}
                </h3>
                <p className="font-cormorant text-sm italic text-marble-300/50">{god.domain}</p>
                <span
                  className="mt-1 inline-block rounded-full border px-2 py-0.5 font-marcellus text-[9px] uppercase tracking-widest"
                  style={{ borderColor: `${god.color}40`, color: god.color }}
                >
                  {god.tier} tier
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
