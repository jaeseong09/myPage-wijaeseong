import { ArrowUpRight } from 'lucide-react';
import { experiences } from '../../data/experiences';
import { SectionRule, SectionTitle } from '../ui/SectionMotion';

export function Experiences() {
  return <section id="experiences" className="section section--animated"><SectionRule /><div className="container">
    <div className="section-grid mb-16"><p className="section-label">── 03<br />Experience</p><div><SectionTitle>만들고, 설명하고, 나누며.</SectionTitle><p className="mt-5 text-[17px] md:text-[19px]" style={{ color: 'var(--text-secondary)' }}>학교와 개발 현장에서 사람들과 함께 쌓은 경험입니다.</p></div></div>
    <div className="experience-list">{experiences.map((experience) => <article key={experience.title} className="experience-row"><div><p className="text-[15px]" style={{ color: 'var(--text-secondary)' }}>{experience.period}</p><p className="section-label mt-2">{experience.category}</p></div><div><h3>{experience.title}</h3><p className="experience-description">{experience.description}</p><div className="case-links">{experience.links.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={13} /></a>)}</div></div></article>)}</div>
  </div></section>;
}
