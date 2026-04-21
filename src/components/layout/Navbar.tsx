import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (!isHome) return;
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(10, 14, 26, 0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled
          ? '1px solid var(--border-subtle)'
          : '1px solid transparent',
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="font-mono text-sm tracking-widest"
          style={{ color: 'var(--accent-primary)' }}
        >
          wjs
        </Link>

        {/* 데스크탑 메뉴 */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              {isHome ? (
                <button
                  onClick={() => handleNavClick(item.href)}
                  className="text-sm transition-colors duration-200 cursor-pointer"
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
                  to={`/${item.href}`}
                  className="text-sm transition-colors duration-200"
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
          className="md:hidden p-2 rounded-lg"
          style={{ color: 'var(--text-muted)' }}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
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
            className="md:hidden overflow-hidden"
            style={{
              background: 'rgba(10, 14, 26, 0.95)',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="text-sm w-full text-left py-1"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
