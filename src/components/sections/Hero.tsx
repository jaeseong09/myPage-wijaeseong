import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { profile } from '../../data/profile';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import '../../styles/hero-motion.css';

function RollingLabel({ children }: { children: string }) {
  return (
    <span className="hero-link-label">
      <span className="hero-link-label-front">{children}</span>
      <span className="hero-link-label-back" aria-hidden="true">{children}</span>
    </span>
  );
}

export function Hero() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden"
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
      }}
    >
      {/* ── 상단 메타 바 (로우 1) ──────────────────────────── */}
      <div
        className="container"
        style={{ paddingTop: 'calc(var(--space-4xl) + 16px)' }}
      >
        <div
          className="flex items-center justify-between font-mono text-[10px] tracking-[0.28em] uppercase"
          style={{ color: 'var(--text-subtle)' }}
        >
          <span>Portfolio · Index 2026</span>
          <span className="hidden md:inline">Gyeongbuk SW Meister High · Class of 2028</span>
        </div>
        <div
          className="mt-4 h-px w-full"
          style={{ background: 'var(--border-subtle)' }}
        />
      </div>

      {/* ── 메인 소개 — 상단 구분선과 같은 왼쪽 기준선 ─────── */}
      <div className="container hero-main">
        <div className="hero-copy">
          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.4 }}
            className="hero-lede whitespace-pre-line"
            style={{
              color: 'var(--text-secondary)',
              letterSpacing: '-0.005em',
            }}
          >
            {profile.heroLede}
          </motion.p>

          {/* 키 타이포그래피 */}
          <h1
            className="editorial-h1"
            style={{
              fontSize: 'clamp(34px, 7.6vw, 104px)',
              minHeight: '2.16em',
            }}
          >
            <span className="sr-only">{profile.heroTitle}</span>
            {profile.heroTitle.split('\n').map((line, index) => (
              <span className="hero-title-line" aria-hidden="true" key={line}>
                <motion.span
                  className="hero-title-line-content"
                  initial={reducedMotion ? false : { y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.6,
                    delay: reducedMotion ? 0 : 0.1 + index * 0.09,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* 서브 카피 + 사이드 메타 — 타이트 그룹 */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : 0.28 }}
            className="grid md:grid-cols-[minmax(0,1fr)_auto] gap-x-16 gap-y-6 items-end"
          >
            <p
              className="hero-description whitespace-pre-line measure-prose"
              style={{ color: 'var(--text-secondary)' }}
            >
              {profile.heroSubtitle}
            </p>

            <div className="flex flex-col gap-1 font-mono text-[11px] tracking-wider md:text-right">
              <span style={{ color: 'var(--text-subtle)' }}>Based in</span>
              <span style={{ color: 'var(--text-secondary)' }}>Gyeongbuk · Pohang</span>
            </div>
          </motion.div>

          {/* CTA — 텍스트 링크 */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : 0.4 }}
            className="flex flex-wrap items-center gap-x-10 gap-y-4"
            style={{ marginTop: 'var(--space-sm)' }}
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth' });
              }}
              className="hero-link inline-flex items-center gap-2 text-base font-[500] pb-1"
              style={{
                color: 'var(--text-primary)',
                borderBottom: '1px solid var(--text-primary)',
              }}
            >
              <RollingLabel>프로젝트 보기</RollingLabel>
              <ArrowUpRight size={14} className="hero-link-icon" aria-hidden="true" />
            </a>
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-link inline-flex items-center gap-1 text-base pb-1"
              style={{
                color: 'var(--text-muted)',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <RollingLabel>GitHub</RollingLabel>
              <ArrowUpRight size={14} className="hero-link-icon" aria-hidden="true" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="hero-link inline-flex items-center gap-1 text-base pb-1"
              style={{
                color: 'var(--text-muted)',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <RollingLabel>Email</RollingLabel>
              <ArrowUpRight size={14} className="hero-link-icon" aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── 하단 푸트라인 (로우 3) ──────────────────────────
         스크롤 힌트 + 좌측 캡션을 한 줄로 고정 */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : 0.5 }}
        className="container"
        style={{ paddingBottom: 'var(--space-xl)' }}
      >
        <div
          className="flex items-end justify-between font-mono text-[10px] tracking-[0.3em] pt-5"
          style={{
            color: 'var(--text-subtle)',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--point-blue)' }}
              aria-hidden="true"
            />
            <span>— {profile.name}</span>
          </div>
          <div className="flex items-center gap-3" aria-hidden="true">
            <span>SCROLL</span>
            <ArrowDown size={12} style={{ color: 'var(--text-subtle)' }} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
