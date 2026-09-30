import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, ArrowUpRight } from 'lucide-react';
import { useIntersection } from '../../hooks/useIntersection';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { profile } from '../../data/profile';
import { SectionRule } from '../ui/SectionMotion';

const SOCIALS = [
  { label: 'LinkedIn', href: profile.social.linkedin, display: 'linkedin.com/in/jaeseongwi' },
  { label: 'Notion', href: profile.social.notion, display: '프로젝트 기록' },
  {
    label: 'GitHub',
    href: profile.social.github,
    display: 'github.com/jaeseong09',
  },
  {
    label: 'Velog',
    href: profile.social.velog,
    display: 'velog.io/@wijaeseong',
  },
  {
    label: 'Naver Blog',
    href: profile.social.naverBlog,
    display: 'blog.naver.com/cadoim',
  },
];

export function Contact() {
  const [copied, setCopied] = useState(false);
  const { ref, isVisible } = useIntersection();
  const reducedMotion = usePrefersReducedMotion();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API 실패 시 무시
    }
  };

  const anim = (delay = 0) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: isVisible ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.55, ease: 'easeOut' as const, delay },
        };

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="section section--animated"
    >
      <SectionRule />
      <div className="container">
        {/* 섹션 헤더 */}
        <div className="section-grid" style={{ marginBottom: 'var(--space-4xl)' }}>
          <motion.p {...anim(0)} className="section-label">
            ── 06
            <br />
            Contact
          </motion.p>

          <motion.h2
            {...anim(0.05)}
            className="editorial-h1"
            style={{
              fontSize: 'clamp(42px, 6.6vw, 96px)',
              letterSpacing: '-0.035em',
            }}
          >
            Let's work
            <br />
            together.
          </motion.h2>
        </div>

        {/* 이메일 블록 — 모바일에서 줄바꿈 안정적으로 */}
        <motion.div
          {...anim(0.15)}
          className="section-grid"
          style={{ marginBottom: 'var(--space-4xl)' }}
        >
          <p className="section-label">Email ──</p>
          <div className="flex flex-col gap-5 min-w-0">
            <button
              onClick={handleCopy}
              className="group inline-flex items-start min-w-0 max-w-full text-left transition-colors duration-300"
              style={{ color: 'var(--text-primary)' }}
              aria-label="이메일 주소 복사"
            >
              <span
                className="min-w-0 font-[300] tracking-[-0.025em] leading-[1.2]"
                style={{
                  fontSize: 'clamp(26px, 4.5vw, 54px)',
                  borderBottom: '1px solid var(--border-default)',
                  paddingBottom: '6px',
                  wordBreak: 'keep-all',
                  overflowWrap: 'anywhere',
                }}
              >
                {profile.email.split('@')[0]}<wbr />@{profile.email.split('@')[1]}
              </span>
            </button>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[14px] tracking-[0.12em] uppercase">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 max-w-full pb-0.5 transition-colors duration-200"
                style={{
                  color: copied ? 'var(--point-blue)' : 'var(--text-muted)',
                  borderBottom: copied
                    ? '1px solid var(--point-blue)'
                    : '1px solid var(--border-default)',
                }}
              >
                {copied ? (
                  <>
                    <Check size={14} strokeWidth={1.5} className="shrink-0" />
                    Copied to clipboard
                  </>
                ) : (
                  <>
                    <Copy size={14} strokeWidth={1.5} className="shrink-0" />
                    Copy address
                  </>
                )}
              </button>
              <span style={{ color: 'var(--text-subtle)' }}>·</span>
              <span style={{ color: 'var(--text-subtle)' }}>
                응답까지 영업일 기준 1–2일
              </span>
            </div>
          </div>
        </motion.div>

        {/* 소셜 — 라인 리스트 */}
        <motion.div {...anim(0.25)} className="section-grid">
          <p className="section-label">Elsewhere ──</p>
          <div
            className="min-w-0"
            style={{
              borderTop: '1px solid var(--border-default)',
              borderBottom: '1px solid var(--border-default)',
            }}
          >
            {SOCIALS.map(({ label, href, display }, idx) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[minmax(0,1fr)_auto] md:grid-cols-[minmax(100px,120px)_minmax(0,1fr)_auto] items-center transition-colors duration-300 gap-x-6 gap-y-2"
                style={{
                  paddingTop: 'var(--space-lg)',
                  paddingBottom: 'var(--space-lg)',
                  borderTop:
                    idx === 0 ? 'none' : '1px solid var(--border-subtle)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '';
                }}
              >
                <span
                  className="col-start-1 row-start-1 font-mono text-[12px] tracking-[0.2em] uppercase"
                  style={{ color: 'var(--text-subtle)' }}
                >
                  {label}
                </span>
                <span
                  className="col-start-1 row-start-2 md:col-start-2 md:row-start-1 min-w-0 text-[17px] md:text-[19px] font-mono"
                  style={{ color: 'inherit', overflowWrap: 'anywhere' }}
                >
                  {display}
                </span>
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.25}
                  className="col-start-2 row-start-2 md:col-start-3 md:row-start-1 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ color: 'var(--text-muted)' }}
                />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
