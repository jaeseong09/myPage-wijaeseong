# 사이트 콘텐츠

이 파일은 사이트에 실제로 들어갈 텍스트/데이터입니다. 하드코딩하지 말고 `src/data/` 폴더에 TypeScript 모듈로 구조화하세요.

---

## Profile

```
Name: 위재성
Tagline: 프론트엔드 개발자
Location: 경북, 설천
School: 경북소프트웨어 마이스터 고등학교 (GBSW)
Email: jaeseongwi48@gmail.com
Phone: 010-4629-0813
```

### 소셜
- GitHub: https://github.com/jaeseong09
- Velog: https://velog.io/@wijaeseong/posts
- Naver Blog: https://blog.naver.com/cadoim

---

## Hero 카피

**메인 타이틀** (타이핑 애니메이션):
```
사용자 경험과 안정적인 서비스 구현을 함께 고민하며,
직관적인 인터페이스를 개발하는 프론트엔드 개발자
위재성입니다.
```

※ "프론트엔드 개발자" 부분은 `--accent-primary` 컬러 + 그라데이션 강조

**서브 카피**:
```
웹 성능과 사용자 경험 개선에 집중하며,
반응형 웹과 직관적인 UI 설계를 통해
다양한 환경에서도 일관된 경험을 제공합니다.
```

---

## About 섹션 (짧게)

```
프론트엔드 개발자 위재성입니다.
React · TypeScript를 기반으로 사용자 경험과 안정적인 서비스 구현을 함께 고민합니다.
백엔드에 대한 이해를 바탕으로 팀과 명확한 약속을 세우는 협업을 지향합니다.
```

---

## Skills 데이터

### Front-end
- React
- TypeScript

### Backend
- Spring Boot
- Java
- MySQL

### Other
- Figma (UI/UX)
- Git · GitHub

※ 각 스킬 클릭 시 상세 패널 확장. 상세 내용은 일단 Placeholder, 추후 추가.

---

## Projects 데이터

### 1. Folio (완료 · 표시 ON)

```yaml
id: folio
title: Folio
subtitle: AI 분석 기반 포트폴리오 컨설팅
description: AI가 포트폴리오를 분석해 피드백과 개선 방향을 제시하는 웹 서비스
year: 2026
role: Frontend Lead (PM 참여)
team: "3명 (FE/PM 1 · BE 1 · AI 1)"
duration: "2026.01.13 ~ 2026.04.16"
status: shipped
tech: [React, TypeScript, Node.js/Express, FastAPI, MySQL, OpenAI API]
achievements:
  - 경북소프트웨어마이스터고 레벨업 프로그램 4등
  - AI EXPO KOREA 2026 전시
links:
  github: https://github.com/Folio-AI-project
  video: https://www.youtube.com/watch?v=3BeM9U-I2O4
thumbnail: /images/folio-mockup.png
```

### 2. CampLog (진행중 · 표시 OFF)

```yaml
id: camplog
title: CampLog
subtitle: 공부할수록 완성되는 나만의 캠프
description: 집중 시간 관리 웹 서비스
year: 2026
team: 개인 프로젝트
duration: "2026.03.10 ~ 진행중"
status: hidden  # MVP 완성 전까지 사이트에 표시하지 않음
tech: [React, TypeScript, Spring Boot, MySQL]
```

---

## Folio 상세 페이지

### 개요
**AI가 포트폴리오를 분석해 피드백과 개선 방향을 제시하는 웹 서비스**

개발자 포트폴리오를 객관적으로 점검받을 방법은 현직자 리뷰나 스터디 피드백 정도로 제한적이었고, 학생 입장에서는 "내 포트폴리오의 수준과 보완점"을 판단하기 어려웠습니다. 이 문제에서 출발해 PDF를 업로드하면 AI가 구조·기술 스택·서술 방식을 분석하고 구체적인 개선점을 제안하는 서비스 Folio를 기획·개발했습니다.

🏆 **경북소프트웨어마이스터고 레벨업 프로그램 4등 · AI EXPO KOREA 2026 전시**

### 담당한 역할 (4가지 — 아코디언 UI)

#### 1. 두 종류 백엔드(Node API · FastAPI AI 서버) 동시 연동

사용자 인증·프로필은 Node + Express 서버가, 포트폴리오 분석은 Python FastAPI 서버가 담당하는 구조였기 때문에, 프론트에서 두 서버의 주소를 단순히 하드코딩하면 환경 전환 시마다 수정이 필요하고 API 호출 흐름이 뒤섞이는 문제가 있었습니다.

- `api.ts`에 `APP_API_BASE`·`AI_API_BASE`를 분리해 환경 변수로 주입하고, `appApiUrl()`·`aiApiUrl()` 헬퍼로 호출 지점을 명확히 구분
- Vite `proxy` 설정으로 개발 환경에서는 `/api/auth`·`/api/analyze` 등 경로별로 목적지 서버를 자동 라우팅해 CORS 이슈 없이 두 서버를 동시에 붙여 개발 가능한 구조를 확보

#### 2. PDF 포트폴리오 업로드 및 분석 결과 연결

AI 분석은 응답까지 수 초가 걸리는 무거운 요청이라, 업로드 직후 결과 페이지로 단순 이동하면 새로고침 시 데이터가 사라지거나 네트워크 에러가 사용자에게 전달되지 않는 문제가 있었습니다.

- `FormData`로 파일과 프롬프트를 함께 FastAPI `/api/analyze`로 전송하고, 응답을 `localStorage`(`ANALYSIS_STORAGE_KEY`)에 저장해 새로고침·재방문 시에도 분석 결과를 유지
- `react-router`의 `navigate state`로 결과를 다음 페이지로 전달하면서, 서버 에러 응답(`detail`·`message`)을 파싱해 사용자에게 구체적인 실패 원인을 보여주는 UX 개선

#### 3. JWT 기반 인증 + Redux 전역 상태 설계

로그인 상태를 각 페이지에서 개별적으로 `localStorage`를 읽어 판단하면, 토큰 만료·로그아웃 시 UI가 일관되게 갱신되지 않는 문제가 있었습니다.

- Redux Toolkit으로 `loginSlice`를 만들어 `login`·`logout`·`setLogin` 액션을 통일하고, 앱 시작 시 토큰 유무로 전역 로그인 상태를 초기화
- 토큰 만료(401) 응답 시 `localStorage`를 정리하고 Redux 상태를 함께 내려, 네비게이션·마이페이지·분석 요청이 동일한 로그인 상태를 공유하도록 구성

#### 4. 서비스 전반의 UI 디자인 시스템 구축

페이지마다 스타일이 제각각이면 유지보수 비용이 커지고, 분석 결과 화면처럼 점수·차트가 많은 페이지는 일관된 비주얼 언어 없이는 정보 위계가 무너지는 문제가 있었습니다.

- `styled-components`로 `Wrapper`·`Card`·`SectionHeader` 등 재사용 가능한 컴포넌트를 정의하고, 프라이머리 컬러(`#46BEFF`)와 간격·라운드·그림자 값을 상수화해 디자인 토큰 체계로 통일
- `recharts` 기반 스킬 레이더·막대 차트와 `conic-gradient`를 활용한 원형 점수 그래프를 직접 설계해, 분석 결과를 한눈에 읽을 수 있는 대시보드형 화면을 구현

### 결과물 갤러리 (3개 그룹)

#### 1. 온보딩 · 인증 플로우 (메인/가입/로그인)
- **메인 랜딩**: 명확한 가치 제안 문구 · 파일 업로드+프롬프트 통합 · 핵심 기능 3가지 체크 아이콘
- **회원가입**: 최소 필드 · 약관 동의 분리 · 로그인 이동 링크로 오진입 이탈 방지
- **로그인**: 두 필드로 단순화 · 가입 화면과 동일 레이아웃 · JWT localStorage+Redux 동기화

#### 2. 포트폴리오 분석 결과 (대시보드/차트)
- **분석 리포트**: 프로필·역량 레이더·직무 적합도 3단 카드 · Recharts 시각화 · 기술 태그 칩
- **AI 커리어 컨설팅**: 현재 역량→부족 스킬→액션 플랜 (진단→격차→처방) · 우선순위 뱃지 · 예상 소요 기간

#### 3. 개인화 영역 (마이페이지/로드맵/기업추천)
- **마이페이지**: 서버 저장 + localStorage 캐싱 병행 · 401 자동 로그아웃 · 분석 리포트와 동일 카드 레이아웃
- **성장 로드맵**: AI 분석→학습 경로 재구성 · 단계별 예상 기간 · 카드형 진행 추적
- **기업 추천**: 기술 스택·경력 기반 매칭 · 요구 스킬 vs 보유 스킬 대비 · 분석→로드맵→추천 흐름 최종 단계

### 문제 해결 과정

#### 문제 1: 두 종류 백엔드 서버 동시 연동 시 API 경로 관리 문제
**상황**: Node/Express + Python FastAPI 구조에서 프론트가 두 서버 주소를 직접 호출 시 환경 전환마다 코드 수정 필요
**해결**: `api.ts` 분리 + 환경 변수 주입 + Vite proxy 경로 기반 자동 라우팅
**결과**: `.env` 파일만 수정하면 전환 · CORS 이슈 완전 제거

#### 문제 2: AI 분석 결과의 새로고침 시 데이터 유실 문제
**상황**: AI 분석 수 초 소요 · 새로고침/뒤로가기 시 결과 데이터 소실 · 재분석 외 복구 불가
**해결**: `localStorage` JSON 영속 저장 + `navigate state` 폴백 이중 소스 구조 + 에러 detail/message 파싱
**결과**: 새로고침·뒤로가기·재방문 시에도 결과 유지 · 불필요한 재분석 제거

### 배운 점 (4가지 카드)

1. **협업과 문서화의 중요성** — 협업은 같이 있는 것이 아니라 기록이 남는 구조를 만드는 일
2. **서버 연동 설계의 관점** — 네트워크 문제가 아니라 두 시스템이 서로 지킬 약속을 설계하는 일
3. **Git을 통한 협업** — Git은 저장 도구가 아니라 팀이 코드로 대화하는 언어
4. **AI 서비스에서의 UX 설계** — 모델 연결이 아니라 느리고 예측 어려운 점을 감싸 주는 UX 설계

---

## Achievements 섹션

```yaml
- emoji: 🏆
  title: 경북소프트웨어마이스터고 레벨업 프로그램 4등
  year: 2026
  project: Folio
- emoji: 🎨
  title: AI EXPO KOREA 2026 전시
  year: 2026
  project: Folio
- emoji: 🎯
  title: WINE 동아리 (Web Is Not Easy) Java OOP 강의 진행
  year: 2026
- emoji: 🚀
  title: CodeNest Discord 서버 웹개발 대표
  description: 후배 멘토링 및 협업 프로젝트 운영
```

---

## Contact 섹션 카피

**헤더**: "Let's work together"

**서브**: "협업·채용 관련 문의는 이메일로 연락 부탁드립니다."

**필드**:
- Email: jaeseongwi48@gmail.com (클릭 시 복사)
- GitHub: github.com/jaeseong09
- Velog: velog.io/@wijaeseong
- Naver Blog: blog.naver.com/cadoim
