import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { projects } from '../../data/projects';
import { caseStudies } from '../../data/caseStudies';
import { Badge } from '../../components/ui/Badge';
import { NotFound } from '../NotFound';

export function CaseStudy({ projectId }: { projectId?: string }) {
  const { id } = useParams();
  const project = projects.find((entry) => entry.id === (projectId ?? id));
  const content = project ? caseStudies[project.id] : undefined;
  if (!project || !content) return <NotFound />;

  const links = [
    { label: 'GitHub', url: project.links.github },
    { label: '시연 영상', url: project.links.video },
    { label: '회고', url: project.links.blog },
    { label: '노션', url: project.links.notion },
  ].filter((link): link is { label: string; url: string } => Boolean(link.url));

  return (
    <main className="container case-study">
      <Link to={{ pathname: '/', hash: '#projects' }} className="case-back"><ArrowLeft size={16} /> 프로젝트 목록</Link>
      <div className="case-eyebrow"><span>{project.stateLabel}</span><span>{project.duration}</span></div>
      <div className="case-hero">
        <div>
          <h1 className="editorial-h1">{project.title}</h1>
          <p className="case-subtitle">{project.subtitle}</p>
        </div>
        <dl className="case-meta">
          <div><dt>담당 역할</dt><dd>{project.role}</dd></div>
          <div><dt>팀 구성</dt><dd>{project.team}</dd></div>
          <div><dt>개발 기간</dt><dd>{project.duration}</dd></div>
        </dl>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">{project.tech.map((tech) => <Badge key={tech}>{tech}</Badge>)}</div>
      {project.achievements.length > 0 && <ul className="case-results mb-6">{project.achievements.map((item) => <li key={item}>{item}</li>)}</ul>}
      <div className="case-links">{links.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={14} /></a>)}</div>
      {project.thumbnail && <img src={project.thumbnail} alt={`${project.title} 실제 프로젝트 화면`} className="case-image" />}
      <section className="case-section"><p className="section-label">01 / Overview</p><div><h2>프로젝트 소개</h2><p>{content.intro}</p></div></section>
      {content.contributions.length > 0 && <section className="case-section"><p className="section-label">02 / Contribution</p><div><h2>직접 맡은 일</h2><ul className="case-list">{content.contributions.map((item) => <li key={item}>{item}</li>)}</ul></div></section>}
      {content.problems.length > 0 && <section className="case-section"><p className="section-label">03 / Problem solving</p><div><h2>문제와 해결 과정</h2>{content.problems.map((problem) => <article className="case-problem" key={problem.title}><h3>{problem.title}</h3><dl><div><dt>상황</dt><dd>{problem.problem}</dd></div><div><dt>대응</dt><dd>{problem.solution}</dd></div><div><dt>결과</dt><dd>{problem.result}</dd></div></dl></article>)}</div></section>}
      {content.results.length > 0 && <section className="case-section"><p className="section-label">04 / Outcome</p><div><h2>결과와 배운 점</h2><ul className="case-list">{content.results.map((item) => <li key={item}>{item}</li>)}</ul>{content.next && <div className="case-next"><h3>이어 가는 작업</h3>{content.next.map((item) => <p key={item}>{item}</p>)}</div>}</div></section>}
      <section className="case-section"><p className="section-label">05 / References</p><div><h2>코드와 기록</h2><div className="case-links flex-col items-start">{content.evidence.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={14} /></a>)}</div></div></section>
      <Link to={{ pathname: '/', hash: '#projects' }} className="case-back"><ArrowLeft size={16} /> 프로젝트 목록으로 돌아가기</Link>
    </main>
  );
}
