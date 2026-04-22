import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useIntersection } from '../../hooks/useIntersection';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { projects } from '../../data/projects';

export function Projects() {
  const { ref, isVisible } = useIntersection();
  const reducedMotion = usePrefersReducedMotion();
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const visible = projects.filter((p) => p.status !== 'hidden');

  return (
    <section
      id="projects"
      ref={ref as React.RefObject<HTMLElement>}
      className="section"
    >
      <div className="container">
        {/* 섹션 헤더 — 라벨 + 타이틀 + 카운트 */}
        <div
          className="section-grid"
          style={{ marginBottom: 'var(--space-4xl)', alignItems: 'end' }}
        >
          <motion.p
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="section-label"
          >
            ── 03
            <br />
            Selected work
          </motion.p>

          <div className="flex items-end justify-between flex-wrap gap-6">
            <motion.h2
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="editorial-h2"
            >
              선별한 작업들.
            </motion.h2>
            <motion.span
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="font-mono text-[10px] tracking-[0.3em]"
              style={{ color: 'var(--text-subtle)' }}
            >
              {String(visible.length).padStart(2, '0')} / {String(visible.length).padStart(2, '0')}
            </motion.span>
          </div>
        </div>

        {/* 프로젝트 — 인덱스 리스트 */}
        <div style={{ borderTop: '1px solid var(--border-default)' }}>
          {visible.map((project, idx) => {
            const isHover = hoveredId === project.id;
            return (
              <motion.article
                key={project.id}
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + idx * 0.08 }}
                style={{ borderBottom: '1px solid var(--border-default)' }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <button
                  onClick={() => navigate(`/projects/${project.id}`)}
                  className="group w-full text-left transition-colors duration-300"
                  style={{
                    color: isHover ? 'var(--text-primary)' : 'var(--text-secondary)',
                    paddingTop: 'var(--space-2xl)',
                    paddingBottom: 'var(--space-2xl)',
                  }}
                >
                  <div
                    className="grid items-baseline gap-x-6 md:gap-x-10"
                    style={{
                      gridTemplateColumns: '56px minmax(0, 1fr) auto',
                    }}
                  >
                    {/* 번호 */}
                    <span
                      className="font-mono text-[11px] tracking-[0.3em] self-start transition-colors duration-300"
                      style={{
                        color: isHover ? 'var(--point-blue)' : 'var(--text-subtle)',
                        paddingTop: '0.8em',
                      }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>

                    {/* 제목 + 서브타이틀 */}
                    <div className="flex flex-col gap-2">
                      <h3
                        className="font-[300] tracking-[-0.025em] leading-[1] transition-transform duration-300"
                        style={{
                          fontSize: 'clamp(26px, 4.5vw, 64px)',
                          color: 'inherit',
                          transform: isHover ? 'translateX(8px)' : 'translateX(0)',
                        }}
                      >
                        {project.title}
                      </h3>
                      <p
                        className="text-[13px] font-mono tracking-wider"
                        style={{ color: 'var(--text-subtle)' }}
                      >
                        {project.subtitle}
                      </p>
                    </div>

                    {/* 연도 + 화살표 */}
                    <div
                      className="flex items-center gap-4 self-start"
                      style={{ paddingTop: '0.6em' }}
                    >
                      <span
                        className="font-mono text-[11px] tracking-[0.3em]"
                        style={{ color: 'var(--text-subtle)' }}
                      >
                        {project.year}
                      </span>
                      <ArrowUpRight
                        size={18}
                        strokeWidth={1.25}
                        className="transition-[transform,color] duration-300"
                        style={{
                          color: isHover ? 'var(--point-blue)' : 'var(--text-muted)',
                          transform: isHover ? 'translate(3px, -3px)' : 'translate(0,0)',
                        }}
                      />
                    </div>
                  </div>
                </button>

                {/* Hover 시 펼쳐지는 설명 + 썸네일 */}
                <AnimatePresence initial={false}>
                  {isHover && !reducedMotion && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeOut' as const }}
                      className="overflow-hidden"
                    >
                      <div
                        className="grid gap-x-10 gap-y-5 pb-10"
                        style={{
                          gridTemplateColumns: '56px minmax(0, 1fr)',
                        }}
                      >
                        <div />
                        <p
                          className="text-[14px] leading-[1.75] measure-prose"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {project.description}
                        </p>
                      </div>

                      {/* 썸네일 — 공유 요소 전환 제거 (정적 썸네일) */}
                      <div
                        className="overflow-hidden"
                        style={{ background: 'var(--bg-elevated)' }}
                      >
                        <div className="w-full aspect-[21/9] flex items-center justify-center">
                          <div className="text-center">
                            <div
                              className="font-[300] leading-none mb-4"
                              style={{
                                color: 'var(--text-primary)',
                                fontSize: 'clamp(36px, 7vw, 104px)',
                                letterSpacing: '-0.045em',
                              }}
                            >
                              {project.title}
                            </div>
                            <div
                              className="font-mono text-[10px] tracking-[0.3em]"
                              style={{ color: 'var(--text-subtle)' }}
                            >
                              {project.year} · {project.tech.slice(0, 3).join(' · ')}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
