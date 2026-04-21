import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, GitFork, FileText } from 'lucide-react';
import { profile } from '../../data/profile';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const TYPING_SPEED = 28;

export function Hero() {
  const [displayed, setDisplayed] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const fullText = profile.heroTitle;

  // 타이핑 애니메이션
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

  // Spotlight
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reducedMotion) return;
    let rafId: number;
    const throttled = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => handleMouseMove(e));
    };
    el.addEventListener('mousemove', throttled);
    return () => {
      el.removeEventListener('mousemove', throttled);
      cancelAnimationFrame(rafId);
    };
  }, [handleMouseMove, reducedMotion]);

  // 타이핑 텍스트에서 "프론트엔드 개발자" 강조
  const renderTyped = (text: string) => {
    const highlight = '프론트엔드 개발자';
    const idx = text.indexOf(highlight);
    if (idx === -1) return <>{text}</>;
    return (
      <>
        {text.slice(0, idx)}
        <span
          style={{
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-light))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {highlight}
        </span>
        {text.slice(idx + highlight.length)}
      </>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={
        {
          '--mx': '50%',
          '--my': '50%',
        } as React.CSSProperties
      }
    >
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(600px circle at var(--mx) var(--my), rgba(70,190,255,0.08), transparent 45%)',
        }}
        aria-hidden="true"
      />

      {/* 배경 그리드 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-12 pt-32 pb-16">
        {/* 상단 배지 */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span
            className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-full"
            style={{
              background: 'var(--accent-soft)',
              border: '1px solid rgba(70,190,255,0.2)',
              color: 'var(--accent-primary)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: 'var(--accent-primary)' }}
            />
            경북소프트웨어 마이스터고 · 2026
          </span>
        </motion.div>

        {/* 메인 타이틀 */}
        <h1
          className="text-4xl md:text-5xl lg:text-[56px] font-[500] leading-[1.25] tracking-[-0.02em] mb-6 whitespace-pre-line"
          style={{ color: 'var(--text-primary)', minHeight: '6.5rem' }}
        >
          {renderTyped(displayed)}
          {!typingDone && (
            <span
              className="inline-block w-[2px] h-[1em] ml-0.5 align-middle animate-pulse"
              style={{ background: 'var(--accent-primary)', verticalAlign: 'middle' }}
              aria-hidden="true"
            />
          )}
        </h1>

        {/* 서브 카피 */}
        <motion.p
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={typingDone ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base leading-[1.8] mb-10 max-w-xl whitespace-pre-line"
          style={{ color: 'var(--text-muted)' }}
        >
          {profile.heroSubtitle}
        </motion.p>

        {/* CTA 버튼 */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          animate={typingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center gap-3"
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-[13px] font-[500] px-5 py-2.5 rounded-lg transition-all duration-200 hover:-translate-y-px"
            style={{ background: 'var(--accent-strong)', color: '#fff' }}
          >
            프로젝트 보기
          </a>
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[13px] font-[500] px-5 py-2.5 rounded-lg transition-all duration-200 hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
            style={{
              background: 'transparent',
              border: '0.5px solid var(--border-default)',
              color: 'var(--text-secondary)',
            }}
          >
            <GitFork size={14} />
            GitHub
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 text-[13px] font-[500] px-5 py-2.5 rounded-lg transition-all duration-200 hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
            style={{
              background: 'transparent',
              border: '0.5px solid var(--border-default)',
              color: 'var(--text-secondary)',
            }}
          >
            <FileText size={14} />
            Contact
          </a>
        </motion.div>
      </div>

      {/* 스크롤 다운 힌트 */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={typingDone ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] tracking-widest" style={{ color: 'var(--text-subtle)' }}>
          SCROLL
        </span>
        <motion.div
          animate={reducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} style={{ color: 'var(--text-subtle)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
