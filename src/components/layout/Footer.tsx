import { profile } from '../../data/profile';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-10"
      style={{ borderTop: '1px solid var(--border-subtle)' }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="flex flex-col gap-1">
          <span
            className="font-mono text-[10px] tracking-[0.3em]"
            style={{ color: 'var(--text-subtle)' }}
          >
            ── COLOPHON
          </span>
          <p
            className="font-mono text-[11px] tracking-wider"
            style={{ color: 'var(--text-muted)' }}
          >
            © {year} {profile.name}. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col md:items-end gap-1">
          <span
            className="font-mono text-[10px] tracking-[0.3em]"
            style={{ color: 'var(--text-subtle)' }}
          >
            BUILT WITH ──
          </span>
          <p
            className="font-mono text-[11px] tracking-wider"
            style={{ color: 'var(--text-muted)' }}
          >
            React · Vite · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
