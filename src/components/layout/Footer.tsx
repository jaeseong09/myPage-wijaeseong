import { profile } from '../../data/profile';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-8 text-center"
      style={{ borderTop: '1px solid var(--border-subtle)' }}
    >
      <p className="font-mono text-xs" style={{ color: 'var(--text-subtle)' }}>
        © {year} {profile.name}. Built with React + Vite.
      </p>
    </footer>
  );
}
