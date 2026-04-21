import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, GitFork, Play, ChevronDown, Trophy } from 'lucide-react';
import { folioDetail } from '../../data/projects';
import { Badge } from '../../components/ui/Badge';

const SECTIONS = [
  { id: 'overview', label: '개요' },
  { id: 'roles', label: '담당 역할' },
  { id: 'lessons', label: '배운 점' },
];

function RoleAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {folioDetail.roles.map((role, idx) => (
        <div
          key={idx}
          className="rounded-xl overflow-hidden"
          style={{ border: '0.5px solid var(--border-subtle)' }}
        >
          <button
            onClick={() => setOpen(open === idx ? null : idx)}
            className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-200"
            style={{
              background: open === idx ? 'var(--accent-soft)' : 'var(--bg-surface)',
            }}
            aria-expanded={open === idx}
          >
            <div className="flex items-center gap-3">
              <span
                className="font-mono text-[11px] w-5 shrink-0"
                style={{ color: 'var(--accent-primary)' }}
              >
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span
                className="text-sm font-[500]"
                style={{ color: open === idx ? 'var(--accent-primary)' : 'var(--text-primary)' }}
              >
                {role.title}
              </span>
            </div>
            <motion.div animate={{ rotate: open === idx ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
            </motion.div>
          </button>

          <AnimatePresence>
            {open === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' as const }}
                className="overflow-hidden"
              >
                <div
                  className="px-5 py-4"
                  style={{ borderTop: '1px solid var(--border-subtle)' }}
                >
                  <p
                    className="text-[13px] leading-[1.8] mb-4"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {role.problem}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {role.solution.map((s, si) => (
                      <li key={si} className="flex gap-2 text-[13px] leading-[1.7]">
                        <span style={{ color: 'var(--accent-primary)' }} className="shrink-0 mt-0.5">
                          →
                        </span>
                        <span style={{ color: 'var(--text-secondary)' }}>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export function Folio() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="min-h-screen pt-20 pb-24">
      {/* 헤더 히어로 */}
      <div
        className="py-16 md:py-20"
        style={{ borderBottom: '1px solid var(--border-subtle)' }}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm mb-8 transition-colors duration-200 hover:text-[var(--text-primary)]"
            style={{ color: 'var(--text-muted)' }}
          >
            <ArrowLeft size={15} />
            돌아가기
          </button>

          {/* 썸네일 — layoutId로 카드에서 이어짐 */}
          <motion.div
            layoutId="project-folio-thumb"
            className="w-full aspect-[21/9] rounded-2xl mb-10 flex items-center justify-center overflow-hidden"
            style={{ background: 'var(--bg-elevated)', border: '0.5px solid var(--border-subtle)' }}
          >
            <div className="text-center">
              <div
                className="text-6xl md:text-8xl font-[500] mb-2"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-light))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Folio
              </div>
              <div
                className="font-mono text-xs tracking-widest"
                style={{ color: 'var(--text-subtle)' }}
              >
                2026
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h1
                className="text-3xl md:text-4xl font-[500] tracking-[-0.02em] mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                {folioDetail.title}
              </h1>
              <p className="text-lg mb-6" style={{ color: 'var(--accent-light)' }}>
                {folioDetail.subtitle}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {folioDetail.tech.map((t) => (
                  <Badge key={t} variant="accent">
                    {t}
                  </Badge>
                ))}
              </div>
              {/* 수상 */}
              <div className="flex flex-wrap gap-2">
                {folioDetail.achievements.map((a) => (
                  <span
                    key={a}
                    className="inline-flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-full"
                    style={{
                      background: 'rgba(239,159,39,0.1)',
                      color: 'var(--status-warning)',
                      border: '1px solid rgba(239,159,39,0.2)',
                    }}
                  >
                    <Trophy size={11} />
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* 메타 정보 */}
            <div className="flex flex-col gap-4">
              {[
                { label: 'Role', value: folioDetail.role },
                { label: 'Team', value: folioDetail.team },
                { label: 'Duration', value: folioDetail.duration },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p
                    className="font-mono text-[10px] tracking-widest mb-1"
                    style={{ color: 'var(--text-subtle)' }}
                  >
                    {label.toUpperCase()}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {value}
                  </p>
                </div>
              ))}
              <div className="flex gap-2 mt-2">
                {folioDetail.links.github && (
                  <a
                    href={folioDetail.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-lg transition-all duration-200 hover:border-[var(--border-strong)]"
                    style={{
                      background: 'var(--bg-surface)',
                      border: '0.5px solid var(--border-default)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    <GitFork size={13} />
                    GitHub
                  </a>
                )}
                {folioDetail.links.video && (
                  <a
                    href={folioDetail.links.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-lg transition-all duration-200 hover:border-[var(--border-strong)]"
                    style={{
                      background: 'var(--bg-surface)',
                      border: '0.5px solid var(--border-default)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    <Play size={13} />
                    영상
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 본문 — sticky 목차 + 콘텐츠 */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 mt-12">
        <div className="flex gap-12">
          {/* Sticky 목차 (데스크탑) */}
          <aside className="hidden lg:block w-44 shrink-0">
            <nav className="sticky top-24 flex flex-col gap-1">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className="text-left text-[13px] px-3 py-2 rounded-lg transition-all duration-200"
                  style={{
                    color: activeSection === s.id ? 'var(--accent-primary)' : 'var(--text-muted)',
                    background: activeSection === s.id ? 'var(--accent-soft)' : 'transparent',
                  }}
                >
                  {s.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* 본문 콘텐츠 */}
          <div className="flex-1 min-w-0 flex flex-col gap-16">
            {/* 개요 */}
            <section id="overview">
              <h2
                className="text-xl font-[500] mb-5"
                style={{ color: 'var(--text-primary)' }}
              >
                개요
              </h2>
              <p
                className="text-[15px] leading-[1.85]"
                style={{ color: 'var(--text-secondary)' }}
              >
                {folioDetail.overview}
              </p>
            </section>

            {/* 담당 역할 */}
            <section id="roles">
              <h2
                className="text-xl font-[500] mb-5"
                style={{ color: 'var(--text-primary)' }}
              >
                담당한 역할
              </h2>
              <RoleAccordion />
            </section>

            {/* 배운 점 */}
            <section id="lessons">
              <h2
                className="text-xl font-[500] mb-5"
                style={{ color: 'var(--text-primary)' }}
              >
                배운 점
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {folioDetail.lessons.map((lesson, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.06 }}
                    className="px-5 py-4 rounded-xl"
                    style={{
                      background: 'var(--bg-surface)',
                      border: '0.5px solid var(--border-subtle)',
                    }}
                  >
                    <p
                      className="text-[13px] font-[500] mb-2"
                      style={{ color: 'var(--accent-light)' }}
                    >
                      {lesson.title}
                    </p>
                    <p
                      className="text-[13px] leading-[1.7]"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {lesson.body}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
