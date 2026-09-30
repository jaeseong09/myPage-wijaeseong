export interface Experience {
  title: string;
  period: string;
  category: string;
  description: string;
  links: { label: string; url: string }[];
}

export const experiences: Experience[] = [
  { title: '학생회장 · 기숙사 층 대표', period: '재학 중', category: '학생자치', description: '경북소프트웨어마이스터고등학교 학생회장과 기숙사 층 대표로 활동하고 있습니다.', links: [{ label: '프로필', url: 'https://www.linkedin.com/in/jaeseongwi/' }] },
  { title: 'A-end 백엔드 교육 담당', period: '2026.03 ~', category: '교육', description: 'Java 클래스·객체 수업 자료와 예제를 준비했습니다. 피드백에 따라 목차와 비유를 보완하고, 처음 배우는 후배들의 이해 속도를 고려하는 법을 배웠습니다.', links: [{ label: '수업 회고', url: 'https://blog.naver.com/cadoim/224262844156' }] },
  { title: '이음 컨퍼런스 공동 운영 · 연사', period: '2026.08 ~ 09', category: '공유', description: '동아리원들과 선후배의 경험을 나누는 행사를 함께 기획·운영했습니다. 9월 2일에는 연사로 참여해 공부 과정과 GitHub·블로그·포트폴리오 준비 경험을 나눴습니다.', links: [{ label: '공동 운영', url: 'https://blog.naver.com/cadoim/224390225455' }, { label: '발표 회고', url: 'https://blog.naver.com/cadoim/224404188221' }] },
  { title: 'K-ICT WEEK in Busan', period: '2026.09', category: '전시', description: '작품을 출품하고 후배들과 부스를 운영했습니다. 배포 환경에서 서비스를 시연하고 기업 관계자·대학생들의 질문과 의견을 들었습니다.', links: [{ label: '전시 회고', url: 'https://blog.naver.com/cadoim/224409821128' }] },
  { title: 'JunctionX Korea 2026', period: '2026.08', category: '파트너사 부스', description: 'CORE 프로젝트로 파트너사 부스에 참여했습니다. 소개 자료를 준비하고 개발자·기업 관계자에게 프로젝트를 설명하며 기술과 사업성에 대한 의견을 받았습니다.', links: [{ label: '부스 회고', url: 'https://blog.naver.com/cadoim/224387934310' }] },
  { title: 'SW 성장기업 육성 지원 사업 · AI 인재 양성 프로그램', period: '2026', category: '프로젝트', description: 'CORE와 관련해 프로그램에 참여하고 중간발표를 준비했습니다. 방학 중에도 팀 회의를 이어 가며 발표 구성과 진행 상황 공유의 중요성을 배웠습니다.', links: [{ label: '중간발표 회고', url: 'https://blog.naver.com/cadoim/224376668790' }] },
  { title: 'AI EXPO KOREA 2026', period: '2026.05', category: 'Folio 전시', description: 'Folio를 전시하고 방문객에게 서비스를 설명했습니다. 분석 기준·실제 이용 가능성·서비스 대상 확대에 관한 질문을 통해 사용자 관점의 개선점을 찾았습니다.', links: [{ label: '전시 회고', url: 'https://blog.naver.com/cadoim/224286929147' }] },
  { title: '키키랩 인턴십', period: '2026', category: '인턴십', description: '여름방학에 프로젝트와 전공 학습을 이어 가며 키키랩 인턴십에 참여했습니다.', links: [{ label: '방학 기록', url: 'https://blog.naver.com/cadoim/224374557167' }] },
  { title: '실리콘밸리 글로벌 기업 견학 및 탐방', period: '2026.01', category: '글로벌 경험', description: 'KIC·XL8·해커 도죠 등을 방문해 기업과 개발자의 이야기를 들었습니다. 개발 문화에 관심을 넓혔고, 질문과 현장 기록을 더 준비해야 한다는 점을 느꼈습니다.', links: [{ label: '연수 회고', url: 'https://blog.naver.com/cadoim/224246878527' }] },
  { title: 'G-STEP 싱가포르', period: '2025.08', category: '글로벌 경험', description: '영어 수업, NUS 재학생·외국인 인터뷰, Autodesk 탐방에 참여했습니다. 친구들과 이동 일정을 직접 계획하고 현지 상황에 맞춰 조정했습니다.', links: [{ label: '연수 회고', url: 'https://blog.naver.com/cadoim/224232318991' }] },
  { title: 'WINE 전공 동아리', period: '재학 중', category: '동아리', description: '전공 동아리 WINE에서 활동했습니다.', links: [{ label: '프로필', url: 'https://www.linkedin.com/in/jaeseongwi/' }] },
  { title: '일본 국제교류 프로그램', period: '2024.08', category: '입학 전 경험', description: '고등학교 입학 전 일본 국제교류 프로그램에 참여했습니다.', links: [] },
];
