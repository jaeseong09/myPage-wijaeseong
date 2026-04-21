import { motion } from 'framer-motion';
import { useIntersection } from '../../hooks/useIntersection';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { profile } from '../../data/profile';

const STATS = [
  { value: '3+', label: '팀 프로젝트' },
  { value: '2', label: '수상 / 전시' },
  { value: '2026', label: '졸업 예정' },
];

export function About() {
  const { ref, isVisible } = useIntersection();
  const reducedMotion = usePrefersReducedMotion();

  const anim = (delay = 0) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 32 },
          animate: isVisible ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.6, ease: 'easeOut' as const, delay },
        };

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 md:py-32"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.p
          {...anim(0)}
          className="font-mono text-xs mb-4 tracking-widest"
          style={{ color: 'var(--accent-primary)' }}
        >
          01 / ABOUT
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* 텍스트 */}
          <div>
            <motion.h2
              {...anim(0.1)}
              className="text-3xl md:text-[36px] font-[500] tracking-[-0.01em] leading-[1.3] mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              프론트엔드 개발자
              <br />
              <span style={{ color: 'var(--accent-primary)' }}>위재성</span>입니다.
            </motion.h2>

            <motion.p
              {...anim(0.2)}
              className="text-[15px] leading-[1.8] whitespace-pre-line"
              style={{ color: 'var(--text-secondary)' }}
            >
              {profile.about}
            </motion.p>
          </div>

          {/* 스탯 카드들 */}
          <motion.div {...anim(0.25)} className="grid grid-cols-3 gap-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center py-6 rounded-xl text-center transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'var(--bg-surface)',
                  border: '0.5px solid var(--border-subtle)',
                }}
              >
                <span
                  className="font-mono text-2xl font-[500] mb-1"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-[11px] leading-[1.4] text-center px-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
