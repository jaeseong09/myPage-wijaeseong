import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Plus } from 'lucide-react';
import { folioDetail } from '../../data/projects';
import { Badge } from '../../components/ui/Badge';

const SECTIONS = [
  { id: 'overview', label: '개요', index: '01' },
  { id: 'roles', label: '담당 역할', index: '02' },
  { id: 'lessons', label: '배운 점', index: '03' },
];

function RoleAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ borderTop: '1px solid var(--border-default)' }}>
      {folioDetail.roles.map((role, idx) => {
        const isOpen = open === idx;
        return (
          <div
            key={idx}
            style={{ borderBottom: '1px solid var(--border-subtle)' }}
          >
            <button
              onClick={() => setOpen(isOpen ? null : idx)}
              className="w-full flex items-center justify-between py-5 text-left gap-6"
              aria-expanded={isOpen}
            >
              <div className="flex items-baseline gap-6 min-w-0">
                <span
                  className="font-mono text-[11px] tracking-[0.3em] shrink-0"
                  style={{ color: 'var(--text-subtle)' }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span
                  className="text-[17px] md:text-[19px] font-[400] tracking-[-0.01em]"
                  style={{
                    color: isOpen ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}
                >
                  {role.title}
                </span>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.25 }}
                className="shrink-0"
              >
                <Plus
                  size={14}
                  strokeWidth={1.25}
                  style={{ color: isOpen ? 'var(--text-primary)' : 'var(--text-muted)' }}
                />
              </motion.div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' as const }}
                  className="overflow-hidden"
                >
                  <div
                    className="grid gap-x-6 pb-8 pt-2"
                    style={{
                      gridTemplateColumns: '56px minmax(0, 1fr)',
                    }}
                  >
                    <div />
                    <div className="measure-prose flex flex-col" style={{ gap: 'var(--space-lg)' }}>
                      <p
                        className="text-[14px] leading-[1.85]"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {role.problem}
                      </p>
                      <ul className="flex flex-col" style={{ gap: 'var(--space-sm)' }}>
                        {role.solution.map((s, si) => (
                          <li
                            key={si}
                            className="flex gap-3 text-[14px] leading-[1.75]"
                          >
                            <span
                              className="font-mono text-[11px] pt-[3px] shrink-0"
                              style={{ color: 'var(--text-subtle)' }}
                            >
                              {String(si + 1).padStart(2, '0')}
                            </span>
                            <span style={{ color: 'var(--text-secondary)' }}>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
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
    <main
      className="min-h-screen"
      style={{ paddingTop: 'var(--space-4xl)', paddingBottom: 'var(--space-4xl)' }}
    >
      {/* ── 헤더 — 카탈로그 행 + 썸네일 + 제목 ─────────── */}
      <div className="container">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-[12px] font-mono tracking-[0.28em] uppercase transition-colors duration-200 hover:text-[var(--text-primary)]"
          style={{
            color: 'var(--text-muted)',
            marginBottom: 'var(--space-2xl)',
          }}
        >
          <ArrowLeft size={13} strokeWidth={1.25} />
          Back to index
        </button>

        {/* 카탈로그 행 */}
        <div
          className="grid items-end gap-6 pb-4 font-mono text-[10px] tracking-[0.3em]"
          style={{
            gridTemplateColumns: '1fr auto auto',
            color: 'var(--text-subtle)',
            borderBottom: '1px solid var(--border-default)',
            marginBottom: 'var(--space-xl)',
          }}
        >
          <span>Case · 01</span>
          <span>{folioDetail.duration.replace(/~/, '→')}</span>
          <span>{folioDetail.year}</span>
        </div>

        {/* 썸네일 */}
        <div
          className="w-full overflow-hidden"
          style={{
            border: '1px solid var(--border-subtle)',
            marginBottom: 'var(--space-2xl)',
          }}
        >
          <img
            src={folioDetail.thumbnail}
            alt="Folio 프로젝트 썸네일"
            className="w-full object-cover"
          />
        </div>

        {/* 제목 + 메타 그리드 */}
        <div
          className="grid gap-x-10 md:gap-x-16 gap-y-10"
          style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}
        >
          <div
            className="grid gap-x-16 gap-y-12"
            style={{
              gridTemplateColumns: 'minmax(0, 2.2fr) minmax(0, 1fr)',
            }}
          >
            {/* 좌측 — 제목 + 서브 */}
            <div>
              <h1
                className="editorial-h1"
                style={{
                  fontSize: 'clamp(40px, 7.5vw, 104px)',
                  marginBottom: 'var(--space-lg)',
                }}
              >
                {folioDetail.title}
              </h1>
              <p
                className="text-[17px] md:text-[19px] leading-[1.55] max-w-xl"
                style={{ color: 'var(--text-secondary)' }}
              >
                {folioDetail.subtitle}
              </p>
            </div>

            {/* 우측 — 메타 */}
            <div className="flex flex-col" style={{ gap: 'var(--space-lg)' }}>
              {[
                { label: 'Role', value: folioDetail.role },
                { label: 'Team', value: folioDetail.team },
                { label: 'Duration', value: folioDetail.duration },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col"
                  style={{
                    gap: '4px',
                    paddingBottom: 'var(--space-sm)',
                    borderBottom: '1px solid var(--border-subtle)',
                  }}
                >
                  <p className="section-label">{label}</p>
                  <p
                    className="text-[14px] leading-[1.5]"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {value}
                  </p>
                </div>
              ))}

              <div className="flex flex-wrap gap-x-5 gap-y-2" style={{ marginTop: 'var(--space-xs)' }}>
                {folioDetail.links.github && (
                  <a
                    href={folioDetail.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-[0.28em] uppercase transition-colors duration-200 hover:text-[var(--text-primary)]"
                    style={{
                      color: 'var(--text-muted)',
                      borderBottom: '1px solid var(--border-default)',
                      paddingBottom: '2px',
                    }}
                  >
                    GitHub <ArrowUpRight size={12} strokeWidth={1.25} />
                  </a>
                )}
                {folioDetail.links.video && (
                  <a
                    href={folioDetail.links.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-[0.28em] uppercase transition-colors duration-200 hover:text-[var(--text-primary)]"
                    style={{
                      color: 'var(--text-muted)',
                      borderBottom: '1px solid var(--border-default)',
                      paddingBottom: '2px',
                    }}
                  >
                    Video <ArrowUpRight size={12} strokeWidth={1.25} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* 태그 + 수상 — 제목 블록 아래에 통합 */}
          <div
            className="flex flex-col gap-4 pt-10"
            style={{ borderTop: '1px solid var(--border-subtle)' }}
          >
            <div className="flex flex-wrap gap-1.5">
              {folioDetail.tech.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
            {folioDetail.achievements.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {folioDetail.achievements.map((a) => (
                  <span
                    key={a}
                    className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-[0.2em] px-2 py-1 uppercase"
                    style={{
                      color: 'var(--status-warning)',
                      border: '1px solid var(--status-warning)',
                    }}
                  >
                    ★ {a}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── 본문 ─────────────────────────────────────── */}
      <div
        className="container"
        style={{ marginTop: 'var(--space-5xl)' }}
      >
        <div className="flex gap-12 lg:gap-20">
          {/* Sticky 목차 */}
          <aside className="hidden lg:block w-48 shrink-0">
            <nav className="sticky top-24 flex flex-col">
              <p
                className="section-label pb-3 mb-3"
                style={{ borderBottom: '1px solid var(--border-subtle)' }}
              >
                Contents
              </p>
              {SECTIONS.map((s) => {
                const active = activeSection === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className="flex items-center gap-3 text-left py-2.5 transition-colors duration-200"
                    style={{
                      color: active ? 'var(--text-primary)' : 'var(--text-muted)',
                    }}
                  >
                    <span
                      className="font-mono text-[10px] transition-colors duration-200"
                      style={{
                        color: active ? 'var(--point-blue)' : 'var(--text-subtle)',
                      }}
                    >
                      {s.index}
                    </span>
                    <span className="text-[13px]">{s.label}</span>
                    {active && (
                      <span
                        className="ml-auto w-6 h-px"
                        style={{ background: 'var(--point-blue)' }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* 본문 */}
          <div
            className="flex-1 min-w-0 flex flex-col"
            style={{ gap: 'var(--space-5xl)' }}
          >
            <section id="overview">
              <p className="section-label mb-5">01 / Overview</p>
              <h2
                className="editorial-h2 mb-8"
                style={{ fontSize: 'clamp(22px, 2.8vw, 34px)' }}
              >
                개요
              </h2>
              <p
                className="text-[16px] md:text-[17px] leading-[1.9] measure-prose"
                style={{ color: 'var(--text-secondary)' }}
              >
                {folioDetail.overview}
              </p>
            </section>

            <section id="roles">
              <p className="section-label mb-5">02 / Contribution</p>
              <h2
                className="editorial-h2 mb-10"
                style={{ fontSize: 'clamp(22px, 2.8vw, 34px)' }}
              >
                담당한 역할
              </h2>
              <RoleAccordion />
            </section>

            <section id="lessons">
              <p className="section-label mb-5">03 / Learnings</p>
              <h2
                className="editorial-h2 mb-10"
                style={{ fontSize: 'clamp(22px, 2.8vw, 34px)' }}
              >
                배운 점
              </h2>
              <div
                className="grid sm:grid-cols-2 gap-x-10"
                style={{ borderTop: '1px solid var(--border-subtle)' }}
              >
                {folioDetail.lessons.map((lesson, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.06 }}
                    style={{
                      paddingTop: 'var(--space-xl)',
                      paddingBottom: 'var(--space-xl)',
                      borderBottom: '1px solid var(--border-subtle)',
                    }}
                  >
                    <div
                      className="flex items-baseline gap-3"
                      style={{ marginBottom: 'var(--space-sm)' }}
                    >
                      <span
                        className="font-mono text-[10px] tracking-[0.28em]"
                        style={{ color: 'var(--text-subtle)' }}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <p
                        className="text-[16px] font-[500] tracking-[-0.01em]"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {lesson.title}
                      </p>
                    </div>
                    <p
                      className="text-[14px] leading-[1.8] pl-8 measure-prose"
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
