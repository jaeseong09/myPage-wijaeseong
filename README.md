# 위재성 포트폴리오

React · TypeScript · Vite 기반 개인 포트폴리오입니다. 2026년 9월 기준으로 프로젝트, 교내외 활동, 수상·자격을 정리했습니다.

## 실행과 검증

```sh
npm ci
npm run dev
npm run lint
npm run build
```

개발 서버 주소는 터미널에 표시됩니다. 빌드 결과는 `dist/`에 생성됩니다. HashRouter를 사용해 `/#/projects/folio` 같은 주소로 프로젝트 상세에 직접 접근할 수 있습니다.

## 내용 수정

- `src/data/profile.ts`: 소개·연락처·외부 프로필
- `src/data/projects.ts`: 프로젝트 기간·역할·기술·링크와 Folio 상세
- `src/data/caseStudies.ts`: 프로젝트별 기여·문제 해결·결과·근거
- `src/data/experiences.ts`: 학생회·교육·전시·대외 활동
- `src/data/achievements.ts`: 수상·장학·자격
- `src/data/skills.ts`: 기술과 실제 사용 경험

대표 사례는 Folio, Phishing Defense, CORE, CampLog이며, 다른 7개 프로젝트도 상세 페이지로 연결됩니다. 기존 경소마고실록과 Homeshop의 상세 내용은 해당 페이지 파일에 있습니다.

프로젝트 기간은 사용자가 지정한 노션 포트폴리오를 우선합니다. 코드에서 확인한 구현과 계획, 팀 전체의 작업과 본인이 담당한 작업을 구분하며, 2024년 활동은 고등학교 입학 전으로 표시합니다. 키키랩 인턴십의 세부 기간·업무처럼 확인하지 못한 내용은 추정하지 않습니다.

자료 기준은 [docs/CONTENT.md](docs/CONTENT.md), 업데이트 단계와 검증 기록은 [docs/UPDATE_PLAN.md](docs/UPDATE_PLAN.md)에 정리했습니다.

이 작업 사본의 변경은 로컬에만 반영되어 있습니다. 배포 설정과 도메인은 변경하지 않았습니다.
