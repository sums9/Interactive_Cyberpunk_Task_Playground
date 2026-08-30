import { useEffect, useState } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleDelay: number;
}

export function OlympusBackground() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generated: Star[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      twinkleSpeed: Math.random() * 3 + 2,
      twinkleDelay: Math.random() * 5,
    }));
    setStars(generated);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Deep night sky gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1a1f35_0%,_#0d1019_45%,_#06080f_100%)]" />

      {/* Stars */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-gold-100"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `glowPulse ${star.twinkleSpeed}s ease-in-out infinite`,
            animationDelay: `${star.twinkleDelay}s`,
            boxShadow: '0 0 4px rgba(254, 240, 199, 0.6)',
          }}
        />
      ))}

      {/* Distant mountain silhouettes - layer 1 (farthest) */}
      <svg
        className="absolute bottom-0 left-0 w-full opacity-20"
        style={{ height: '35vh' }}
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
      >
        <path
          d="M0,400 L0,280 L120,200 L240,260 L360,160 L480,240 L600,180 L720,220 L840,140 L960,200 L1080,160 L1200,240 L1320,180 L1440,220 L1440,400 Z"
          fill="#0d1019"
        />
      </svg>

      {/* Closer mountains - layer 2 */}
      <svg
        className="absolute bottom-0 left-0 w-full opacity-40"
        style={{ height: '28vh' }}
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
      >
        <path
          d="M0,300 L0,200 L160,120 L320,180 L480,80 L640,160 L800,100 L960,140 L1120,80 L1280,160 L1440,120 L1440,300 Z"
          fill="#080a12"
        />
      </svg>

      {/* Temple silhouette at the base */}
      <svg
        className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-30"
        style={{ height: '20vh', width: '60vw' }}
        viewBox="0 0 400 200"
        preserveAspectRatio="xMidYMax meet"
      >
        {/* columns */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={60 + i * 50} y={60} width={14} height={120} fill="#0a0c14" />
        ))}
        {/* pediment */}
        <polygon points="50,60 200,20 350,60" fill="#0a0c14" />
        {/* base */}
        <rect x="40" y={180} width={320} height={20} fill="#0a0c14" />
        <rect x="30" y={175} width={340} height={8} fill="#0a0c14" />
      </svg>

      {/* Golden haze from the temple */}
      <div className="absolute bottom-0 left-1/2 h-64 w-[60vw] -translate-x-1/2 rounded-full bg-gold-500/10 blur-[100px]" />
    </div>
  );
}
