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
    thumbnail: '/images/folio-mockup.png',
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
