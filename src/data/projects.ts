export interface ProjectLink {
  github?: string;
  video?: string;
  live?: string;
  blog?: string;
  notion?: string;
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
  thumbnailSmall?: string;
  thumbnailWidth?: number;
  thumbnailHeight?: number;
  featured?: boolean;
  stateLabel?: string;
}

export interface FolioDetail extends Project {
  overview: string;
  roles: FolioRole[];
  problems: FolioProblem[];
  lessons: FolioLesson[];
}

export const projects: Project[] = [
  {
    "id": "folio",
    "title": "Folio",
    "subtitle": "AI 분석 기반 포트폴리오 컨설팅",
    "description": "인증 서버와 AI 분석 서버를 연결하고, PDF 업로드부터 분석 결과 확인까지의 사용자 흐름을 구현했습니다.",
    "year": 2026,
    "role": "프론트엔드 전담 · PM 참여",
    "team": "3명 (FE/PM 1 · BE 1 · AI 1)",
    "duration": "2026.01.13 ~ 2026.04.16",
    "status": "shipped",
    "tech": [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "styled-components",
      "Recharts"
    ],
    "achievements": [
      "레벨업 프로그램 4위",
      "AI EXPO KOREA 2026 전시"
    ],
    "links": {
      "github": "https://github.com/Folio-Ai-project/Folio",
      "video": "https://www.youtube.com/watch?v=3BeM9U-I2O4",
      "blog": "https://blog.naver.com/cadoim/224286929147"
    },
    "thumbnail": `${import.meta.env.BASE_URL}folio-detail.webp`,
    "thumbnailSmall": `${import.meta.env.BASE_URL}folio-small.webp`,
    "thumbnailWidth": 1600,
    "thumbnailHeight": 1039,
    "featured": true,
    "stateLabel": "개발 · 전시"
  },
  {
    "id": "phishing-defense",
    "title": "Phishing Defense",
    "subtitle": "직접 대화하며 배우는 피싱 예방 훈련",
    "description": "웹과 서버를 연결하고, 실패한 입력의 복구와 모바일 권한·음성 출력 문제 해결에 참여했습니다.",
    "year": 2026,
    "role": "웹 API 연동 · 모바일 음성 흐름 수정",
    "team": "팀 프로젝트",
    "duration": "2026",
    "status": "shipped",
    "tech": [
      "React",
      "TypeScript",
      "Flutter · 수정 참여"
    ],
    "achievements": [
      "경북 SWgo 해커톤 팀 최우수상"
    ],
    "links": {
      "github": "https://github.com/2026-gbsw-W/Phishing-Defense",
      "blog": "https://blog.naver.com/cadoim/224348927029"
    },
    "thumbnail": "",
    "featured": true,
    "stateLabel": "해커톤 결과물"
  },
  {
    "id": "core",
    "title": "CORE",
    "subtitle": "GPU 자원 신청과 승인을 연결하는 서비스",
    "description": "사용자·관리자의 GPU 자원 신청·승인 UI 프로토타입을 만들고, 팀의 작업 범위와 인터페이스를 정리했습니다.",
    "year": 2026,
    "role": "팀 리드 · 프론트엔드 전담",
    "team": "5명 (FE · BE · 인프라 · AI)",
    "duration": "2026.06 ~ 현재",
    "status": "wip",
    "tech": [
      "React",
      "TypeScript"
    ],
    "achievements": [
      "SW 성장기업 육성지원사업 과제 선정",
      "JunctionX Korea 2026 파트너사 부스"
    ],
    "links": {
      "github": "https://github.com/core-AIforAll/demo",
      "blog": "https://blog.naver.com/cadoim/224387934310"
    },
    "thumbnail": "",
    "featured": true,
    "stateLabel": "프로토타입 · 개발 중"
  },
  {
    "id": "camplog",
    "title": "CampLog",
    "subtitle": "공부할수록 완성되는 나만의 캠프",
    "description": "집중 시간을 기록하고 누적 시간에 따라 캠프사이트가 성장하는 웹 서비스입니다. 타이머·세션 복구·성장 화면을 Spring 백엔드와 연결했습니다.",
    "year": 2026,
    "role": "프론트엔드 · 백엔드 · 디자인",
    "team": "개인 프로젝트",
    "duration": "2026.03.10 ~ 2026.05.10",
    "status": "shipped",
    "tech": [
      "React",
      "TypeScript",
      "Zustand",
      "Spring Boot",
      "JPA",
      "MySQL"
    ],
    "achievements": [],
    "links": {
      "github": "https://github.com/jaeseong09/CampLog",
      "video": "https://www.youtube.com/watch?v=xBRwRgRgOuU"
    },
    "thumbnail": `${import.meta.env.BASE_URL}camplog-detail.webp`,
    "thumbnailSmall": `${import.meta.env.BASE_URL}camplog-small.webp`,
    "thumbnailWidth": 1600,
    "thumbnailHeight": 1039,
    "featured": true,
    "stateLabel": "개인 프로젝트 · 시연 가능"
  },
  {
    "id": "run-a-b",
    "title": "Run-a-B",
    "subtitle": "소상공인 정책 탐색과 AI 리포트",
    "description": "정책 탐색·상세·리포트 화면을 개발하고 로그인 흐름과 서버 API를 연결했습니다.",
    "year": 2026,
    "role": "프론트엔드 전담",
    "team": "4명 (FE 1 · BE 1 · AI 2)",
    "duration": "2026.03.10 ~ 2026.07.06",
    "status": "shipped",
    "tech": [
      "React",
      "TypeScript"
    ],
    "achievements": [],
    "links": {
      "github": "https://github.com/Run-a-B/run-a-b"
    },
    "thumbnail": "",
    "featured": false,
    "stateLabel": "팀 프로젝트"
  },
  {
    "id": "chi-go",
    "title": "chi-go",
    "subtitle": "파크골프 음성 기록 앱 캡스톤",
    "description": "협력 기관과 구장 선택·로그인·QR 초대 요구를 논의하고 화면·데이터 구조·일정의 변경 계획을 기록했습니다.",
    "year": 2026,
    "role": "Expo 초기 설정 · 요구사항 조율 참여",
    "team": "팀 캡스톤",
    "duration": "2026.08 ~ 현재",
    "status": "wip",
    "tech": [
      "React Native",
      "Expo",
      "TypeScript"
    ],
    "achievements": [],
    "links": {
      "github": "https://github.com/chi-go-GBSW/journal/tree/main/jaeseong09"
    },
    "thumbnail": "",
    "featured": false,
    "stateLabel": "캡스톤 진행 중"
  },
  {
    "id": "gbsw-conn",
    "title": "GBSW-CONN",
    "subtitle": "학교 구성원의 제안과 소통",
    "description": "신고에 따른 임시 가림과 신원 열람 규칙, 제안 진행 이력 처리에 참여했습니다.",
    "year": 2026,
    "role": "권한 · 신고 · 상태 처리 수정",
    "team": "팀 프로젝트",
    "duration": "2026",
    "status": "wip",
    "tech": [
      "Next.js",
      "TypeScript"
    ],
    "achievements": [],
    "links": {
      "github": "https://github.com/GBSW/GBSW-CONN"
    },
    "thumbnail": "",
    "featured": false,
    "stateLabel": "개발 · 운영 전"
  },
  {
    "id": "error-mind",
    "title": "ErrorMind",
    "subtitle": "오류 해결 과정을 남기는 개발 기록",
    "description": "오류 등록·탐색·상세 화면과 해결 과정을 작성하는 마크다운 편집기를 개발하고 있습니다.",
    "year": 2026,
    "role": "프론트엔드 UI 개발",
    "team": "개인 프로젝트",
    "duration": "2026.05.05 ~ 현재",
    "status": "wip",
    "tech": [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Zustand"
    ],
    "achievements": [],
    "links": {
      "github": "https://github.com/jaeseong09/error-mind"
    },
    "thumbnail": "",
    "featured": false,
    "stateLabel": "UI 프로토타입"
  },
  {
    "id": "gbsw-web",
    "title": "경소마고실록",
    "subtitle": "학교 전용 커뮤니티",
    "description": "게시판·검색·첨부·프로필 화면을 개발하고 팀의 백엔드와 연결했습니다.",
    "year": 2025,
    "role": "프론트엔드 전담",
    "team": "5명 (FE 1 · BE 1 · 디자인 2 · PM 1)",
    "duration": "2025.09.01 ~ 2025.12.10",
    "status": "shipped",
    "tech": [
      "React",
      "JavaScript",
      "Axios",
      "React Router"
    ],
    "achievements": [],
    "links": {
      "github": "https://github.com/gbsw-wed/gbsw-wed"
    },
    "thumbnail": `${import.meta.env.BASE_URL}gbsw-web-detail.webp`,
    "thumbnailSmall": `${import.meta.env.BASE_URL}gbsw-web-small.webp`,
    "thumbnailWidth": 1600,
    "thumbnailHeight": 1039,
    "featured": false,
    "stateLabel": "팀 프로젝트"
  },
  {
    "id": "decorating-the-house",
    "title": "Homeshop",
    "subtitle": "가구·생활용품 쇼핑 인터페이스",
    "description": "검색·장바구니·드래그앤드롭과 Canvas 영수증 생성 기능을 구현한 학습 프로젝트입니다.",
    "year": 2025,
    "role": "프론트엔드",
    "team": "개인 프로젝트",
    "duration": "2025.09",
    "status": "shipped",
    "tech": [
      "HTML",
      "CSS",
      "JavaScript",
      "jQuery UI",
      "Canvas API"
    ],
    "achievements": [],
    "links": {
      "github": "https://github.com/jaeseong09/Decorating-the-house"
    },
    "thumbnail": "",
    "featured": false,
    "stateLabel": "학습 프로젝트"
  },
  {
    "id": "kott",
    "title": "KOTT",
    "subtitle": "OTT 구독 관리 웹 서비스",
    "description": "OTT 구독 관리 웹 서비스",
    "year": 2025,
    "role": "팀 프로젝트 참여",
    "team": "3명 (FE 2 · BE 1)",
    "duration": "2025.09.05 ~ 2025.11.18",
    "status": "shipped",
    "tech": [
      "HTML",
      "JavaScript",
      "Node.js"
    ],
    "achievements": [],
    "links": {
      "notion": "https://evergreen-hare-fdb.notion.site/KOTT-37459a02a501807ea200febab0af6046"
    },
    "thumbnail": "",
    "featured": false,
    "stateLabel": "팀 프로젝트"
  }
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
        'api.ts에 APP_API_BASE·AI_API_BASE를 분리해 환경 변수로 주입하고, appApiUrl()·aiApiUrl() 헬퍼로 호출 지점을 명확히 구분했습니다.',
        'Vite proxy 설정에서 /api/auth·/api/analyze 등 개발 요청 경로에 따라 목적지 서버를 나누었습니다.',
      ],
    },
    {
      title: 'PDF 포트폴리오 업로드 및 분석 결과 연결',
      problem:
        'AI 분석은 응답까지 수 초가 걸리는 무거운 요청이라, 업로드 직후 결과 페이지로 단순 이동하면 새로고침 시 데이터가 사라지거나 네트워크 에러가 사용자에게 전달되지 않는 문제가 있었습니다.',
      solution: [
        'FormData로 파일과 프롬프트를 함께 FastAPI /api/analyze로 전송하고, 응답을 localStorage에 저장해 새로고침·재방문 시에도 분석 결과를 유지했습니다.',
        'react-router의 navigate state로 결과를 다음 페이지로 전달하면서, 서버 에러 응답(detail·message)을 파싱해 사용자에게 구체적인 실패 원인을 보여주는 UX를 구현했습니다.',
      ],
    },
    {
      title: 'JWT 기반 인증 + Redux 전역 상태 설계',
      problem:
        '로그인 상태를 각 페이지에서 개별적으로 localStorage를 읽어 판단하면, 토큰 만료·로그아웃 시 UI가 일관되게 갱신되지 않는 문제가 있었습니다.',
      solution: [
        'Redux Toolkit으로 loginSlice를 만들어 login·logout·setLogin 액션을 통일하고, 앱 시작 시 토큰 유무로 전역 로그인 상태를 초기화했습니다.',
        '수동 로그아웃에는 토큰 제거와 Redux 상태 갱신을 연결했습니다. 마이페이지의 401·403 응답에는 토큰을 제거하고 로그인 페이지로 이동하도록 처리했습니다.',
      ],
    },
    {
      title: '서비스 전반의 UI 디자인 시스템 구축',
      problem:
        '페이지마다 스타일이 제각각이면 유지보수 비용이 커지고, 분석 결과 화면처럼 점수·차트가 많은 페이지는 일관된 비주얼 언어 없이는 정보 위계가 무너지는 문제가 있었습니다.',
      solution: [
        'styled-components로 Wrapper·Card·SectionHeader 등 재사용 가능한 컴포넌트를 정의하고, 프라이머리 컬러(#46BEFF)와 간격·라운드·그림자 값을 상수화해 디자인 토큰 체계로 통일했습니다.',
        'recharts 기반 스킬 레이더·막대 차트와 conic-gradient를 활용한 원형 점수 그래프를 직접 설계해, 분석 결과를 한눈에 읽을 수 있는 대시보드형 화면을 구현했습니다.',
      ],
    },
  ],
  problems: [
    {
      title: '두 종류 백엔드 동시 연동 시 API 경로 관리',
      issue:
        '사용자 인증은 Node/Express, 포트폴리오 분석은 FastAPI가 담당했습니다. 목적과 주소가 다른 두 서버의 호출 경로를 구분하고, 환경에 따라 서버 주소를 바꿀 수 있는 구조가 필요했습니다.',
      solution:
        'api.ts에 APP_API_BASE·AI_API_BASE를 환경 변수(VITE_API_BASE, VITE_AI_BASE)로 분리하고 appApiUrl()·aiApiUrl() 헬퍼 함수로 호출 지점을 구분했습니다. Vite proxy로 /api/auth·/api/profile은 Node 서버, /api/analyze·/api/layout·/api/ocr은 FastAPI 서버로 경로별 프록시를 구성했습니다.',
      result:
        '환경별 서버 주소를 설정으로 분리하고 개발 환경에서는 경로별 프록시를 사용했습니다. 서버 주소 변경 시 개별 화면을 수정해야 하는 부담을 줄였습니다.',
    },
    {
      title: '이동 상태가 없어도 분석 결과를 다시 확인하도록',
      issue:
        '페이지 이동으로 전달한 분석 데이터가 없는 경우에도 이전 결과를 확인할 수 있도록, 브라우저에 결과를 저장하고 다시 읽는 경로가 필요했습니다.',
      solution:
        '분석 응답을 localStorage(ANALYSIS_STORAGE_KEY)에 JSON 직렬화해 영속 저장하고, 결과 페이지는 navigate state가 없을 경우 localStorage를 폴백으로 조회하는 이중 소스 구조를 설계했습니다. 서버 에러의 detail·message 필드를 파싱해 HTTP 상태 코드가 아닌 구체적인 실패 원인을 사용자에게 전달하도록 에러 UX도 개선했습니다.',
      result:
        '브라우저에 저장된 결과를 다시 읽도록 구성해 새로고침 뒤에도 결과를 확인할 수 있게 했습니다. 분석을 다시 요청하기 전에 기존 결과를 재사용할 수 있습니다.',
    },
  ],
  lessons: [
    {
      title: '협업과 문서화의 중요성',
      body: '역할과 API 응답을 문서로 정리하고, 변경 사항을 팀원들과 공유하는 습관을 배웠습니다.',
    },
    {
      title: '서버 연동 설계의 관점',
      body: '서버마다 다른 목적과 응답 구조를 파악하고 프론트엔드의 호출 경로를 명확히 나누었습니다.',
    },
    {
      title: 'Git을 통한 협업',
      body: '변경한 코드와 이유를 기록해 팀원이 작업 내용을 이해하고 이어갈 수 있도록 했습니다.',
    },
    {
      title: 'AI 서비스에서의 UX 설계',
      body: '전시에서 분석 기준과 실제 이용 가능성에 대한 질문을 받았습니다. 결과를 보여 주는 것과 그 근거를 설명하는 것을 함께 고민하게 됐습니다.',
    },
  ],
};
