import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, ArrowUpRight } from 'lucide-react';
import { useIntersection } from '../../hooks/useIntersection';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { profile } from '../../data/profile';

const SOCIALS = [
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
      className="section"
    >
      <div className="container">
        {/* 섹션 헤더 */}
        <div className="section-grid" style={{ marginBottom: 'var(--space-4xl)' }}>
          <motion.p {...anim(0)} className="section-label">
            ── 05
            <br />
            Contact
          </motion.p>

          <motion.h2
            {...anim(0.05)}
            className="editorial-h1"
            style={{
              fontSize: 'clamp(36px, 6vw, 88px)',
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
          <div className="flex flex-col gap-5">
            <button
              onClick={handleCopy}
              className="group inline-flex items-start text-left transition-colors duration-300"
              style={{ color: 'var(--text-primary)' }}
              aria-label="이메일 주소 복사"
            >
              <span
                className="font-[300] tracking-[-0.025em] leading-[1.05]"
                style={{
                  fontSize: 'clamp(22px, 4vw, 48px)',
                  borderBottom: '1px solid var(--border-default)',
                  paddingBottom: '6px',
                  wordBreak: 'keep-all',
                  overflowWrap: 'anywhere',
                }}
              >
                {profile.email}
              </span>
            </button>
            <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.28em] uppercase">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 pb-0.5 transition-colors duration-200"
                style={{
                  color: copied ? 'var(--point-blue)' : 'var(--text-muted)',
                  borderBottom: copied
                    ? '1px solid var(--point-blue)'
                    : '1px solid var(--border-default)',
                }}
              >
                {copied ? (
                  <>
                    <Check size={12} strokeWidth={1.5} />
                    Copied to clipboard
                  </>
                ) : (
                  <>
                    <Copy size={12} strokeWidth={1.5} />
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
                className="group grid items-center transition-colors duration-300 gap-x-6"
                style={{
                  gridTemplateColumns: 'minmax(60px, 100px) minmax(0, 1fr) auto',
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
                  className="font-mono text-[10px] tracking-[0.3em] uppercase"
                  style={{ color: 'var(--text-subtle)' }}
                >
                  {label}
                </span>
                <span
                  className="text-[15px] md:text-[17px] font-mono truncate"
                  style={{ color: 'inherit' }}
                >
                  {display}
                </span>
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.25}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
