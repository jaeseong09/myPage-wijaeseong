export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'other';
  detail: string[];
}
export interface SkillCategory {
  id: Skill['category'];
  label: string;
  skills: Skill[];
}
export const skillCategories: SkillCategory[] = [
  { id: 'frontend', label: 'Front-end', skills: [
    { name: 'React · TypeScript', category: 'frontend', detail: ['Folio와 Run-a-B에서 업로드·리포트·인증 화면을 개발하고 서버 API를 연결했습니다.', '응답 데이터와 컴포넌트 props의 타입을 정의하고 로딩·실패 상태를 화면에 반영했습니다.'] },
    { name: 'Next.js', category: 'frontend', detail: ['ErrorMind에서 오류 등록·탐색·상세 화면과 마크다운 편집 UI를 개발하고 있습니다.', '현재 구현한 프론트엔드 화면과 향후 백엔드·AI 연동 범위를 구분해 진행합니다.'] },
    { name: 'Redux Toolkit · Zustand', category: 'frontend', detail: ['Folio에서는 인증 UI의 전역 상태를 Redux Toolkit으로 관리했습니다.', 'CampLog에서는 타이머와 인증 상태를 분리하고 경과 시간·세션 ID의 흐름을 정리했습니다.'] },
    { name: 'React Native · Expo', category: 'frontend', detail: ['파크골프 음성 기록 앱 캡스톤에서 Expo·TypeScript 초기 환경 설정에 참여했습니다.', '협력 기관의 요구를 확인하며 모바일 화면 흐름을 학습하고 있습니다.'] },
  ] },
  { id: 'backend', label: 'Backend · Learning', skills: [
    { name: 'Spring Boot · JPA', category: 'backend', detail: ['CampLog에서 인증, 집중 세션, 누적 시간과 캠프 성장 기능을 프론트엔드와 연결했습니다.', 'Google 로그인과 JWT·refresh token 흐름을 구현하며 서버 인증을 학습했습니다.'] },
    { name: 'Node.js · Express · NestJS', category: 'backend', detail: ['인증·세션·게시판 API를 실습하며 백엔드 학습 범위를 넓히고 있습니다.', '이벤트 루프와 비동기 처리에 관한 자료를 공부하고 이해한 내용을 블로그에 기록합니다.'] },
    { name: 'Java · MySQL', category: 'backend', detail: ['Java 객체지향 개념을 학습하고 A-end에서 클래스·객체 수업을 준비했습니다.', 'CampLog의 데이터 연동 경험을 쌓았으며, 2026년 6월 SQLD를 취득했습니다.'] },
    { name: 'Deno', category: 'backend', detail: ['TypeScript 기반 CLI, 파일 입출력과 HTTP·CRUD 실습으로 런타임 사용법을 학습했습니다.'] },
  ] },
  { id: 'other', label: 'Design · Collaboration', skills: [
    { name: '화면 설계 · Figma', category: 'other', detail: ['Folio의 분석 결과와 CampLog의 성장 과정을 화면으로 구성했습니다.', '캠프 오브젝트와 로고를 만들고 화면 사이의 시각적 일관성을 고민했습니다.'] },
    { name: 'Git · GitHub', category: 'other', detail: ['팀 프로젝트에서 브랜치·Pull Request·이슈를 활용해 변경 사항과 진행 상황을 공유했습니다.', '기능을 수정한 이유와 해결 과정을 코드·일지·회고에 남깁니다.'] },
    { name: '교육 · 발표 · 문서화', category: 'other', detail: ['A-end 백엔드 교육과 이음 컨퍼런스 발표를 통해 배운 내용을 전달했습니다.', '전시에서 사용자 질문을 받고, 캡스톤 일지로 요구사항과 일정 변경을 기록했습니다.'] },
  ] },
];
