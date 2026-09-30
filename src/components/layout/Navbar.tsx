import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Activities', href: '#experiences' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const reducedMotion = usePrefersReducedMotion();
  const isHome = location.pathname === '/' || location.pathname === '';

  useEffect(() => {
    let previous = false;
    const onScroll = () => {
      const next = window.scrollY > 40;
      if (next !== previous) {
        previous = next;
        setScrolled(next);
      }
    };
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (!isHome) return;
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth' });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-colors duration-200"
      style={{
        background: scrolled ? 'rgba(10, 10, 11, 0.96)' : 'transparent',
        borderBottom: scrolled
          ? '1px solid var(--border-subtle)'
          : '1px solid transparent',
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.28em] uppercase transition-colors duration-200 hover:text-[var(--text-primary)]"
          style={{ color: 'var(--text-secondary)' }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full transition-transform duration-300 group-hover:scale-125"
            style={{ background: 'var(--point-blue)' }}
            aria-hidden="true"
          />
          Wjs ·
          <span style={{ color: 'var(--text-muted)' }}>Portfolio</span>
        </Link>

        {/* 데스크탑 메뉴 */}
        <ul className="hidden lg:flex items-center gap-5">
          {NAV_ITEMS.map((item, idx) => (
            <li key={item.label} className="flex items-center gap-2">
              <span
                className="font-mono text-[10px]"
                style={{ color: 'var(--text-subtle)' }}
              >
                {String(idx + 1).padStart(2, '0')}
              </span>
              {isHome ? (
                <button
                  onClick={() => handleNavClick(item.href)}
                  className="text-[12px] tracking-wider transition-colors duration-200 cursor-pointer"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = 'var(--text-primary)')
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = 'var(--text-muted)')
                  }
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  to={{ pathname: '/', hash: item.href }}
                  className="text-[12px] tracking-wider transition-colors duration-200"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* 모바일 햄버거 */}
        <button
          className="lg:hidden p-3 rounded-lg"
          style={{ color: 'var(--text-muted)' }}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* 모바일 드롭다운 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' as const }}
            id="mobile-navigation"
            className="lg:hidden overflow-hidden"
            style={{
              background: 'rgba(10, 10, 11, 0.96)',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    to={{ pathname: '/', hash: item.href }}
                    onClick={(event) => {
                      setMenuOpen(false);
                      if (isHome) {
                        event.preventDefault();
                        handleNavClick(item.href);
                      }
                    }}
                    className="block text-sm w-full text-left py-3"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
