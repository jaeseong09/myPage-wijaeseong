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
        detail:
          '컴포넌트 기반 UI를 설계하고 재사용 가능한 구조로 화면을 구성합니다. useState·useEffect로 상태 관리와 비동기 데이터 처리를 구현하고, REST API를 axios/fetch로 연동해 데이터를 UI에 동적으로 바인딩합니다. Folio 프로젝트에서 Redux Toolkit으로 JWT 전역 인증 상태를 설계하고, React Router와 Framer Motion layoutId를 활용한 공유 요소 전환을 직접 구현했습니다.',
      },
      {
        name: 'TypeScript',
        category: 'frontend',
        detail:
          '인터페이스·타입 별칭으로 객체 구조를 명확하게 정의하고, 제네릭으로 재사용 가능한 컴포넌트와 함수를 설계합니다. React와 함께 사용해 props·state에 타입을 명시하고, 유니온 타입과 타입 추론으로 안전하면서도 유연한 데이터 흐름을 구현합니다. 비동기 처리 시 Promise·async/await에도 타입을 지정해 런타임 오류를 사전에 방지합니다.',
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
        detail:
          'REST API를 설계하고 Spring Data JPA로 엔티티 매핑·CRUD를 구현한 경험이 있습니다. Spring Security 기반 OAuth 인증과 JWT Stateless 인증 구조를 직접 설계했으며, 커스텀 예외 처리로 일관된 에러 응답을 제공합니다. 프론트엔드가 주 역할이지만 백엔드 구조를 이해한 상태에서 API 계약을 함께 설계해, Folio에서 Node/Express·FastAPI 두 서버를 동시 연동했습니다.',
      },
      {
        name: 'Java',
        category: 'backend',
        detail:
          '객체지향 프로그래밍 원칙을 이해하고 클래스 구조를 설계합니다. 상속·인터페이스·추상 클래스로 확장 가능한 코드를 구성하고, 다형성으로 여러 하위 객체를 통일된 방식으로 처리합니다. WINE(Web Is Not Easy) 동아리에서 팀원들을 대상으로 Java OOP 강의를 직접 진행한 경험이 있습니다.',
      },
      {
        name: 'MySQL',
        category: 'backend',
        detail:
          '관계형 데이터베이스 기본 구조를 이해하고 정규화를 기반으로 중복을 최소화한 스키마를 설계합니다. Folio 프로젝트에서 사용자 인증·포트폴리오 분석 결과 저장 테이블을 백엔드 팀과 함께 설계하며, 프론트의 데이터 요구사항을 DB 구조 단계에서 미리 반영했습니다.',
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
        detail:
          'Folio 프로젝트에서 서비스 전반의 UI를 직접 설계하며 컴포넌트 단위 재사용 구조를 구성했습니다. 프라이머리 컬러·간격·라운드·그림자를 상수화해 디자인 토큰 체계로 통일하고, 대시보드·차트·마이페이지가 일관된 비주얼 언어를 공유하도록 설계했습니다. Figma 컴포넌트 구조와 코드 컴포넌트 구조를 최대한 1:1로 맞추는 방식을 선호합니다.',
      },
      {
        name: 'Git · GitHub',
        category: 'other',
        detail:
          'feature 브랜치 전략으로 기능별 브랜치를 분리하고 PR·코드 리뷰 과정을 거쳐 main에 병합합니다. commit 메시지 컨벤션(fix/feat/refactor)을 적용해 변경 이력을 체계적으로 관리하고, 협업 중 발생한 merge conflict를 직접 해결한 경험이 있습니다. GitHub Actions로 CI/CD 파이프라인을 구성해 이 포트폴리오 사이트를 자동 배포 중입니다.',
      },
    ],
  },
];
