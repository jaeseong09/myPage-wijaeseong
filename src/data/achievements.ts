export interface Achievement {
  emoji: string;
  title: string;
  year: number;
  date: string;
  project?: string;
  description?: string;
  source?: string;
}

export const achievements: Achievement[] = [
  { emoji: '🏆', title: '경북 SWgo 해커톤 최우수상', year: 2026, date: '2026', project: 'Phishing Defense', description: '팀 수상 · 피싱 예방 훈련 서비스 개발', source: 'https://blog.naver.com/cadoim/224348927029' },
  { emoji: '🥉', title: '포트폴리오 발표 대회 동상', year: 2026, date: '2026.06', description: '프로젝트의 기획 의도와 담당 역할을 정리하고 발표', source: 'https://blog.naver.com/cadoim/224315557933' },
  { emoji: '🎓', title: '귀뚜라미문화재단 장학생', year: 2026, date: '2026.06', description: '장학생 선발' },
  { emoji: '📜', title: 'SQL 개발자 SQLD', year: 2026, date: '2026.06', description: '한국데이터산업진흥원', source: 'https://www.linkedin.com/in/jaeseongwi/' },
  { emoji: '🏆', title: '경북소프트웨어마이스터고 레벨업 프로그램 4위', year: 2026, date: '2026.01', project: 'Folio' },
  { emoji: '🏅', title: '마이다스 뉴로우 우수상', year: 2025, date: '2025.11' },
  { emoji: '🏅', title: '마이다스 청춘어람 해커톤 창의상', year: 2025, date: '2025.09', source: 'https://zdnet.co.kr/view/?no=20250909215019' },
  { emoji: '🏅', title: '마이다스 뉴로우 우수상', year: 2025, date: '2025.06' },
  { emoji: '🎓', title: 'IBK기업은행 행복나눔재단 장학생', year: 2025, date: '2025.06', description: '장학생 선발' },
  { emoji: '🏅', title: '한국지능로봇경진대회 인기상', year: 2024, date: '2024.09', description: '고등학교 입학 전 경험' },
];
