import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { projects } from '../../data/projects';
import { Badge } from '../../components/ui/Badge';

const project = projects.find((p) => p.id === 'camplog')!;

const SECTIONS = [
  { id: 'concept', label: '기획 배경', index: '01' },
  { id: 'progress', label: '현재 진행', index: '02' },
  { id: 'techpoints', label: '기술 설계', index: '03' },
  { id: 'roadmap', label: '로드맵', index: '04' },
];

const TECH_POINTS = [
  {
    title: '시간대 기반 배경 자동 전환',
    detail:
      '`new Date().getHours()`로 새벽·낮·노을·밤 4단계를 판단해 배경 CSS 클래스를 교체합니다. 별 반짝임은 CSS `@keyframes` + 랜덤 `animation-delay`, 모닥불은 SVG path의 `scaleY` 변화로 구현합니다.',
  },
  {
    title: '실시간 모닥불 집중도 피드백',
    detail:
      '세션 중 일시정지 횟수·탭 이탈(`visibilitychange`) 이벤트를 집중도 점수로 환산하고, 해당 점수에 따라 모닥불 SVG의 애니메이션 강도를 동적으로 조정합니다.',
  },
  {
    title: '누적 시간 기반 캠프사이트 성장',
    detail:
      '총 공부 시간을 서버에서 받아 1h·3h·5h·8h 구간별로 캠프 요소(텐트·랜턴·다람쥐·비둘기 등)를 조건부 렌더링합니다. 씬 전체를 SVG·CSS 도형 기반으로 제작해 외부 이미지 의존 없이 구현합니다.',
  },
  {
    title: '원형 타이머 — SVG stroke 애니메이션',
    detail:
      'SVG `stroke-dasharray` / `stroke-dashoffset` 값을 남은 시간 비율로 계산해 진행 링을 그립니다. `stroke-linecap: round`로 부드러운 끝 처리를 적용하고, `requestAnimationFrame`으로 매 프레임 업데이트합니다.',
  },
  {
    title: '사운드스케이프 — Web Audio API 레이어링',
    detail:
      'Web Audio API의 `AudioContext`로 모닥불 소리·바람 소리·새소리를 독립 트랙으로 로드하고 `GainNode`로 볼륨을 제어합니다. S3에서 스트리밍해 초기 로딩을 분산합니다.',
  },
  {
    title: 'JWT 인증 + Spring Security',
    detail:
      'Spring Boot에서 `UsernamePasswordAuthenticationFilter`를 확장해 로그인 시 Access Token을 발급합니다. 프론트는 `Authorization: Bearer` 헤더로 매 요청에 토큰을 첨부하고, 401 응답 시 로그인 페이지로 리다이렉트합니다.',
  },
];

const ROADMAP = [
  { phase: '01', label: '기획 완성', detail: '페이지 흐름·DB 설계·API 명세', done: true },
  { phase: '02', label: '프론트 UI 구축', detail: 'Landing·Login·Dashboard·Session 4개 페이지 UI', done: true },
  { phase: '03', label: '백엔드 인증', detail: 'Spring Boot + JWT 로그인·회원가입', done: true },
  { phase: '04', label: '프론트-백 데이터 바인딩', detail: '실제 API 연동·상태 관리', done: false },
  { phase: '05', label: '집중 세션 핵심 기능', detail: '원형 타이머·집중도 측정·탭 이탈 감지', done: false },
  { phase: '06', label: '캠프사이트 애니메이션 + 사운드', detail: 'SVG 씬·모닥불 피드백·Web Audio API', done: false },
  { phase: '07', label: '소셜 기능', detail: '랭킹·편대 캠핑·친구 목록', done: false },
  { phase: '08', label: 'AWS 배포', detail: 'EC2·S3·GitHub Actions CI/CD', done: false },
];

export function CampLog() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('concept');

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main
      className="min-h-screen"
      style={{ paddingTop: 'var(--space-4xl)', paddingBottom: 'var(--space-4xl)' }}
    >
      {/* ── 헤더 ─────────────────────────────────────── */}
      <div className="container">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-[12px] font-mono tracking-[0.28em] uppercase transition-colors duration-200 hover:text-[var(--text-primary)]"
          style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-2xl)' }}
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
          <span>Case · 04</span>
          <span>{project.duration.replace(/~/, '→')}</span>
          <span>{project.year}</span>
        </div>

        {/* 썸네일 */}
        {project.thumbnail && (
          <div
            className="w-full overflow-hidden"
            style={{
              border: '1px solid var(--border-subtle)',
              marginBottom: 'var(--space-2xl)',
            }}
          >
            <img
              src={project.thumbnail}
              alt="CampLog 프로젝트 썸네일"
              className="w-full h-auto block"
            />
          </div>
        )}

        {/* WIP 배너 */}
        <div
          className="flex items-center gap-3 mb-8 px-4 py-3"
          style={{
            border: '1px solid rgba(245,158,11,0.3)',
            background: 'rgba(245,158,11,0.05)',
          }}
        >
          <span
            className="font-mono text-[9px] tracking-[0.25em] px-2 py-[3px] shrink-0"
            style={{
              color: '#f59e0b',
              border: '1px solid rgba(245,158,11,0.4)',
              background: 'rgba(245,158,11,0.1)',
            }}
          >
            IN PROGRESS
          </span>
          <p className="text-[12px] font-mono" style={{ color: 'rgba(245,158,11,0.7)' }}>
            현재 개발 진행 중인 프로젝트입니다. 일부 내용은 기획 단계의 내용을 포함합니다.
          </p>
        </div>

        {/* 제목 + 메타 그리드 */}
        <div
          className="grid gap-x-16 gap-y-12"
          style={{ gridTemplateColumns: 'minmax(0, 2.2fr) minmax(0, 1fr)' }}
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
              {project.title}
            </h1>
            <p
              className="text-[17px] md:text-[19px] leading-[1.55] max-w-xl"
              style={{ color: 'var(--text-secondary)' }}
            >
              {project.subtitle}
            </p>
          </div>

          {/* 우측 — 메타 */}
          <div className="flex flex-col" style={{ gap: 'var(--space-lg)' }}>
            {[
              { label: 'Role', value: project.role },
              { label: 'Team', value: project.team },
              { label: 'Duration', value: project.duration },
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
                <p className="text-[14px] leading-[1.5]" style={{ color: 'var(--text-primary)' }}>
                  {value}
                </p>
              </div>
            ))}

            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-[0.28em] uppercase transition-colors duration-200 hover:text-[var(--text-primary)]"
                style={{
                  color: 'var(--text-muted)',
                  borderBottom: '1px solid var(--border-default)',
                  paddingBottom: '2px',
                  width: 'fit-content',
                }}
              >
                GitHub <ArrowUpRight size={12} strokeWidth={1.25} />
              </a>
            )}
          </div>
        </div>

        {/* 기술 스택 */}
        <div
          className="flex flex-wrap gap-1.5 pt-10"
          style={{ borderTop: '1px solid var(--border-subtle)', marginTop: 'var(--space-xl)' }}
        >
          {project.tech.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </div>

      {/* ── 본문 ─────────────────────────────────────── */}
      <div className="container" style={{ marginTop: 'var(--space-5xl)' }}>
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
                    style={{ color: active ? 'var(--text-primary)' : 'var(--text-muted)' }}
                  >
                    <span
                      className="font-mono text-[10px] transition-colors duration-200"
                      style={{ color: active ? 'var(--point-blue)' : 'var(--text-subtle)' }}
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
          <div className="flex-1 min-w-0 flex flex-col" style={{ gap: 'var(--space-5xl)' }}>

            {/* 01 — 기획 배경 */}
            <section id="concept">
              <p className="section-label mb-5">01 / Concept</p>
              <h2
                className="editorial-h2 mb-8"
                style={{ fontSize: 'clamp(22px, 2.8vw, 34px)' }}
              >
                기획 배경
              </h2>
              <p
                className="text-[16px] md:text-[17px] leading-[1.9] measure-prose mb-10"
                style={{ color: 'var(--text-secondary)' }}
              >
                Forest, Pomofocus 같은 기존 집중 타이머 앱은 타이머와 통계 구조에 머물러 있습니다. 시각적 몰입감이 부족하고 오늘도 공부를 지속해야 할 감성적 이유가 없습니다. 이 문제에서 출발해 "공부 시간이 쌓일수록 나만의 캠프사이트가 풍성해진다"는 성장 시스템을 핵심 컨셉으로 삼았습니다.
              </p>

              {/* 핵심 차별점 3가지 */}
              <div
                className="grid sm:grid-cols-3 gap-px"
                style={{ border: '1px solid var(--border-subtle)' }}
              >
                {[
                  {
                    no: '01',
                    title: '모닥불 피드백',
                    body: '집중할수록 불꽃이 강해지고, 이탈하면 불이 약해집니다. 집중도가 실시간으로 시각화됩니다.',
                  },
                  {
                    no: '02',
                    title: '캠프사이트 성장',
                    body: '공부 시간이 쌓일수록 텐트·랜턴·다람쥐·비둘기가 하나씩 등장합니다.',
                  },
                  {
                    no: '03',
                    title: '편대 캠핑',
                    body: '친구들과 같은 모닥불 주변에 모여 함께 집중 세션을 진행하는 소셜 기능입니다.',
                  },
                ].map((item) => (
                  <div
                    key={item.no}
                    className="flex flex-col"
                    style={{ padding: 'var(--space-xl)', background: 'var(--bg-surface)' }}
                  >
                    <span
                      className="font-mono text-[10px] tracking-[0.3em] mb-4"
                      style={{ color: 'var(--point-blue)' }}
                    >
                      {item.no}
                    </span>
                    <p
                      className="text-[15px] font-[500] tracking-[-0.01em] mb-3"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {item.title}
                    </p>
                    <p className="text-[13px] leading-[1.75]" style={{ color: 'var(--text-muted)' }}>
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 02 — 현재 구현 상태 */}
            <section id="progress">
              <p className="section-label mb-5">02 / Current Progress</p>
              <h2
                className="editorial-h2 mb-10"
                style={{ fontSize: 'clamp(22px, 2.8vw, 34px)' }}
              >
                현재 진행 상황
              </h2>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* 프론트엔드 */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  style={{ border: '1px solid var(--border-subtle)', padding: 'var(--space-2xl)' }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <p
                      className="font-mono text-[11px] tracking-[0.3em] uppercase"
                      style={{ color: 'var(--point-blue)' }}
                    >
                      Frontend
                    </p>
                    <span
                      className="font-mono text-[9px] tracking-[0.2em] px-2 py-[2px]"
                      style={{
                        color: '#f59e0b',
                        border: '1px solid rgba(245,158,11,0.3)',
                        background: 'rgba(245,158,11,0.07)',
                      }}
                    >
                      UI 완성 · 바인딩 중
                    </span>
                  </div>
                  <ul className="flex flex-col" style={{ gap: 'var(--space-sm)' }}>
                    {[
                      'Landing Page — 시간대 기반 배경 전환 UI',
                      'Login / Signup — 아바타 선택 포함',
                      'Dashboard — 캠프사이트 씬 + 통계 카드',
                      'Session Page — 원형 타이머 UI',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-[13px] leading-[1.6]">
                        <span
                          className="font-mono text-[10px] pt-[2px] shrink-0"
                          style={{ color: 'var(--text-subtle)' }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* 백엔드 */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.06 }}
                  style={{ border: '1px solid var(--border-subtle)', padding: 'var(--space-2xl)' }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <p
                      className="font-mono text-[11px] tracking-[0.3em] uppercase"
                      style={{ color: 'var(--point-blue)' }}
                    >
                      Backend
                    </p>
                    <span
                      className="font-mono text-[9px] tracking-[0.2em] px-2 py-[2px]"
                      style={{
                        color: '#f59e0b',
                        border: '1px solid rgba(245,158,11,0.3)',
                        background: 'rgba(245,158,11,0.07)',
                      }}
                    >
                      로그인까지 완성
                    </span>
                  </div>
                  <ul className="flex flex-col" style={{ gap: 'var(--space-sm)' }}>
                    {[
                      'Spring Boot 프로젝트 구성',
                      'JWT 기반 회원가입 · 로그인 API',
                      'Spring Security 인증 필터 설정',
                      'MySQL 연동 · JPA Entity 설계',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-[13px] leading-[1.6]">
                        <span
                          className="font-mono text-[10px] pt-[2px] shrink-0"
                          style={{ color: 'var(--text-subtle)' }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </section>

            {/* 03 — 기술 설계 */}
            <section id="techpoints">
              <p className="section-label mb-5">03 / Technical Design</p>
              <h2
                className="editorial-h2 mb-10"
                style={{ fontSize: 'clamp(22px, 2.8vw, 34px)' }}
              >
                핵심 기술 설계
              </h2>
              <div style={{ borderTop: '1px solid var(--border-default)' }}>
                {TECH_POINTS.map((tp, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    className="grid gap-x-8 py-6"
                    style={{
                      gridTemplateColumns: '56px minmax(0, 1fr)',
                      borderBottom: '1px solid var(--border-subtle)',
                    }}
                  >
                    <span
                      className="font-mono text-[11px] tracking-[0.3em] pt-[3px]"
                      style={{ color: 'var(--point-blue)' }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p
                        className="text-[15px] font-[500] tracking-[-0.01em] mb-3"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {tp.title}
                      </p>
                      <p className="text-[13px] leading-[1.8]" style={{ color: 'var(--text-muted)' }}>
                        {tp.detail}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* 04 — 로드맵 */}
            <section id="roadmap">
              <p className="section-label mb-5">04 / Roadmap</p>
              <h2
                className="editorial-h2 mb-10"
                style={{ fontSize: 'clamp(22px, 2.8vw, 34px)' }}
              >
                개발 로드맵
              </h2>
              <div style={{ borderTop: '1px solid var(--border-default)' }}>
                {ROADMAP.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.04 }}
                    className="grid items-center gap-x-6 py-5"
                    style={{
                      gridTemplateColumns: '40px minmax(0, 1fr) auto',
                      borderBottom: '1px solid var(--border-subtle)',
                    }}
                  >
                    <span
                      className="font-mono text-[11px] tracking-[0.3em]"
                      style={{
                        color: item.done ? 'var(--point-blue)' : 'var(--text-subtle)',
                      }}
                    >
                      {item.phase}
                    </span>
                    <div>
                      <p
                        className="text-[14px] font-[400] tracking-[-0.01em]"
                        style={{ color: item.done ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                      >
                        {item.label}
                      </p>
                      <p className="text-[12px] mt-0.5" style={{ color: 'var(--text-subtle)' }}>
                        {item.detail}
                      </p>
                    </div>
                    <span
                      className="font-mono text-[9px] tracking-[0.2em] px-2 py-[3px] shrink-0"
                      style={
                        item.done
                          ? {
                              color: '#5EEAD4',
                              border: '1px solid rgba(94,234,212,0.35)',
                              background: 'rgba(94,234,212,0.07)',
                            }
                          : {
                              color: 'var(--text-subtle)',
                              border: '1px solid var(--border-subtle)',
                            }
                      }
                    >
                      {item.done ? 'DONE' : 'TODO'}
                    </span>
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
