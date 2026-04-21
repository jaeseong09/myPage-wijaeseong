import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes, CSSProperties } from 'react';

interface ButtonBaseProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };

type ButtonAsAnchor = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button({ children, variant = 'primary', as, ...rest }: ButtonProps) {
  const base =
    'inline-flex items-center gap-2 text-[13px] font-[500] tracking-wider transition-all duration-200 cursor-pointer select-none';

  const styles: CSSProperties =
    variant === 'primary'
      ? {
          padding: '11px 20px',
          background: 'var(--text-primary)',
          color: 'var(--bg-primary)',
          border: '1px solid var(--text-primary)',
          borderRadius: '2px',
        }
      : {
          padding: '11px 20px',
          background: 'transparent',
          border: '1px solid var(--border-default)',
          color: 'var(--text-secondary)',
          borderRadius: '2px',
        };

  const hoverClass =
    variant === 'primary'
      ? 'hover:opacity-90'
      : 'hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]';

  if (as === 'a') {
    const { as: _as, variant: _v, ...anchorRest } = rest as ButtonAsAnchor;
    return (
      <a className={`${base} ${hoverClass}`} style={styles} {...anchorRest}>
        {children}
      </a>
    );
  }

  const { as: _as, variant: _v, ...buttonRest } = rest as ButtonAsButton;
  return (
    <button className={`${base} ${hoverClass}`} style={styles} {...buttonRest}>
      {children}
    </button>
  );
}
