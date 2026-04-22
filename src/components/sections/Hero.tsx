import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { profile } from '../../data/profile';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const TYPING_SPEED = 32;

export function Hero() {
  const [displayed, setDisplayed] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const fullText = profile.heroTitle;

  useEffect(() => {
    if (reducedMotion) {
      setDisplayed(fullText);
      setTypingDone(true);
      return;
    }
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(timer);
        setTypingDone(true);
      }
    }, TYPING_SPEED);
    return () => clearInterval(timer);
  }, [fullText, reducedMotion]);

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
          <span className="hidden md:inline">Gyeongbuk SW Meister High · 3rd Year</span>
        </div>
        <div
          className="mt-4 h-px w-full"
          style={{ background: 'var(--border-subtle)' }}
        />
      </div>

      {/* ── 메인 그리드 (로우 2) ───────────────────────────
         그리드: 좌측 12행 런닝 인덱스 / 우측 본문 */}
      <div className="container flex items-center">
        <div
          className="grid gap-x-10 md:gap-x-16 w-full"
          style={{
            gridTemplateColumns: 'minmax(0, 1fr)',
          }}
        >
          <div
            className="md:grid md:gap-x-16"
            style={{
              gridTemplateColumns: '80px minmax(0, 1fr)',
            }}
          >
            {/* 좌측 런닝 인덱스 (세로 정렬) */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="hidden md:flex flex-col justify-between"
              style={{ paddingTop: 'var(--space-md)', paddingBottom: 'var(--space-xl)' }}
            >
              <span
                className="font-mono text-[10px] tracking-[0.3em]"
                style={{ color: 'var(--text-primary)' }}
              >
                00
              </span>
              <div
                className="w-px flex-1 my-3"
                style={{ background: 'var(--border-subtle)' }}
              />
              <span
                className="font-mono text-[10px] tracking-[0.3em]"
                style={{ color: 'var(--text-subtle)' }}
              >
                INTRO
              </span>
            </motion.div>

            {/* 우측 본문 */}
            <div className="flex flex-col" style={{ gap: 'var(--space-xl)' }}>
              {/* 리드 — 작은 인트로 문장 */}
              <motion.p
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="whitespace-pre-line text-[13px] md:text-[14px] leading-[1.6] measure-prose"
                style={{
                  color: 'var(--text-muted)',
                  letterSpacing: '-0.005em',
                }}
              >
                {profile.heroLede}
              </motion.p>

              {/* 키 타이포그래피 */}
              <h1
                className="editorial-h1 whitespace-pre-line"
                style={{
                  fontSize: 'clamp(34px, 6.2vw, 88px)',
                  minHeight: '1.04em',
                }}
              >
                {displayed}
                {!typingDone && (
                  <span
                    className="inline-block w-[3px] h-[0.82em] ml-1 align-[-0.06em] animate-pulse"
                    style={{ background: 'var(--point-blue)' }}
                    aria-hidden="true"
                  />
                )}
              </h1>

              {/* 서브 카피 + 사이드 메타 — 타이트 그룹 */}
              <motion.div
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={typingDone ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid md:grid-cols-[minmax(0,1fr)_auto] gap-x-16 gap-y-6 items-end"
              >
                <p
                  className="text-[13px] md:text-[14px] leading-[1.7] whitespace-pre-line measure-prose"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {profile.heroSubtitle}
                </p>

                <div className="flex flex-col gap-1 font-mono text-[11px] tracking-wider md:text-right">
                  <span style={{ color: 'var(--text-subtle)' }}>Based in</span>
                  <span style={{ color: 'var(--text-secondary)' }}>Gumi · Seoul</span>
                </div>
              </motion.div>

              {/* CTA — 텍스트 링크 */}
              <motion.div
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={typingDone ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="flex flex-wrap items-center gap-x-10 gap-y-4"
                style={{ marginTop: 'var(--space-sm)' }}
              >
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group inline-flex items-center gap-2 text-sm font-[500] pb-1 transition-colors duration-200"
                  style={{
                    color: 'var(--text-primary)',
                    borderBottom: '1px solid var(--text-primary)',
                  }}
                >
                  프로젝트 보기
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm pb-1 transition-colors duration-200 hover:text-[var(--text-primary)]"
                  style={{
                    color: 'var(--text-muted)',
                    borderBottom: '1px solid var(--border-subtle)',
                  }}
                >
                  GitHub ↗
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-sm pb-1 transition-colors duration-200 hover:text-[var(--text-primary)]"
                  style={{
                    color: 'var(--text-muted)',
                    borderBottom: '1px solid var(--border-subtle)',
                  }}
                >
                  Email ↗
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 하단 푸트라인 (로우 3) ──────────────────────────
         스크롤 힌트 + 좌측 캡션을 한 줄로 고정 */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={typingDone ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
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
              className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: 'var(--point-blue)' }}
              aria-hidden="true"
            />
            <span>— {profile.name}</span>
          </div>
          <div className="flex items-center gap-3" aria-hidden="true">
            <span>SCROLL</span>
            <motion.div
              animate={reducedMotion ? {} : { y: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown size={12} style={{ color: 'var(--text-subtle)' }} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
