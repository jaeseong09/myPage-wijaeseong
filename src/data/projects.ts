export interface ProjectLink {
  github?: string;
  video?: string;
  live?: string;
}

export interface FolioRole {
  title: string;
  problem: string;
  solution: string[];
}

export interface FolioLesson {
  title: string;
  body: string;
}

export interface FolioProblem {
  title: string;
  issue: string;
  solution: string;
  result: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  year: number;
  role: string;
  team: string;
  duration: string;
  status: 'shipped' | 'wip' | 'hidden';
  tech: string[];
  achievements: string[];
  links: ProjectLink;
  thumbnail: string;
}

export interface FolioDetail extends Project {
  overview: string;
  roles: FolioRole[];
  problems: FolioProblem[];
  lessons: FolioLesson[];
}

export const projects: Project[] = [
  {
    id: 'folio',
    title: 'Folio',
    subtitle: 'AI 분석 기반 포트폴리오 컨설팅',
    description:
      'AI가 포트폴리오를 분석해 피드백과 개선 방향을 제시하는 웹 서비스입니다.',
    year: 2026,
    role: 'Frontend Lead (PM 참여)',
    team: '3명 (FE/PM 1 · BE 1 · AI 1)',
    duration: '2026.01.13 ~ 2026.04.16',
    status: 'shipped',
    tech: ['React', 'TypeScript', 'Node.js/Express', 'FastAPI', 'MySQL', 'OpenAI API'],
    achievements: [
      '경북소프트웨어마이스터고 레벨업 프로그램 4등',
      'AI EXPO KOREA 2026 전시',
    ],
    links: {
      github: 'https://github.com/Folio-AI-project',
      video: 'https://www.youtube.com/watch?v=3BeM9U-I2O4',
    },
    thumbnail: `${import.meta.env.BASE_URL}folio-thumbnail.png`,
  },
  {
    id: 'gbsw-web',
    title: '경소마고실록',
    subtitle: '학교 커뮤니티 플랫폼',
    description:
      '경북소프트웨어마이스터고 학생들을 위한 게시판·커뮤니티 서비스로, 게시글 CRUD·좋아요·검색·페이지네이션·파일 첨부·프로필 관리를 갖춘 풀스택 웹입니다.',
    year: 2025,
    role: 'Frontend (전담)',
    team: '팀 프로젝트 (FE 단독 · BE 팀)',
    duration: '2025.03 ~ 2025.06',
    status: 'shipped',
    tech: ['React 19', 'Vite', 'React Bootstrap', 'Axios', 'React Router 7', 'Node.js/Express', 'MySQL'],
    achievements: [],
    links: {
      github: 'https://github.com/gbsw-wed/gbsw-wed',
    },
    thumbnail: `${import.meta.env.BASE_URL}gbsw-web-thumbnail.png`,
  },
  {
    id: 'decorating-the-house',
    title: 'Homeshop',
    subtitle: '가구·생활용품 쇼핑 인터페이스',
    description:
      '가구·생활용품 4종을 검색·장바구니 담기·드래그앤드롭으로 관리하고, Canvas API로 영수증을 즉석 생성하는 쇼핑 인터페이스입니다.',
    year: 2025,
    role: 'Frontend (개인)',
    team: '개인 프로젝트',
    duration: '2025.09',
    status: 'shipped',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'jQuery UI', 'Bootstrap 5', 'Canvas API'],
    achievements: [],
    links: {
      github: 'https://github.com/jaeseong09/Decorating-the-house',
    },
    thumbnail: '',
  },
  {
    id: 'camplog',
    title: 'CampLog',
    subtitle: '캠핑 감성 집중력 관리 플랫폼',
    description:
      '공부 시간이 쌓일수록 나만의 캠프사이트가 성장하는 집중력 관리 서비스입니다. 실시간 모닥불 피드백으로 집중도를 시각화하고, 사운드스케이프·소셜 편대 캠핑 기능을 제공합니다.',
    year: 2026,
    role: '풀스택 (개인)',
    team: '개인 프로젝트',
    duration: '2026.04 ~ 진행 중',
    status: 'wip',
    tech: ['React', 'TypeScript', 'Vite', 'Spring Boot', 'JPA', 'MySQL', 'Web Audio API', 'AWS EC2/S3'],
    achievements: [],
    links: {
      github: 'https://github.com/jaeseong09/CampLog',
    },
    thumbnail: `${import.meta.env.BASE_URL}camplog-thumbnail.png`,
  },
];

export const folioDetail: FolioDetail = {
  ...projects[0],
  overview:
    '개발자 포트폴리오를 객관적으로 점검받을 방법은 현직자 리뷰나 스터디 피드백 정도로 제한적이었고, 학생 입장에서는 "내 포트폴리오의 수준과 보완점"을 판단하기 어려웠습니다. 이 문제에서 출발해 PDF를 업로드하면 AI가 구조·기술 스택·서술 방식을 분석하고 구체적인 개선점을 제안하는 서비스 Folio를 기획·개발했습니다.',
  roles: [
    {
      title: '두 종류 백엔드(Node API · FastAPI AI 서버) 동시 연동',
      problem:
        '사용자 인증·프로필은 Node + Express 서버가, 포트폴리오 분석은 Python FastAPI 서버가 담당하는 구조였기 때문에, 프론트에서 두 서버의 주소를 단순히 하드코딩하면 환경 전환 시마다 수정이 필요하고 API 호출 흐름이 뒤섞이는 문제가 있었습니다.',
      solution: [
        '`api.ts`에 `APP_API_BASE`·`AI_API_BASE`를 분리해 환경 변수로 주입하고, `appApiUrl()`·`aiApiUrl()` 헬퍼로 호출 지점을 명확히 구분했습니다.',
        'Vite `proxy` 설정으로 개발 환경에서는 `/api/auth`·`/api/analyze` 등 경로별로 목적지 서버를 자동 라우팅해 CORS 이슈 없이 두 서버를 동시에 붙여 개발 가능한 구조를 확보했습니다.',
      ],
    },
    {
      title: 'PDF 포트폴리오 업로드 및 분석 결과 연결',
      problem:
        'AI 분석은 응답까지 수 초가 걸리는 무거운 요청이라, 업로드 직후 결과 페이지로 단순 이동하면 새로고침 시 데이터가 사라지거나 네트워크 에러가 사용자에게 전달되지 않는 문제가 있었습니다.',
      solution: [
        '`FormData`로 파일과 프롬프트를 함께 FastAPI `/api/analyze`로 전송하고, 응답을 `localStorage`에 저장해 새로고침·재방문 시에도 분석 결과를 유지했습니다.',
        '`react-router`의 `navigate state`로 결과를 다음 페이지로 전달하면서, 서버 에러 응답(`detail`·`message`)을 파싱해 사용자에게 구체적인 실패 원인을 보여주는 UX를 구현했습니다.',
      ],
    },
    {
      title: 'JWT 기반 인증 + Redux 전역 상태 설계',
      problem:
        '로그인 상태를 각 페이지에서 개별적으로 `localStorage`를 읽어 판단하면, 토큰 만료·로그아웃 시 UI가 일관되게 갱신되지 않는 문제가 있었습니다.',
      solution: [
        'Redux Toolkit으로 `loginSlice`를 만들어 `login`·`logout`·`setLogin` 액션을 통일하고, 앱 시작 시 토큰 유무로 전역 로그인 상태를 초기화했습니다.',
        '토큰 만료(401) 응답 시 `localStorage`를 정리하고 Redux 상태를 함께 내려, 네비게이션·마이페이지·분석 요청이 동일한 로그인 상태를 공유하도록 구성했습니다.',
      ],
    },
    {
      title: '서비스 전반의 UI 디자인 시스템 구축',
      problem:
        '페이지마다 스타일이 제각각이면 유지보수 비용이 커지고, 분석 결과 화면처럼 점수·차트가 많은 페이지는 일관된 비주얼 언어 없이는 정보 위계가 무너지는 문제가 있었습니다.',
      solution: [
        '`styled-components`로 `Wrapper`·`Card`·`SectionHeader` 등 재사용 가능한 컴포넌트를 정의하고, 프라이머리 컬러(`#46BEFF`)와 간격·라운드·그림자 값을 상수화해 디자인 토큰 체계로 통일했습니다.',
        '`recharts` 기반 스킬 레이더·막대 차트와 `conic-gradient`를 활용한 원형 점수 그래프를 직접 설계해, 분석 결과를 한눈에 읽을 수 있는 대시보드형 화면을 구현했습니다.',
      ],
    },
  ],
  problems: [
    {
      title: '두 종류 백엔드 동시 연동 시 API 경로 관리',
      issue:
        '사용자 인증은 Node/Express, 포트폴리오 분석은 FastAPI가 담당하는 구조에서 프론트가 두 서버 주소를 직접 호출하면 환경 전환마다 코드 수정이 필요했습니다. 개별 컴포넌트에 fetch URL을 하드코딩하면 서버 주소 변경 시 수정 누락이 발생하고, 개발 환경에서는 두 서버 모두 CORS 이슈가 동시에 발생했습니다.',
      solution:
        '`api.ts`에 `APP_API_BASE`·`AI_API_BASE`를 환경 변수(`VITE_API_BASE`, `VITE_AI_BASE`)로 분리하고 `appApiUrl()`·`aiApiUrl()` 헬퍼 함수로 호출 지점을 구분했습니다. Vite `proxy`로 `/api/auth`·`/api/profile`은 Node 서버, `/api/analyze`·`/api/layout`·`/api/ocr`은 FastAPI 서버로 경로 기반 자동 라우팅을 구성해 CORS 없이 두 서버를 동시에 개발할 수 있는 구조를 확보했습니다.',
      result:
        '환경 전환 시 `.env` 파일만 수정하면 되도록 전환 비용을 최소화하고 개발 환경의 CORS 이슈를 완전히 제거했습니다. 호출 지점이 아닌 진입점에서 분기하는 것이 유지보수성을 크게 높인다는 점을 체득했습니다.',
    },
    {
      title: 'AI 분석 결과의 새로고침 시 데이터 유실',
      issue:
        'AI 분석은 PDF 파싱과 OpenAI 호출을 거쳐 수 초가 소요되는 무거운 요청으로, 결과 페이지에서 새로고침하거나 뒤로 가기 시 데이터가 사라져 재분석 외에는 복구 방법이 없었습니다. `react-router`의 `navigate state`만으로는 새로고침 시 메모리 상태가 초기화되어 빈 화면이 노출됐습니다.',
      solution:
        '분석 응답을 `localStorage`(`ANALYSIS_STORAGE_KEY`)에 JSON 직렬화해 영속 저장하고, 결과 페이지는 `navigate state`가 없을 경우 `localStorage`를 폴백으로 조회하는 이중 소스 구조를 설계했습니다. 서버 에러의 `detail`·`message` 필드를 파싱해 HTTP 상태 코드가 아닌 구체적인 실패 원인을 사용자에게 전달하도록 에러 UX도 개선했습니다.',
      result:
        '새로고침·뒤로가기·재방문 시에도 분석 결과가 유지되어 불필요한 재분석 요청을 제거하고 AI 호출 비용을 절감했습니다. 실시간 상태와 영속 상태를 하나의 계층에 섞지 않고 분리하는 것이 안정적 UX의 핵심임을 배웠습니다.',
    },
  ],
  lessons: [
    {
      title: '협업과 문서화의 중요성',
      body: '협업은 같이 있는 것이 아니라 기록이 남는 구조를 만드는 일입니다.',
    },
    {
      title: '서버 연동 설계의 관점',
      body: '네트워크 문제가 아니라 두 시스템이 서로 지킬 약속을 설계하는 일입니다.',
    },
    {
      title: 'Git을 통한 협업',
      body: 'Git은 저장 도구가 아니라 팀이 코드로 대화하는 언어입니다.',
    },
    {
      title: 'AI 서비스에서의 UX 설계',
      body: '모델 연결이 아니라 느리고 예측 어려운 점을 감싸 주는 UX 설계입니다.',
    },
  ],
};
