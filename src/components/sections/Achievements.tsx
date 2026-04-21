import { motion } from 'framer-motion';
import { useIntersection } from '../../hooks/useIntersection';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { achievements } from '../../data/achievements';

export function Achievements() {
  const { ref, isVisible } = useIntersection();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="achievements"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 md:py-32"
      style={{ borderTop: '1px solid var(--border-subtle)' }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs mb-4 tracking-widest"
          style={{ color: 'var(--accent-primary)' }}
        >
          04 / ACHIEVEMENTS
        </motion.p>

        <motion.h2
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="text-3xl font-[500] tracking-[-0.01em] mb-12"
          style={{ color: 'var(--text-primary)' }}
        >
          수상 · 활동
        </motion.h2>

        <div className="flex flex-col gap-3">
          {achievements.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={reducedMotion ? false : { opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + idx * 0.07 }}
              className="flex items-center gap-5 px-5 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 group"
              style={{
                background: 'var(--bg-surface)',
                border: '0.5px solid var(--border-subtle)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-strong)';
                (e.currentTarget as HTMLElement).style.background = 'var(--accent-soft)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)';
                (e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)';
              }}
            >
              <span className="text-xl select-none shrink-0" aria-hidden="true">
                {item.emoji}
              </span>
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-[500] truncate"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.title}
                </p>
                {item.description && (
                  <p
                    className="text-[12px] mt-0.5"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {item.description}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {item.project && (
                  <span
                    className="font-mono text-[10px] px-2 py-0.5 rounded"
                    style={{
                      background: 'var(--accent-soft)',
                      color: 'var(--accent-light)',
                      border: '1px solid rgba(70,190,255,0.15)',
                    }}
                  >
                    {item.project}
                  </span>
                )}
                <span
                  className="font-mono text-[11px]"
                  style={{ color: 'var(--text-subtle)' }}
                >
                  {item.year}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
