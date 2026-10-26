import { useEffect, useRef, type CSSProperties } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import '../../styles/side-wireframes.css';

// Uneven crossings make the chains feel suspended around the page.
const strands = [
  { top: '4%', angle: -13, scale: 1, distant: false },
  { top: '16%', angle: 17, scale: 1.08, distant: true },
  { top: '19%', angle: -14, scale: 1, distant: false },
  { top: '36%', angle: -18, scale: 1.06, distant: false },
  { top: '39%', angle: 12, scale: 0.94, distant: true },
  { top: '56%', angle: 14, scale: 1, distant: false },
  { top: '59%', angle: -16, scale: 1.12, distant: true },
  { top: '77%', angle: -11, scale: 1, distant: true },
  { top: '80%', angle: 19, scale: 1.05, distant: false },
  { top: '94%', angle: -12, scale: 1, distant: false },
];

export function SideWireframes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reducedMotion) return;

    // Only animate visible strands; CSS handles the motion without frame updates.
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        (entry.target as HTMLElement).dataset.inView = String(entry.isIntersecting);
      }
    });
    container.querySelectorAll('.side-chain').forEach((chain) => observer.observe(chain));

    const updateVisibility = () => {
      container.dataset.paused = String(document.hidden);
    };
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, [reducedMotion]);

  return (
    <div ref={containerRef} className="side-wireframes" aria-hidden="true">
      {strands.map(({ top, angle, scale, distant }, index) => (
        <div
          key={top}
          className={`side-chain${distant ? ' side-chain--distant' : ''}`}
          style={{
            top,
            '--chain-angle': `${angle}deg`,
            '--chain-scale': scale,
            '--chain-duration': `${12 + (index % 3) * 2}s`,
            '--chain-delay': `${-1.2 - index * 1.7}s`,
          } as CSSProperties}
        >
          <div
            className="side-chain__track"
            style={{ backgroundImage: `url("${import.meta.env.BASE_URL}wire-chain-tile.svg")` }}
          />
        </div>
      ))}
    </div>
  );
}
