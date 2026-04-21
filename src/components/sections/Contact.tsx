import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Check, GitFork, BookOpen, PenLine } from 'lucide-react';
import { useIntersection } from '../../hooks/useIntersection';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { profile } from '../../data/profile';

const SOCIALS = [
  {
    label: 'GitHub',
    href: profile.social.github,
    icon: GitFork,
    display: 'github.com/jaeseong09',
  },
  {
    label: 'Velog',
    href: profile.social.velog,
    icon: PenLine,
    display: 'velog.io/@wijaeseong',
  },
  {
    label: 'Naver Blog',
    href: profile.social.naverBlog,
    icon: BookOpen,
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
          initial: { opacity: 0, y: 24 },
          animate: isVisible ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.55, ease: 'easeOut' as const, delay },
        };

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 md:py-32"
      style={{ borderTop: '1px solid var(--border-subtle)' }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.p
          {...anim(0)}
          className="font-mono text-xs mb-4 tracking-widest"
          style={{ color: 'var(--accent-primary)' }}
        >
          05 / CONTACT
        </motion.p>

        <motion.h2
          {...anim(0.05)}
          className="text-3xl md:text-[40px] font-[500] tracking-[-0.02em] mb-3"
          style={{ color: 'var(--text-primary)' }}
        >
          Let's work together
        </motion.h2>

        <motion.p
          {...anim(0.1)}
          className="text-[15px] mb-12"
          style={{ color: 'var(--text-muted)' }}
        >
          협업·채용 관련 문의는 이메일로 연락 부탁드립니다.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* 이메일 카드 */}
          <motion.div {...anim(0.15)}>
            <button
              onClick={handleCopy}
              className="w-full flex items-center gap-4 px-6 py-5 rounded-xl text-left transition-all duration-200 group hover:-translate-y-0.5"
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
              aria-label="이메일 주소 복사"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: 'var(--accent-soft)', color: 'var(--accent-primary)' }}
              >
                {copied ? <Check size={18} /> : <Mail size={18} />}
              </div>
              <div>
                <p className="text-[11px] mb-0.5" style={{ color: 'var(--text-subtle)' }}>
                  Email
                </p>
                <p className="text-sm font-[500]" style={{ color: 'var(--text-primary)' }}>
                  {profile.email}
                </p>
              </div>
              <span
                className="ml-auto font-mono text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ color: 'var(--text-muted)' }}
              >
                {copied ? 'copied!' : 'click to copy'}
              </span>
            </button>
          </motion.div>

          {/* 소셜 링크들 */}
          <motion.div {...anim(0.2)} className="flex flex-col gap-3">
            {SOCIALS.map(({ label, href, icon: Icon, display }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 group"
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
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)' }}
                >
                  <Icon size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] mb-0.5" style={{ color: 'var(--text-subtle)' }}>
                    {label}
                  </p>
                  <p
                    className="text-sm font-mono truncate"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {display}
                  </p>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
