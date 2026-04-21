# 위재성 포트폴리오 사이트

> **이 파일은 Claude Code가 프로젝트 컨텍스트를 이해하기 위한 지침서입니다.**
> 작업 시작 전 반드시 이 파일과 `docs/` 폴더를 먼저 읽어주세요.

---

## 프로젝트 개요

**목적**: 명함 QR 코드에 들어갈 개인 포트폴리오 사이트
**타겟**: 스타트업·중견기업 CTO, 기술 팀리드
**핵심 차별점**: 인터랙션·디자인 자체가 작품이 되는 사이트 (사이트 방문 경험 = 실력 증명)

---

## 기술 스택 (확정)

| 역할 | 기술 | 비고 |
|------|------|------|
| 빌드 | Vite + React 18 | GitHub Pages 정적 배포 |
| 언어 | TypeScript | strict mode |
| 스타일 | Tailwind CSS | 다크모드 고정 |
| 라우팅 | React Router v7 | `/`, `/projects/folio` |
| 애니메이션 | Framer Motion | layoutId 핵심 |
| 아이콘 | Lucide React | |
| 폰트 | Pretendard Variable + JetBrains Mono | |
| 배포 | GitHub Pages | 학교 도메인 연결 예정 |

**중요**:
- Next.js 사용 금지 (GitHub Pages 제약)
- 다크모드 고정, 라이트모드 토글 없음
- localStorage/sessionStorage 사용 금지 (정적 호스팅 기본 방침)

---

## 디자인 토큰

```css
--bg-primary: #0A0E1A;              /* 메인 배경 */
--bg-surface: rgba(255,255,255,0.02); /* 카드 */
--border-subtle: rgba(255,255,255,0.08);
--accent-primary: #46BEFF;          /* Folio 프라이머리 */
--accent-strong: #378ADD;           /* CTA */
--accent-light: #85B7EB;            /* 링크/태그 */
--text-primary: #E6EDF5;            /* 본문 */
--text-muted: rgba(230,237,245,0.5);
```

**폰트 규칙**:
- 본문/제목: Pretendard Variable
- 코드/숫자/태그: JetBrains Mono
- 제목 자간 -0.02em
- 본문 line-height 1.7

---

## 사이트 구조

### 메인 페이지 (`/`) — 원페이지 스크롤
1. **Hero** — 타이핑 애니메이션, spotlight 효과
2. **About** — 짧은 한 문단 (나머지는 뒤 섹션이 증명)
3. **Skills** — Front-end / Backend / Other 3분류
4. **Projects** — Folio 1개 (CampLog는 MVP 완성 후 추가)
5. **Achievements** — 수상·활동 기록
6. **Contact** — 이메일 + 소셜 링크

### 상세 페이지 (`/projects/folio`)
- Shared element transition (Framer Motion `layoutId`) 필수
- 좌측 sticky 라벨 + 우측 콘텐츠 2컬럼 구조

---

## 말투 가이드

**"─합니다" 체 고정**. 자신감 있고 전문가답게.

- ✅ "두 종류 백엔드를 동시 연동했습니다"
- ❌ "두 종류 백엔드 연동해봤어요"
- ❌ "나름대로 만들어봤습니다"

---

## 시그니처 모멘트 (놓치면 안 됨)

1. **Projects 카드 → 상세페이지 Shared Element Transition** (최우선)
2. **Hero 타이핑 + 마우스 spotlight**
3. **Skills 아이콘 클릭 → 상세 패널 확장**

---

## 폴더 구조 (따라야 함)

```
src/
├── components/
│   ├── layout/        # Navbar, Footer, ScrollProgress, CustomCursor
│   ├── sections/      # Hero, About, Skills, Projects, Achievements, Contact
│   └── ui/            # Button, Badge, Card
├── pages/
│   ├── Home.tsx
│   └── projects/
│       └── Folio.tsx
├── data/              # 콘텐츠 데이터 (타입 분리)
│   ├── profile.ts
│   ├── skills.ts
│   ├── projects.ts
│   └── achievements.ts
├── hooks/
│   ├── useScrollProgress.ts
│   └── useIntersection.ts
├── styles/
│   ├── globals.css
│   └── tokens.css
└── App.tsx
```

---

## 작업 원칙

1. **한 번에 한 섹션씩**. 전체를 동시에 만들지 말 것.
2. **접근성 필수**: `prefers-reduced-motion`, 키보드 네비, alt 텍스트.
3. **TypeScript strict**: any 금지, 타입 명시.
4. **커밋 단위 작게**: 기능별로 쪼개서 커밋.
5. **콘텐츠는 `data/` 폴더로 분리**: 하드코딩 금지.

---

## 진행 순서 (Week별)

1. 프로젝트 셋업 + 디자인 토큰 + 글로벌 레이아웃
2. Hero + About + Skills
3. **Projects 카드 + 상세페이지 + Shared Element Transition (핵심)**
4. Achievements + Contact + 커스텀 커서
5. 반응형 + Lighthouse 최적화
6. 배포 + 도메인 연결

---

## 참고 문서

- `docs/CONTENT.md` — 실제 들어갈 콘텐츠 (Notion에서 가져온 내용)
- `docs/DESIGN.md` — 상세 디자인 가이드
- `docs/INTERACTIONS.md` — 각 인터랙션 구현 힌트

---

## 하지 말 것 (Do NOT)

- ❌ Next.js, Remix 같은 SSR 프레임워크 사용
- ❌ styled-components, emotion (Tailwind로 통일)
- ❌ Redux, Zustand 같은 상태 관리 라이브러리 (이 사이트에 필요 없음)
- ❌ 라이트 모드 구현
- ❌ 이력서 PDF 다운로드 기능
- ❌ Blog 섹션 (Contact에 링크만)
- ❌ CampLog 카드 (MVP 완성 전까지 숨김)
- ❌ 복잡한 3D 라이브러리 (Three.js 등, 로딩 느려짐)
