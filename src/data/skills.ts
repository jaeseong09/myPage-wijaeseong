export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'other';
  detail: string[];
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
        detail: [
          'React를 활용하여 컴포넌트 기반 UI를 설계하고 재사용 가능한 구조로 화면을 구성한 경험이 있습니다.',
          'React Hooks인 useState와 useEffect를 사용하여 상태 관리 및 비동기 데이터 처리를 구현할 수 있습니다.',
          'props를 활용하여 컴포넌트 간 데이터 전달과 데이터 흐름 관리를 구현할 수 있습니다.',
          'REST API를 fetch 또는 axios로 연동하여 비동기적으로 데이터를 요청하고, 이를 UI에 동적으로 바인딩할 수 있습니다.',
          '배열 데이터를 map 함수로 렌더링하고 조건부 렌더링을 활용하여 동적인 사용자 인터페이스를 구현할 수 있습니다.',
        ],
      },
      {
        name: 'TypeScript',
        category: 'frontend',
        detail: [
          'TypeScript를 활용하여 정적 타입 시스템을 기반으로 한 안정적인 웹 애플리케이션을 개발한 경험이 있습니다.',
          '인터페이스(Interface)와 타입 별칭(Type Alias)을 사용하여 객체 구조를 명확하게 정의하고, 코드의 가독성과 유지보수성을 향상시켰습니다.',
          '제네릭(Generics)을 활용하여 재사용 가능한 컴포넌트와 함수를 설계하고, 다양한 데이터 타입에 유연하게 대응할 수 있습니다.',
          '유니온 타입(Union Type)과 타입 추론(Type Inference)을 통해 유연하면서도 안전한 타입 처리를 구현할 수 있습니다.',
          'React와 TypeScript를 함께 사용하여 컴포넌트의 props와 state에 대한 타입을 명확히 정의하고, 개발 과정에서 발생할 수 있는 오류를 사전에 방지했습니다.',
          '비동기 처리에서 Promise와 async/await에 대한 타입을 명확히 지정하여 안정적인 데이터 흐름을 구현할 수 있습니다.',
        ],
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
        detail: [
          'Spring Boot를 사용하여 REST API를 설계하고 구현한 경험이 있습니다.',
          'Spring Data JPA를 활용한 엔티티 매핑 및 CRUD 기능을 구현할 수 있습니다.',
          'Spring Security를 기반으로 OAuth 인증 및 인가를 구현할 수 있으며, JWT를 활용한 Stateless 인증 구조를 설계할 수 있습니다.',
          '애플리케이션에서 발생할 수 있는 특정 오류 상황에 대해 사용자 정의 예외(Custom Exception)를 작성한 경험이 있습니다.',
        ],
      },
      {
        name: 'Java',
        category: 'backend',
        detail: [
          '객체지향 프로그래밍 원칙을 이해하고, 이를 기반으로 클래스 구조를 설계할 수 있습니다.',
          '상속과 메서드 오버라이딩을 활용해 공통 로직을 상위 클래스에 분리하고, 하위 클래스에서 확장할 수 있습니다.',
          '인터페이스와 추상 클래스를 활용해 유연하고 확장 가능한 코드 구조를 구성할 수 있습니다.',
          '다형성을 활용해 상위 타입 참조로 여러 하위 객체를 통일된 방식으로 처리할 수 있습니다.',
          '예외 처리(try-catch-throws)를 적용해 안정적인 흐름 제어를 구현할 수 있습니다.',
        ],
      },
      {
        name: 'MySQL',
        category: 'backend',
        detail: [
          '관계형 데이터베이스(MySQL)의 기본 구조를 이해하고, 이를 바탕으로 테이블 설계 및 스키마를 구성할 수 있습니다.',
          '정규화 개념을 기반으로 중복을 최소화한 스키마를 설계할 수 있습니다.',
          '기본적인 데이터베이스 구조를 이해하고, 이를 기반으로 웹 애플리케이션과 연동할 수 있습니다.',
        ],
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
        detail: [
          'Folio 프로젝트에서 서비스 전반의 UI를 직접 설계하며 컴포넌트 단위 재사용 구조를 구성했습니다.',
          '프라이머리 컬러·간격·라운드·그림자를 상수화해 디자인 토큰 체계로 통일하고, 서비스 전반이 일관된 비주얼 언어를 공유하도록 설계했습니다.',
          'Figma 컴포넌트 구조와 코드 컴포넌트 구조를 최대한 1:1로 맞추는 방식으로 작업합니다.',
        ],
      },
      {
        name: 'Git · GitHub',
        category: 'other',
        detail: [
          'Git을 활용하여 프로젝트의 버전 관리를 수행하고, 기능 단위로 코드를 관리한 경험이 있습니다.',
          'GitHub를 기반으로 협업하며 Pull Request(PR)를 통해 코드 리뷰 및 병합 과정을 거쳤습니다.',
          'feature 브랜치 전략을 사용하여 기능별로 브랜치를 분리하고, main 브랜치에 안정적으로 병합하는 방식으로 개발을 진행했습니다.',
          'commit 메시지 컨벤션을 적용하여 작업 내용을 명확하게 기록하고, 변경 이력을 체계적으로 관리했습니다.',
          '협업 과정에서 발생한 merge conflict를 해결하며 코드 충돌을 조정하고, 안정적으로 통합한 경험이 있습니다.',
        ],
      },
    ],
  },
];
