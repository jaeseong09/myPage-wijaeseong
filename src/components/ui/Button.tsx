import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

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
    'inline-flex items-center gap-2 text-[13px] font-[500] rounded-lg transition-all duration-200 cursor-pointer select-none';

  const styles =
    variant === 'primary'
      ? {
          padding: '10px 18px',
          background: 'var(--accent-strong)',
          color: '#ffffff',
        }
      : {
          padding: '10px 18px',
          background: 'transparent',
          border: '0.5px solid var(--border-default)',
          color: 'var(--text-secondary)',
        };

  const hoverClass =
    variant === 'primary'
      ? 'hover:-translate-y-px hover:brightness-110'
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
