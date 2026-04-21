import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'accent';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const styles =
    variant === 'accent'
      ? {
          background: 'var(--accent-soft)',
          color: 'var(--accent-primary)',
          border: '1px solid rgba(70, 190, 255, 0.2)',
        }
      : {
          background: 'rgba(255, 255, 255, 0.04)',
          color: 'var(--text-muted)',
          border: '1px solid var(--border-subtle)',
        };

  return (
    <span
      className="inline-block font-mono text-[10px] px-2 py-0.5 rounded"
      style={styles}
    >
      {children}
    </span>
  );
}
