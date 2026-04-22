import { motion } from 'framer-motion';
import { useIntersection } from '../../hooks/useIntersection';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { profile } from '../../data/profile';

const STATS = [
  { value: '3+', label: 'Team projects shipped' },
  { value: '02', label: 'Awards · Exhibits' },
  { value: '26', label: 'Expected graduation' },
];

export function About() {
  const { ref, isVisible } = useIntersection();
  const reducedMotion = usePrefersReducedMotion();

  const anim = (delay = 0) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: isVisible ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.6, ease: 'easeOut' as const, delay },
        };

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="section"
    >
      <div className="container">
        {/* 섹션 헤더 */}
        <div className="section-grid" style={{ marginBottom: 'var(--space-4xl)' }}>
          <motion.p {...anim(0)} className="section-label">
            ── 01
            <br />
            About
          </motion.p>

          <motion.h2 {...anim(0.1)} style={{ color: '#b0b0b0' }} className="editorial-h2">
            프론트엔드 개발자{' '}
            <span className="editorial-h2">위재성</span>
            입니다.
          </motion.h2>
        </div>

        {/* 본문 — 좌측 Bio 라벨 + 우측 프로즈 */}
        <div className="section-grid" style={{ alignItems: 'start' }}>
          <motion.div {...anim(0.15)} className="flex flex-col gap-3">
            <p className="section-label">Bio</p>
            <p
              className="font-mono text-[11px] leading-[1.6]"
              style={{ color: 'var(--text-muted)' }}
            >
              {profile.tagline}
              <br />
              <span style={{ color: 'var(--text-subtle)' }}>{profile.location}</span>
            </p>
          </motion.div>

          <motion.p
            {...anim(0.2)}
            className="text-[16px] md:text-[18px] leading-[1.85] whitespace-pre-line measure-prose"
            style={{ color: 'var(--text-secondary)' }}
          >
            {profile.about}
          </motion.p>
        </div>

        {/* 스탯 — 비대칭 그리드 (2fr · 1fr · 1fr) + 수직 라인 리듬 */}
        <motion.div
          {...anim(0.3)}
          className="grid grid-cols-1 sm:grid-cols-3 mt-24 md:mt-32"
          style={{ borderTop: '1px solid var(--border-default)' }}
        >
          {STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col justify-between ${idx !== 0 ? 'border-t sm:border-t-0 sm:border-l' : ''}`}
              style={{
                paddingTop: 'var(--space-lg)',
                paddingBottom: 'var(--space-lg)',
                paddingLeft: idx === 0 ? 0 : 'var(--space-lg)',
                paddingRight: 'var(--space-lg)',
                gap: 'var(--space-2xl)',
                borderColor: 'var(--border-subtle)',
                minHeight: '140px',
              }}
            >
              <span
                className="font-mono text-[10px] tracking-[0.3em]"
                style={{ color: 'var(--text-subtle)' }}
              >
                {String(idx + 1).padStart(2, '0')} / {String(STATS.length).padStart(2, '0')}
              </span>
              <div className="flex flex-col" style={{ gap: 'var(--space-sm)' }}>
                <div
                  className="font-[300] leading-[0.9]"
                  style={{
                    color: 'var(--text-primary)',
                    fontSize:
                      idx === 0
                        ? 'clamp(42px, 5.6vw, 76px)'
                        : 'clamp(30px, 3.8vw, 54px)',
                    letterSpacing: '-0.045em',
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-[12px] leading-[1.4]"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
