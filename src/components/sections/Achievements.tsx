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
      className="section"
    >
      <div className="container">
        {/* 섹션 헤더 */}
        <div
          className="section-grid"
          style={{ marginBottom: 'var(--space-3xl)', alignItems: 'end' }}
        >
          <motion.p
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="section-label"
          >
            ── 04
            <br />
            Index
          </motion.p>

          <div className="flex items-end justify-between flex-wrap gap-6">
            <motion.h2
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="editorial-h2"
            >
              수상 · 활동
            </motion.h2>
            <motion.span
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="font-mono text-[10px] tracking-[0.3em]"
              style={{ color: 'var(--text-subtle)' }}
            >
              {String(achievements.length).padStart(2, '0')} entries
            </motion.span>
          </div>
        </div>

        {/* 테이블 — 4컬럼 비율 재설정 */}
        <div
          className="hidden md:grid gap-x-10 pb-3 font-mono text-[10px] tracking-[0.3em]"
          style={{
            gridTemplateColumns: '48px minmax(0, 3fr) minmax(0, 1fr) 80px',
            color: 'var(--text-subtle)',
            borderBottom: '1px solid var(--border-default)',
          }}
        >
          <span>No.</span>
          <span>Title</span>
          <span>Context</span>
          <span className="text-right">Year</span>
        </div>

        <div>
          {achievements.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.45, delay: 0.06 + idx * 0.05 }}
              className="group transition-colors duration-300"
              style={{
                paddingTop: 'var(--space-lg)',
                paddingBottom: 'var(--space-lg)',
                borderBottom: '1px solid var(--border-subtle)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = '';
              }}
            >
              {/* 모바일 레이아웃 */}
              <div className="md:hidden flex flex-col gap-1">
                <div className="flex items-start justify-between gap-3">
                  <p
                    className="text-[15px] font-[400] leading-[1.35] tracking-[-0.01em] flex-1"
                    style={{ color: 'inherit' }}
                  >
                    {item.title}
                  </p>
                  <span
                    className="font-mono text-[11px] shrink-0"
                    style={{ color: 'var(--text-muted)', paddingTop: '2px' }}
                  >
                    {item.year}
                  </span>
                </div>
                {item.description && (
                  <p
                    className="text-[12px] leading-[1.55]"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {item.description}
                  </p>
                )}
                {item.project && (
                  <span
                    className="font-mono text-[10px] tracking-[0.2em] uppercase px-2 py-0.5 self-start mt-1"
                    style={{
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border-default)',
                    }}
                  >
                    {item.project}
                  </span>
                )}
              </div>

              {/* 데스크탑 테이블 레이아웃 */}
              <div
                className="hidden md:grid items-baseline gap-x-10"
                style={{ gridTemplateColumns: '48px minmax(0, 3fr) minmax(0, 1fr) 80px' }}
              >
                <span
                  className="font-mono text-[11px] tracking-[0.3em] self-start"
                  style={{ color: 'var(--text-subtle)' }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>

                <div className="flex flex-col" style={{ gap: 'var(--space-2xs)' }}>
                  <p
                    className="text-[18px] font-[400] leading-[1.35] tracking-[-0.01em]"
                    style={{ color: 'inherit' }}
                  >
                    {item.title}
                  </p>
                  {item.description && (
                    <p
                      className="text-[12px] leading-[1.55] measure-prose"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="flex items-start" style={{ paddingTop: '2px' }}>
                  {item.project ? (
                    <span
                      className="font-mono text-[10px] tracking-[0.2em] uppercase px-2 py-0.5"
                      style={{
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border-default)',
                      }}
                    >
                      {item.project}
                    </span>
                  ) : (
                    <span
                      className="font-mono text-[11px] tracking-widest"
                      style={{ color: 'var(--text-subtle)' }}
                    >
                      ——
                    </span>
                  )}
                </div>

                <span
                  className="font-mono text-[12px] text-right self-start"
                  style={{ color: 'var(--text-muted)', paddingTop: '2px' }}
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
