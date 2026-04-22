export interface Achievement {
  emoji: string;
  title: string;
  year: number;
  project?: string;
  description?: string;
}

export const achievements: Achievement[] = [
  {
    emoji: '🏆',
    title: '경북소프트웨어마이스터고 레벨업 프로그램 4등',
    year: 2026,
    project: 'Folio',
  },
  {
    emoji: '🎨',
    title: 'AI EXPO KOREA 2026 전시',
    year: 2026,
    project: 'Folio',
  },
  {
    emoji: '🏅',
    title: '마이다스 해커톤 창의상 수상',
    year: 2026,
  },
  {
    emoji: '🥈',
    title: '마이다스 뉴로우 우수상 수상',
    year: 2026,
    description: '2회 수상',
  },
  {
    emoji: '✈️',
    title: '미국 해외 연수',
    year: 2026,
  },
  {
    emoji: '🎓',
    title: 'IBK기업은행 행복나눔재단 장학생',
    year: 2025,
    description: '제25-0143호',
  },
  {
    emoji: '✈️',
    title: '싱가포르 해외 연수',
    year: 2025,
  },
  {
    emoji: '🇯🇵',
    title: '일본 국제교류',
    year: 2024,
    description: '중학교 국제교류 프로그램',
  },
];
