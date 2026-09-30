export interface CaseStudyContent {
  intro: string;
  contributions: string[];
  problems: { title: string; problem: string; solution: string; result: string }[];
  results: string[];
  next?: string[];
  evidence: { label: string; url: string }[];
}

export const caseStudies: Record<string, CaseStudyContent> = {
  'phishing-defense': {
    intro: '피싱 상황을 대화로 경험하며 대응을 연습할 수 있도록 팀원들과 개발한 서비스입니다. 경북 SWgo 해커톤에서 웹·서버 연결과 모바일 음성 문제 수정에 참여했습니다.',
    contributions: ['웹 화면과 실제 서버 API를 연결하고 전송 실패 시 작성한 입력을 복구했습니다.', '모바일 마이크·네트워크 권한과 TTS·오디오 경로를 수정하며 통화 흐름을 점검했습니다.', '팀원들이 각자의 아이디어를 적고 비교하도록 먼저 제안하고, 제한된 시간에 맞춰 개발 범위를 함께 조정했습니다.'],
    problems: [
      { title: '요청에 실패해도 작성한 입력을 잃지 않도록', problem: '서버와 연동하는 과정에서 전송 실패가 사용자 입력의 유실로 이어질 수 있었습니다.', solution: '실제 API 연결과 함께 실패한 요청의 입력을 복구하는 흐름을 구현했습니다.', result: '요청 성공 여부에 따라 입력 상태를 다루도록 개선했습니다.' },
      { title: '모바일의 권한과 음성 흐름 연결', problem: '앱과 AI를 연결하면서 권한과 오디오 출력 경로 등 여러 조건을 함께 확인해야 했습니다.', solution: '마이크·네트워크 권한, TTS 폴백과 오디오 경로를 점검하고 관련 코드를 수정했습니다.', result: '웹 작업에 더해 모바일에서 발생한 통합 문제 해결에 참여했습니다.' },
    ],
    results: ['경북 SWgo 해커톤에서 팀 최우수상을 받았습니다.', '서로의 진행 상황을 공유하고 완성할 범위를 조정하는 협업의 중요성을 배웠습니다.'],
    evidence: [
      { label: '음성·권한 수정 커밋', url: 'https://github.com/2026-gbsw-W/Phishing-Defense/commit/404c93097fe284e461da569635525b678ee06295' },
      { label: '전송 실패 시 입력 복구', url: 'https://github.com/2026-gbsw-W/Phishing-Defense/commit/4ebf814f11efd0d9d78265ac5a01acfedf311325' },
      { label: '해커톤 회고', url: 'https://blog.naver.com/cadoim/224348927029' },
    ],
  },
  core: {
    intro: 'GPU 자원을 여러 사용자가 나누어 쓸 수 있도록 관리하는 프로젝트입니다. 5명 팀에서 팀 리드와 프론트엔드를 맡아 신청·승인 흐름의 사용자 화면과 관리자 화면을 구현했습니다.',
    contributions: ['GPU 자원 신청·승인 흐름 전반의 UI 프로토타입을 구현하고 프론트엔드를 전담했습니다.', '백엔드·인프라·AI로 나뉜 팀의 작업 범위와 화면에서 필요한 인터페이스를 정리했습니다.', '서비스 소개 사이트를 만들고 JunctionX Korea 2026 파트너사 부스에서 프로젝트를 소개했습니다.'],
    problems: [
      { title: '사용자 신청과 관리자 승인을 하나의 흐름으로', problem: '자원을 신청하는 사용자와 요청을 검토하는 관리자가 확인해야 할 정보가 달랐습니다.', solution: '역할별 화면을 구분하고 신청·검토·승인 상태에 필요한 UI와 데이터 흐름을 정리했습니다.', result: '팀이 함께 검토할 수 있는 사용자·관리자 UI 프로토타입을 만들었습니다.' },
      { title: '개발 내용과 외부의 질문 연결', problem: '전시에서는 구현 방법뿐 아니라 서비스의 필요성과 사업성에 관한 질문도 받았습니다.', solution: '배너·전단지·소개 페이지를 준비하고 현직 개발자와 기업 관계자에게 서비스를 설명했습니다.', result: '기술적 설명과 실제 활용 가능성을 함께 고민할 수 있는 피드백을 얻었습니다.' },
    ],
    results: ['2026 경북 SW 성장기업 육성지원사업 과제로 선정되어 중간발표를 진행했습니다.', 'JunctionX Korea 2026에 파트너사로 참여해 부스를 운영했습니다.', '프론트엔드 UI와 팀의 인터페이스 조율을 담당했으며, GPU 인프라·AI 구현은 다른 담당 영역과 협업했습니다.'],
    next: ['사용자·관리자 화면과 서비스 흐름을 팀의 백엔드·인프라 작업에 맞춰 발전시키고 있습니다.'],
    evidence: [
      { label: '서비스 소개 사이트 코드', url: 'https://github.com/jaeseong09/core-landing' },
      { label: '프로젝트 역할', url: 'https://www.linkedin.com/in/jaeseongwi/' },
      { label: 'JunctionX 부스 회고', url: 'https://blog.naver.com/cadoim/224387934310' },
      { label: '성장기업 사업 중간발표', url: 'https://blog.naver.com/cadoim/224376668790' },
    ],
  },
  camplog: {
    intro: '공부 시간이 쌓일수록 캠프사이트가 성장하는 집중 시간 관리 서비스입니다. 프론트엔드·Spring 백엔드·화면 디자인을 함께 다루며 기록과 시각적 피드백을 연결했습니다.',
    contributions: ['React·TypeScript와 Spring Boot·MySQL을 연결해 인증, 집중 세션, 누적 시간과 캠프 성장 흐름을 구현했습니다.', 'Zustand로 타이머와 인증 상태를 나누고, 현재 시각에 따른 배경과 SVG 원형 타이머를 구성했습니다.', 'HTMLAudio 기반 배경음의 재생·일시정지·종료를 세션 상태와 연결했습니다. Google 로그인도 인증 흐름에 구현했습니다.'],
    problems: [
      { title: '일시정지와 재개 사이의 경과 시간 계산', problem: '타이머를 단순히 일정 간격으로 증가시키면 브라우저 실행 지연과 일시정지 상태를 함께 다루기 어려웠습니다.', solution: '누적 시간과 시작 시각을 분리하고 Date.now()의 차이로 경과 시간을 계산하도록 구성했습니다.', result: '타이머 표시를 호출 횟수 대신 시각 차이에 기반하도록 바꾸었습니다.' },
      { title: '서버 세션 생성 실패에 대한 복구 경로', problem: '서버 세션 ID 없이 타이머만 진행하거나 같은 세션을 다시 만드는 상황을 고려해야 했습니다.', solution: '이미 보유한 세션 ID를 확인하고, 생성 요청이 실패하면 활성 세션을 조회해 복구하는 흐름을 작성했습니다.', result: '성공한 요청뿐 아니라 실패 후 상태를 다시 확인하는 경로를 마련했습니다.' },
      { title: '누적 공부 기록을 다음 목표로 연결', problem: '기록된 공부 시간을 사용자가 볼 수 있는 성장 과정으로 표현하고 싶었습니다.', solution: '90·120·240·360·540·960분의 해금 기준과 서버의 unlockedItems를 연결해 성장 단계와 해금 알림을 표시했습니다.', result: '세션 기록이 캠프사이트의 변화와 다음 목표로 이어지도록 구성했습니다.' },
    ],
    results: ['집중 시간 기록, 캠프 성장, 랭킹, 인증 흐름을 구현하고 시연 영상을 제작했습니다.', '전공 학습을 API·데이터·화면이 이어지는 개인 프로젝트에 적용했습니다.'],
    evidence: [
      { label: '타이머·프론트엔드 코드', url: 'https://github.com/jaeseong09/CampLog/tree/main/camplog-frontend/src' },
      { label: '집중 세션 서비스', url: 'https://github.com/jaeseong09/CampLog/blob/main/camplog-backend/src/main/java/com/camplog/service/StudySessionService.java' },
      { label: '오디오 구현', url: 'https://github.com/jaeseong09/CampLog/blob/main/camplog-frontend/src/utils/sessionAudio.ts' },
    ],
  },
  'run-a-b': {
    intro: '소상공인이 지원 정책을 탐색하고 AI 리포트를 확인하는 팀 프로젝트입니다. 프론트엔드를 맡아 정보 탐색과 리포트 확인 화면을 개발했습니다.',
    contributions: ['정책 목록·상세 및 리포트 화면을 구현했습니다.', '로그인·회원가입과 API 요청 흐름을 연결했습니다.', '환경별 API 주소를 설정으로 관리하고 팀의 서버 작업과 화면을 맞췄습니다.'],
    problems: [{ title: '정책과 리포트 화면의 API 연결', problem: '화면마다 필요한 응답과 개발·배포 환경의 서버 주소를 관리해야 했습니다.', solution: '정책 상세와 리포트 화면을 나누고 API 주소 설정을 정리했습니다.', result: '화면의 역할과 서버 호출 흐름을 분리해 개발했습니다.' }],
    results: ['정책 정보와 리포트를 확인하는 프론트엔드 구현에 참여했습니다. AI 모델과 서버 개발은 팀의 다른 담당 영역입니다.'],
    evidence: [{ label: '정책 상세 화면', url: 'https://github.com/Run-a-B/run-a-b/blob/main/apps/run-a-b-fe/src/pages/PolicyDetail.tsx' }, { label: '리포트 화면', url: 'https://github.com/Run-a-B/run-a-b/blob/main/apps/run-a-b-fe/src/pages/ReportDetail.tsx' }],
  },
  'chi-go': {
    intro: '파크골프 기록을 음성으로 남기는 앱을 주제로 진행하는 캡스톤입니다. 초기 개발 환경을 설정하고 협력 기관의 요구를 팀의 설계와 일정에 연결하고 있습니다.',
    contributions: ['React Native·Expo·TypeScript 초기 환경 설정에 참여했습니다.', '협력 기관과 구장 선택 방식, 로그인, QR 초대 요구를 논의했습니다.', '화면·DB·작업 일정에 반영할 변경 사항을 주간일지로 기록했습니다.'],
    problems: [{ title: '팀의 예상과 실제 요구의 차이', problem: '팀이 생각한 구장 선택 방식과 협력 기관이 기대한 사용 흐름이 달랐습니다.', solution: '회의에서 요구사항을 확인하고 화면·데이터 구조·작업 일정의 변경 계획을 정리했습니다.', result: '기능을 구현하기 전에 실제 사용 맥락을 함께 확인하는 경험을 쌓았습니다.' }],
    results: ['캡스톤을 진행하며 개발 환경 설정과 요구사항 조율 과정을 기록하고 있습니다.'],
    next: ['합의한 사용 흐름과 음성 기록 기능을 구체화하는 단계입니다.'],
    evidence: [{ label: '초기 환경 설정 일지', url: 'https://github.com/chi-go-GBSW/journal/blob/main/jaeseong09/week2/README.md' }, { label: '요구사항 조율 일지', url: 'https://github.com/chi-go-GBSW/journal/blob/main/jaeseong09/week4/README.md' }],
  },
  'gbsw-conn': {
    intro: '학교 구성원의 제안과 소통을 위한 시스템 개발에 참여했습니다. 권한과 제안 상태가 사용자 화면에 어떻게 반영되는지 다뤘습니다.',
    contributions: ['신고 누적 시 임시 가림 처리에 참여했습니다.', '신원 열람의 인원·기간 규칙과 교사의 조회 범위를 수정했습니다.', '제안의 진행 이력을 표시할 때 발생하는 null 처리 문제를 수정했습니다.'],
    problems: [{ title: '권한과 상태에 따른 정보 노출', problem: '사용자의 역할과 제안 상태에 따라 열람할 수 있는 정보가 달라져야 했습니다.', solution: '조회 범위와 신원 열람 규칙, 신고 상태를 처리하는 코드를 수정했습니다.', result: '화면과 권한 규칙을 함께 고려하는 개발 경험을 쌓았습니다.' }],
    results: ['개발에 참여한 프로젝트이며 학교의 공식 운영 서비스로 배포된 상태는 아닙니다.'],
    evidence: [{ label: '신원 열람 규칙 수정', url: 'https://github.com/GBSW/GBSW-CONN/commit/6bf271ebec1ee67cda43be65b93016942d2e25c0' }, { label: '진행 이력 수정', url: 'https://github.com/GBSW/GBSW-CONN/commit/f1ef4088c27c0cfa88c08fb19190d5bd6f4b6a72' }],
  },
  'error-mind': {
    intro: '오류와 해결 과정을 기록하고 다시 찾아볼 수 있는 개인 프로젝트입니다. 현재 프론트엔드 UI를 개발하고 있습니다.',
    contributions: ['오류 등록·탐색·상세 화면을 구성했습니다.', '프로젝트·태그 입력과 해결 과정 작성 흐름을 만들었습니다.', '마크다운 편집기로 해결 방법을 정리할 수 있도록 했습니다.'],
    problems: [{ title: '문제와 해결 과정을 함께 기록하기', problem: '오류 메시지뿐 아니라 어떤 방법을 시도했는지 다시 읽을 수 있는 화면이 필요했습니다.', solution: '오류 정보와 해결 메모를 나누고, 상세 화면과 마크다운 편집기를 연결하는 UI를 구성했습니다.', result: '기록·탐색 흐름을 확인할 수 있는 프론트엔드 프로토타입을 개발했습니다.' }],
    results: ['Next.js·TypeScript를 사용한 프론트엔드 UI 프로토타입 단계입니다.'],
    next: ['백엔드 연동과 AI 기능은 향후 개발 범위로 구분하고 있습니다.'],
    evidence: [{ label: '마크다운 편집기 구현', url: 'https://github.com/jaeseong09/error-mind/commit/aeebe2080cec1afa36ff9354bd252b5274bf2993' }],
  },
  kott: {
    intro: 'OTT 구독 관리를 주제로 진행한 팀 프로젝트입니다. HTML·JavaScript·Node.js를 사용했습니다.',
    contributions: [], problems: [], results: [],
    evidence: [{ label: '노션 프로젝트 기록', url: 'https://evergreen-hare-fdb.notion.site/KOTT-37459a02a501807ea200febab0af6046' }],
  },
};
