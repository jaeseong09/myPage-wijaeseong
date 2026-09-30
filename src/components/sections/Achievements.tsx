import { ArrowUpRight } from 'lucide-react';
import { achievements } from '../../data/achievements';

export function Achievements() {
  return <section id="achievements" className="section"><div className="container">
    <div className="section-grid mb-16"><p className="section-label">── 04<br />Recognition</p><h2 className="editorial-h2">수상 · 자격 · 장학</h2></div>
    <div className="hairline-list">{achievements.map((item) => <article key={`${item.date}-${item.title}`} className="award-row"><p className="font-mono text-[15px]" style={{ color: 'var(--text-secondary)' }}>{item.date}</p><div><h3>{item.title}</h3>{item.description && <p className="text-[16px] md:text-[17px] mt-2" style={{ color: 'var(--text-secondary)' }}>{item.description}</p>}{item.project && <p className="text-[15px] mt-2" style={{ color: 'var(--point-blue)' }}>{item.project}</p>}</div>{item.source && <a className="award-source" href={item.source} target="_blank" rel="noopener noreferrer" aria-label={`${item.title} 관련 기록`}>기록<ArrowUpRight size={14} /></a>}</article>)}</div>
  </div></section>;
}
