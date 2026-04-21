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
    emoji: '🎯',
    title: 'WINE 동아리 (Web Is Not Easy) Java OOP 강의 진행',
    year: 2026,
  },
  {
    emoji: '🚀',
    title: 'CodeNest Discord 서버 웹개발 대표',
    year: 2026,
    description: '후배 멘토링 및 협업 프로젝트 운영',
  },
];
