import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'accent';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const styles =
    variant === 'accent'
      ? {
          background: 'transparent',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-strong)',
        }
      : {
          background: 'transparent',
          color: 'var(--text-muted)',
          border: '1px solid var(--border-subtle)',
        };

  return (
    <span
      className="inline-block font-mono text-[10px] tracking-widest px-2 py-0.5 uppercase"
      style={styles}
    >
      {children}
    </span>
  );
}
