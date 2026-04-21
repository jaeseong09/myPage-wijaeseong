import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, GitFork, Play } from 'lucide-react';
import { useIntersection } from '../../hooks/useIntersection';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { projects } from '../../data/projects';
import { Badge } from '../ui/Badge';

export function Projects() {
  const { ref, isVisible } = useIntersection();
  const reducedMotion = usePrefersReducedMotion();
  const navigate = useNavigate();

  const visible = projects.filter((p) => p.status !== 'hidden');

  return (
    <section
      id="projects"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 md:py-32"
      style={{ borderTop: '1px solid var(--border-subtle)' }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs mb-4 tracking-widest"
          style={{ color: 'var(--accent-primary)' }}
        >
          03 / PROJECTS
        </motion.p>

        <motion.h2
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="text-3xl font-[500] tracking-[-0.01em] mb-12"
          style={{ color: 'var(--text-primary)' }}
        >
          프로젝트
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={reducedMotion ? false : { opacity: 0, y: 28 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + idx * 0.08 }}
              className="group flex flex-col rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'var(--bg-surface)',
                border: '0.5px solid var(--border-subtle)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(55,138,221,0.4)';
                (e.currentTarget as HTMLElement).style.background = 'var(--accent-soft)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)';
                (e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)';
              }}
              onClick={() => navigate(`/projects/${project.id}`)}
            >
              {/* 썸네일 */}
              <motion.div
                layoutId={`project-${project.id}-thumb`}
                className="relative w-full aspect-[16/9] overflow-hidden"
                style={{ background: 'var(--bg-elevated)' }}
              >
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ color: 'var(--text-subtle)' }}
                >
                  <div className="text-center">
                    <div
                      className="text-4xl font-[500] mb-1"
                      style={{
                        background:
                          'linear-gradient(135deg, var(--accent-primary), var(--accent-light))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {project.title}
                    </div>
                    <div className="font-mono text-[10px] tracking-widest" style={{ color: 'var(--text-subtle)' }}>
                      {project.year}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 카드 내용 */}
              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3
                      className="text-base font-[500] mb-0.5"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-[12px]" style={{ color: 'var(--accent-light)' }}>
                      {project.subtitle}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ color: 'var(--accent-primary)' }}
                  />
                </div>

                <p
                  className="text-[13px] leading-[1.7] mb-4 flex-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {project.description}
                </p>

                {/* 태그 */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.slice(0, 4).map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                  {project.tech.length > 4 && (
                    <Badge>+{project.tech.length - 4}</Badge>
                  )}
                </div>

                {/* 링크 */}
                <div
                  className="flex items-center gap-3 pt-4"
                  style={{ borderTop: '1px solid var(--border-subtle)' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[12px] transition-colors duration-200 hover:text-[var(--text-primary)]"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      <GitFork size={13} />
                      GitHub
                    </a>
                  )}
                  {project.links.video && (
                    <a
                      href={project.links.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[12px] transition-colors duration-200 hover:text-[var(--text-primary)]"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      <Play size={13} />
                      영상
                    </a>
                  )}
                  <span
                    className="ml-auto font-mono text-[10px] px-2 py-0.5 rounded"
                    style={{
                      background: 'var(--status-success)20',
                      color: 'var(--status-success)',
                    }}
                  >
                    {project.status === 'shipped' ? 'shipped' : 'wip'}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
