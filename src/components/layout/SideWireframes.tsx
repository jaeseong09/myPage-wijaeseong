import type { CSSProperties } from 'react';
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
  return (
    <div className="side-wireframes" aria-hidden="true">
      {strands.map(({ top, angle, scale, distant }) => (
        <div
          key={top}
          className={`side-chain${distant ? ' side-chain--distant' : ''}`}
          style={{
            top,
            '--chain-angle': `${angle}deg`,
            '--chain-scale': scale,
          } as CSSProperties}
        >
          <img
            src={`${import.meta.env.BASE_URL}wire-chain.svg`}
            alt=""
            width={1600}
            height={200}
            decoding="async"
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}
