import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Plus } from 'lucide-react';
import { projects } from '../../data/projects';
import { Badge } from '../../components/ui/Badge';

const project = projects.find((p) => p.id === 'decorating-the-house')!;

const SECTIONS = [
  { id: 'overview', label: '개요', index: '01' },
  { id: 'contributions', label: '구현 내용', index: '02' },
  { id: 'lessons', label: '배운 점', index: '03' },
];

const CONTRIBUTIONS = [
  {
    title: '동적 상품 렌더링 + 검색 필터',
    problem:
      '상품 4종(식기세척기·침대 프레임·디퓨저 세트·선풍기)을 HTML에 직접 하드코딩하면 데이터 변경 시 마크업을 일일이 수정해야 하고, 검색 결과를 표시할 방법도 없었습니다.',
    solution: [
      'JavaScript 객체 배열로 상품 데이터를 정의하고, `renderProducts()` 함수 하나로 카드 마크업을 동적으로 생성·삽입했습니다.',
      '검색 입력값과 상품명을 `includes()`로 비교해 필터링하고, 일치 키워드를 `<mark>` 태그로 감싸 하이라이팅까지 처리했습니다.',
    ],
  },
  {
    title: '장바구니 담기 + 드래그앤드롭 연동',
    problem:
      '버튼 클릭과 드래그앤드롭이라는 두 가지 입력 방식을 모두 지원하면서, 같은 상품을 중복 담을 때 수량을 증가시키는 처리가 필요했습니다.',
    solution: [
      '클릭("담기" 버튼)은 `addToCart()`, jQuery UI Droppable의 `drop` 콜백도 동일한 함수로 연결해 로직을 한 곳에서 관리했습니다.',
      '장바구니 배열을 순회하며 동일 상품 존재 여부를 확인해 수량(`qty`)을 증가시키고, `updateTotal()`로 합계를 실시간 갱신했습니다.',
    ],
  },
  {
    title: 'HTML5 Canvas 영수증 생성',
    problem:
      '결제 완료 후 구매 내역을 사용자에게 시각적으로 보여줄 방법이 필요했고, 서버 없이 클라이언트에서만 처리해야 했습니다.',
    solution: [
      '`<canvas>` 요소에 `getContext("2d")`로 2열 그리드를 직접 그려 날짜·시각·상품명·단가·수량·소계·합계를 인쇄물 형태로 렌더링했습니다.',
      '구매자 이름·연락처를 입력받는 모달을 먼저 띄운 뒤 확인 시 Canvas 모달로 전환해, 결제 정보 입력 → 영수증 확인의 자연스러운 플로우를 구현했습니다.',
    ],
  },
  {
    title: 'Bootstrap + 커스텀 CSS 스타일 시스템',
    problem:
      'Bootstrap의 유틸리티 클래스와 직접 작성한 커스텀 스타일이 충돌하지 않으면서, 다크 네비게이션과 밝은 카드 영역의 시각적 위계를 명확히 해야 했습니다.',
    solution: [
      'Navbar는 Bootstrap 컴포넌트(`#17171b` 커스텀 배경)로, 상품 카드와 장바구니 영역은 별도 CSS 클래스(`.cart`, `.cart-card`)로 분리해 Bootstrap과 충돌 없이 관리했습니다.',
      '모달(`.mobal`)·오버레이(`.mobal-bg`)·Canvas 컨테이너(`.canvas-box`)를 각각 독립 클래스로 정의해 z-index 계층과 포지셔닝을 명확히 구분했습니다.',
    ],
  },
];

const LESSONS = [
  {
    title: '데이터와 뷰의 분리',
    body: '상품을 HTML에 직접 쓰지 않고 JS 배열로 관리한 뒤 렌더링 함수로 찍어내는 패턴이 컴포넌트 기반 프레임워크의 핵심 원리와 같다는 것을 체감했습니다.',
  },
  {
    title: '사용자 인터랙션 경로의 통합',
    body: '클릭과 드래그앤드롭이라는 다른 입력 방식을 동일한 함수로 처리하며, UI 인터랙션은 표현만 다를 뿐 결국 같은 비즈니스 로직으로 수렴한다는 것을 배웠습니다.',
  },
  {
    title: 'Canvas API의 좌표 시스템',
    body: '픽셀 단위 좌표를 직접 계산해 텍스트·선·그리드를 그리며, 브라우저가 DOM 없이도 그래픽을 처리하는 저수준 API를 처음으로 경험했습니다.',
  },
  {
    title: '모달 플로우 UX 설계',
    body: '"입력 → 확인 → 결과"로 이어지는 다단계 모달 흐름을 직접 설계하며, 사용자를 다음 단계로 자연스럽게 유도하는 상태 전환의 중요성을 깨달았습니다.',
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

export function DecoratingTheHouse() {
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
          <span>Case · 03</span>
          <span>{project.duration}</span>
          <span>{project.year}</span>
        </div>

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
          <div
            className="flex-1 min-w-0 flex flex-col"
            style={{ gap: 'var(--space-5xl)' }}
          >
            {/* 개요 */}
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
                가구·생활용품 4종을 대상으로 검색, 장바구니 담기, 드래그앤드롭, 결제 모달,
                Canvas 영수증 생성까지 이어지는 완결된 쇼핑 플로우를 순수 HTML·CSS·JavaScript로
                구현한 프로젝트입니다. 외부 프레임워크 없이 브라우저 API를 직접 다루며 DOM 조작,
                이벤트 처리, Canvas 그래픽스의 기초를 체득했습니다.
              </p>

              {/* 핵심 수치 */}
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-px mt-12"
                style={{ border: '1px solid var(--border-subtle)' }}
              >
                {[
                  { value: '4', label: '상품 종류' },
                  { value: '2가지', label: '담기 인터랙션' },
                  { value: 'Canvas', label: '영수증 생성' },
                  { value: '8', label: 'Total Commits' },
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
              <h2
                className="editorial-h2 mb-10"
                style={{ fontSize: 'clamp(22px, 2.8vw, 34px)' }}
              >
                구현 내용
              </h2>
              <ContributionAccordion />
            </section>

            {/* 배운 점 */}
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
