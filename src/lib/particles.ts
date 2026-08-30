import confetti from 'canvas-confetti';
import type { Priority } from '@/types';

const PRIORITY_COLORS: Record<Priority, string[]> = {
  olympian: ['#e8b54a', '#fef0c7', '#d4982e', '#ffffff'],
  hero: ['#62c6cd', '#9bdee2', '#34a3ac', '#ffffff'],
  mortal: ['#a8324a', '#d97a8e', '#8a1e36', '#ffffff'],
};

export function destroyTask(x: number, y: number, priority: Priority) {
  const colors = PRIORITY_COLORS[priority];
  const originX = x / window.innerWidth;
  const originY = y / window.innerHeight;

  confetti({
    particleCount: 50,
    spread: 70,
    startVelocity: 38,
    gravity: 0.9,
    scalar: 0.9,
    ticks: 120,
    origin: { x: originX, y: originY },
    colors,
    shapes: ['circle'],
    disableForReducedMotion: true,
  });

  confetti({
    particleCount: 24,
    spread: 360,
    startVelocity: 22,
    gravity: 0.4,
    scalar: 0.6,
    ticks: 90,
    origin: { x: originX, y: originY },
    colors,
    shapes: ['circle'],
    disableForReducedMotion: true,
  });
}

export function celebrateStreak() {
  const end = Date.now() + 800;
  const colors = ['#e8b54a', '#62c6cd', '#a8324a', '#fef0c7'];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors,
      disableForReducedMotion: true,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors,
      disableForReducedMotion: true,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
