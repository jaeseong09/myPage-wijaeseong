import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { projects } from '../../data/projects';

export function Projects() {
  const reducedMotion = usePrefersReducedMotion();
  const selected = projects.filter((project) => project.featured);
  const others = projects.filter((project) => !project.featured && project.status !== 'hidden');
  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-grid mb-16"><p className="section-label">── 02<br />Selected work</p><div><h2 className="editorial-h2">만들고, 함께 해결한 일.</h2><p className="mt-5 text-[17px] md:text-[19px]" style={{ color: 'var(--text-secondary)' }}>대표 프로젝트 {selected.length}개 · 직접 맡은 역할과 문제 해결 과정</p></div></div>
        <div className="hairline-list">
          {selected.map((project, index) => (
            <motion.article key={project.id} initial={reducedMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.3 }}>
              <Link to={`/projects/${project.id}`} className="project-row group">
                <span className="section-label project-index">{String(index + 1).padStart(2, '0')}</span>
                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-4"><h3 className="project-title">{project.title}</h3><ArrowUpRight className="shrink-0 mt-2" size={22} /></div>
                  <p className="project-subtitle">{project.subtitle}</p>
                  <p className="project-description">{project.description}</p>
                  <p className="project-role">{project.role} · {project.stateLabel}</p>
                  {project.achievements.length > 0 && <p className="project-outcome">{project.achievements.join(' · ')}</p>}
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 text-[14px]" style={{ color: 'var(--text-muted)' }}>{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>
                </div>
                {project.thumbnail ? <img src={project.thumbnailSmall ?? project.thumbnail} alt={project.thumbnailAlt ?? `${project.title} 프로젝트 화면`} width={project.thumbnailWidth} height={project.thumbnailHeight} loading="lazy" decoding="async" className="project-preview" /> : <span className="project-period">{project.duration}</span>}
              </Link>
            </motion.article>
          ))}
        </div>
        <div className="section-grid mt-20"><p className="section-label">More projects</p><div><h3 className="text-[26px] mb-8">함께 쌓아 온 작업</h3><div className="hairline-list">{others.map((project) => <Link key={project.id} to={`/projects/${project.id}`} className="other-project"><div><h4>{project.title} <ArrowUpRight size={15} className="inline" /></h4><p>{project.subtitle}</p><p className="other-project-meta mt-2">{project.role} · {project.stateLabel}</p></div><span className="text-[15px] shrink-0">{project.year}</span></Link>)}</div></div></div>
      </div>
    </section>
  );
}
