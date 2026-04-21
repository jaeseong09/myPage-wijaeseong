export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'other';
  detail: string;
}

export interface SkillCategory {
  id: 'frontend' | 'backend' | 'other';
  label: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    label: 'Front-end',
    skills: [
      {
        name: 'React',
        category: 'frontend',
        detail: '컴포넌트 기반 UI 설계와 상태 관리, 커스텀 훅 작성에 익숙합니다.',
      },
      {
        name: 'TypeScript',
        category: 'frontend',
        detail: 'strict 모드 기반으로 타입 안전한 코드를 작성합니다.',
      },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    skills: [
      {
        name: 'Spring Boot',
        category: 'backend',
        detail: 'REST API 설계와 JPA 기반 데이터 접근 계층을 구성할 수 있습니다.',
      },
      {
        name: 'Java',
        category: 'backend',
        detail: 'OOP 원칙을 이해하고 적용하며, 팀 내 Java 강의를 진행한 경험이 있습니다.',
      },
      {
        name: 'MySQL',
        category: 'backend',
        detail: '관계형 스키마 설계와 기본 쿼리 최적화를 수행할 수 있습니다.',
      },
    ],
  },
  {
    id: 'other',
    label: 'Other',
    skills: [
      {
        name: 'Figma',
        category: 'other',
        detail: '디자인 시스템 구성과 컴포넌트 단위 UI 설계를 직접 수행합니다.',
      },
      {
        name: 'Git · GitHub',
        category: 'other',
        detail: '브랜치 전략을 세우고 PR 기반 협업 워크플로를 운영합니다.',
      },
    ],
  },
];
