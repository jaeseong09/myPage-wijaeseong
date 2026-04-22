import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Plus } from 'lucide-react';
import { projects } from '../../data/projects';
import { Badge } from '../../components/ui/Badge';

const project = projects.find((p) => p.id === 'gbsw-web')!;

const SECTIONS = [
  { id: 'overview', label: '개요', index: '01' },
  { id: 'contributions', label: '구현 내용', index: '02' },
  { id: 'problems', label: '문제 해결', index: '03' },
  { id: 'lessons', label: '배운 점', index: '04' },
];

const CONTRIBUTIONS = [
  {
    title: '세션 기반 인증 + 라우트 보호 설계',
    problem:
      '각 페이지에서 개별적으로 인증 여부를 판단하면, 비로그인 사용자가 보호 라우트에 접근하거나 로그인 사용자가 다시 로그인 페이지로 이동하는 흐름을 일관되게 제어하기 어려웠습니다.',
    solution: [
      'App.jsx 마운트 시 `/users/me` 엔드포인트를 호출해 서버 세션 유효성을 검사하고, 인증 상태를 `isSignup` state 하나로 관리해 전체 앱에 props로 전달했습니다.',
      '보호 라우트(`/write`, `/myAbout`)는 `useEffect`로 `isSignup`을 확인해 비인증 시 `/login`으로 리다이렉트하고, 로그인 페이지는 이미 인증된 사용자를 `/`로 돌려보내는 양방향 가드를 적용했습니다.',
    ],
  },
  {
    title: '게시글 목록 — 검색·정렬·페이지네이션',
    problem:
      '게시글이 쌓일수록 전체를 한 번에 렌더링하면 응답 속도가 느려지고, 원하는 글을 찾으려면 스크롤을 내려야 하는 UX 문제가 있었습니다.',
    solution: [
      '1페이지 14개 단위 페이지네이션과 키워드 검색 필터를 구현하고, 최신·인기(조회수 기준)·추천(좋아요 기준) 3가지 정렬 모드를 탭으로 전환할 수 있도록 설계했습니다.',
      '정렬 모드 state를 `useEffect`의 의존성으로 등록해 탭 전환 시 자동으로 재요청이 발생하고, 사이드바에 인기 게시글·추천 게시글을 별도 노출해 진입점을 다양화했습니다.',
    ],
  },
  {
    title: '이미지 확대 모달 뷰어',
    problem:
      '게시글에 첨부된 이미지를 원본 크기로 볼 방법이 없었고, 모달이 열린 상태에서 배경이 스크롤 가능해 UX가 어색했습니다.',
    solution: [
      '이미지 클릭 시 오버레이 모달로 확대 표시하고, `document.body.style.overflow = "hidden"`으로 배경 스크롤을 차단했습니다.',
      '모달 외부 클릭·닫기 버튼·Escape 키 세 가지 경로로 닫기를 지원하고, `useEffect` cleanup에서 `overflow` 속성을 복원해 모달 해제 후 스크롤이 정상 동작하도록 처리했습니다.',
    ],
  },
  {
    title: '프로필 이미지 업로드 + 계정 관리',
    problem:
      '프로필 이미지 변경 후 브라우저 캐시로 인해 이전 이미지가 남아 보이는 문제가 있었고, 세션 만료(401) 시 각 요청마다 리다이렉트 처리를 중복으로 작성해야 했습니다.',
    solution: [
      '이미지 URL에 `?t=Date.now()` 타임스탬프 쿼리 파라미터를 추가해 업로드 직후 캐시를 무효화하고, 업로드 즉시 미리보기를 렌더링해 피드백 속도를 높였습니다.',
      'Axios 인터셉터에서 401 응답을 감지해 `/login` 리다이렉트와 쿠키 만료 처리를 한 곳에서 공통으로 처리했습니다. 사용자명 변경·비밀번호 변경·회원 탈퇴·로그아웃 기능도 마이페이지에서 통합 관리했습니다.',
    ],
  },
];

const PROBLEMS: { title: string; issue: string; solution: string; result: string }[] = [
  {
    title: 'vw·vh 남용으로 인한 환경별 레이아웃 깨짐',
    issue:
      '카드 크기·텍스트·간격 등 거의 모든 요소에 vw·vh 단위를 적용했습니다. 개발 환경에서는 괜찮아 보였지만, 다른 해상도나 창 크기에서 텍스트가 지나치게 작아지거나 카드가 화면을 벗어나는 등 레이아웃이 일관되게 깨지는 현상이 발생했습니다.',
    solution:
      '고정값이 필요한 패딩·마진·폰트 최솟값에는 px·rem을 기본으로 적용하고, 너비처럼 뷰포트에 따라 유동적으로 변해야 하는 요소에만 vw·%를 제한적으로 사용하는 방식으로 단위 기준을 재정립했습니다. 텍스트 크기는 `clamp()`로 최솟값·최댓값을 명시해 극단적인 크기를 방지했습니다.',
    result:
      '뷰포트가 달라져도 레이아웃이 예측 가능하게 유지됐습니다. 반응형 단위는 "모든 곳"이 아니라 "유동적으로 변해야 하는 속성에만" 써야 한다는 원칙을 세울 수 있었고, 이후 프로젝트부터는 단위 선택 기준을 설계 단계에서 먼저 정의하게 됐습니다.',
  },
  {
    title: 'Redux 미활용으로 인한 props drilling 복잡성',
    issue:
      'Redux를 제대로 활용하지 못해 인증 상태(`isSignup`)를 App 최상위에서 Layout → Navbar → 각 페이지 컴포넌트까지 모두 props로 내려보냈습니다. depth가 깊어질수록 어떤 컴포넌트가 어떤 값을 받고 있는지 파악하기 어려워졌고, 인증 상태 하나를 바꾸려 해도 모든 경로의 props를 함께 수정해야 했습니다.',
    solution:
      'props drilling의 한계를 인식한 채로 프로젝트를 마무리했고, 이후 Folio 프로젝트에서 Redux Toolkit의 `loginSlice`를 도입해 인증 상태를 전역 store에서 관리하는 방식으로 직접 해결했습니다.',
    result:
      'Folio에서는 어느 컴포넌트에서든 store를 직접 구독해 인증 상태를 읽을 수 있어, props를 일일이 내려보내는 코드가 완전히 사라졌습니다. 불편함을 직접 겪은 뒤 해결책을 적용하니 상태 관리 도구가 왜 필요한지 구체적으로 이해할 수 있었습니다.',
  },
];

const LESSONS = [
  {
    title: '인증 상태는 단일 출처에서 관리해야 한다',
    body: '각 페이지가 개별적으로 세션을 확인하는 대신 App 레벨의 `isSignup` 하나로 관리하자 일관성이 생겼습니다. 전역 상태가 왜 필요한지 코드로 체감한 경험이었습니다.',
  },
  {
    title: 'Axios 인터셉터로 공통 에러를 한 곳에서',
    body: '401 처리를 페이지마다 중복 작성하다 인터셉터로 올리자 코드가 단순해졌습니다. 횡단 관심사는 최대한 상위 계층에서 처리해야 한다는 것을 배웠습니다.',
  },
  {
    title: '브라우저 캐시는 의도적으로 무효화해야 한다',
    body: '이미지를 교체해도 브라우저가 이전 파일을 보여주는 현상을 겪고, 타임스탬프 쿼리 파라미터로 해결했습니다. 브라우저 동작을 이해하고 설계에 반영하는 것이 중요하다는 것을 깨달았습니다.',
  },
  {
    title: '공통 UI는 일찍 추상화해야 한다',
    body: '인기 게시글·추천 게시글 사이드바가 PostPage·PostDetails 두 곳에 거의 동일하게 반복됐습니다. 초반에 컴포넌트로 분리했다면 유지보수가 훨씬 쉬웠을 것이라는 반성을 했습니다.',
  },
];

function ContributionAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ borderTop: '1px solid var(--border-default)' }}>
      {CONTRIBUTIONS.map((item, idx) => {
        const isOpen = open === idx;
        return (
          <div key={idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
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
                  style={{ color: isOpen ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                >
                  {item.title}
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
                    style={{ gridTemplateColumns: '56px minmax(0, 1fr)' }}
                  >
                    <div />
                    <div className="flex flex-col" style={{ gap: 'var(--space-lg)' }}>
                      <p
                        className="text-[14px] leading-[1.85]"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {item.problem}
                      </p>
                      <ul className="flex flex-col" style={{ gap: 'var(--space-sm)' }}>
                        {item.solution.map((s, si) => (
                          <li key={si} className="flex gap-3 text-[14px] leading-[1.75]">
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

export function GbswWeb() {
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
          <span>Case · 02</span>
          <span>{project.duration}</span>
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
              alt="경소마고실록 썸네일"
              className="w-full h-auto block"
            />
          </div>
        )}

        {/* 제목 + 메타 */}
        <div
          className="grid gap-x-16 gap-y-12"
          style={{
            gridTemplateColumns: 'minmax(0, 2.2fr) minmax(0, 1fr)',
            marginBottom: 'var(--space-2xl)',
          }}
        >
          <div>
            <h1
              className="editorial-h1"
              style={{ fontSize: 'clamp(40px, 7.5vw, 104px)', marginBottom: 'var(--space-lg)' }}
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

        {/* 태그 */}
        <div
          className="flex flex-wrap gap-1.5 pt-8"
          style={{
            borderTop: '1px solid var(--border-subtle)',
            marginBottom: 'var(--space-5xl)',
          }}
        >
          {project.tech.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </div>

      {/* 본문 */}
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

          {/* 본문 콘텐츠 */}
          <div className="flex-1 min-w-0 flex flex-col" style={{ gap: 'var(--space-5xl)' }}>

            {/* 개요 */}
            <section id="overview">
              <p className="section-label mb-5">01 / Overview</p>
              <h2 className="editorial-h2 mb-8" style={{ fontSize: 'clamp(22px, 2.8vw, 34px)' }}>
                개요
              </h2>
              <p
                className="text-[16px] md:text-[17px] leading-[1.9] measure-prose"
                style={{ color: 'var(--text-secondary)' }}
              >
                경북소프트웨어마이스터고 학생들을 위한 교내 커뮤니티 플랫폼입니다. 학번 기반 회원가입·로그인, 게시글 CRUD, 좋아요·조회수·댓글, 파일 첨부, 프로필 이미지 관리까지 실제 서비스 수준의 기능을 갖춘 풀스택 웹으로, 프론트엔드 전체를 단독으로 담당했습니다.
              </p>

              {/* 핵심 수치 */}
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-px mt-12"
                style={{ border: '1px solid var(--border-subtle)' }}
              >
                {[
                  { value: '7', label: '페이지' },
                  { value: '3가지', label: '정렬 모드' },
                  { value: 'Multer', label: '파일 업로드' },
                  { value: '세션', label: '인증 방식' },
                ].map(({ value, label }) => (
                  <div
                    key={label}
                    className="flex flex-col gap-1 px-6 py-5"
                    style={{ background: 'var(--bg-elevated)' }}
                  >
                    <span
                      className="font-mono text-[22px] font-[300] tracking-[-0.02em]"
                      style={{ color: 'var(--point-blue)' }}
                    >
                      {value}
                    </span>
                    <span
                      className="font-mono text-[10px] tracking-[0.2em] uppercase"
                      style={{ color: 'var(--text-subtle)' }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* 구현 내용 */}
            <section id="contributions">
              <p className="section-label mb-5">02 / Contribution</p>
              <h2 className="editorial-h2 mb-10" style={{ fontSize: 'clamp(22px, 2.8vw, 34px)' }}>
                구현 내용
              </h2>
              <ContributionAccordion />
            </section>

            {/* 문제 해결 */}
            <section id="problems">
              <p className="section-label mb-5">03 / Problem Solving</p>
              <h2 className="editorial-h2 mb-10" style={{ fontSize: 'clamp(22px, 2.8vw, 34px)' }}>
                문제 해결 과정
              </h2>
              {PROBLEMS.length === 0 ? (
                <p
                  className="text-[14px] font-mono tracking-[0.15em]"
                  style={{ color: 'var(--text-subtle)' }}
                >
                  — 준비 중
                </p>
              ) : (
                <div className="flex flex-col" style={{ gap: 'var(--space-2xl)' }}>
                  {PROBLEMS.map((problem, idx) => (
                    <div
                      key={idx}
                      style={{ border: '1px solid var(--border-subtle)', padding: 'var(--space-2xl)' }}
                    >
                      <div className="flex items-baseline gap-4 mb-8">
                        <span
                          className="font-mono text-[11px] tracking-[0.3em] shrink-0"
                          style={{ color: 'var(--point-blue)' }}
                        >
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <h3
                          className="text-[18px] md:text-[20px] font-[400] tracking-[-0.01em]"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {problem.title}
                        </h3>
                      </div>
                      <div className="flex flex-col" style={{ gap: 'var(--space-xl)' }}>
                        {[
                          { label: '문제 상황', text: problem.issue, color: 'rgba(230,237,245,0.35)' },
                          { label: '해결 방법', text: problem.solution, color: 'var(--point-blue)' },
                          { label: '결과', text: problem.result, color: '#5EEAD4' },
                        ].map(({ label, text, color }) => (
                          <div
                            key={label}
                            className="grid gap-x-8"
                            style={{ gridTemplateColumns: '80px minmax(0, 1fr)' }}
                          >
                            <span
                              className="font-mono text-[10px] tracking-[0.25em] uppercase pt-[3px]"
                              style={{ color }}
                            >
                              {label}
                            </span>
                            <p
                              className="text-[14px] leading-[1.85]"
                              style={{ color: 'var(--text-secondary)' }}
                            >
                              {text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* 배운 점 */}
            <section id="lessons">
              <p className="section-label mb-5">04 / Learnings</p>
              <h2 className="editorial-h2 mb-10" style={{ fontSize: 'clamp(22px, 2.8vw, 34px)' }}>
                배운 점
              </h2>
              <div
                className="grid sm:grid-cols-2 gap-x-10"
                style={{ borderTop: '1px solid var(--border-subtle)' }}
              >
                {LESSONS.map((lesson, idx) => (
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
