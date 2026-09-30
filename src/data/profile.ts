export interface Profile {
  name: string;
  tagline: string;
  location: string;
  school: string;
  email: string;
  phone: string;
  social: {
    github: string;
    linkedin: string;
    notion: string;
    velog: string;
    naverBlog: string;
  };
  heroLede: string;
  heroTitle: string;
  heroSubtitle: string;
  about: string;
  highlights: { value: string; label: string }[];
}

export const profile: Profile = {
  name: '위재성',
  tagline: '프론트엔드 개발자',
  location: '경북,포항',
  school: '경북소프트웨어 마이스터 고등학교 (GBSW)',
  email: 'jaeseongwi48@gmail.com',
  phone: '010-4629-0813',
  social: {
    github: 'https://github.com/jaeseong09',
    linkedin: 'https://www.linkedin.com/in/jaeseongwi/',
    notion: 'https://evergreen-hare-fdb.notion.site/8a559a02a5018392a96c015ffe9623a2',
    velog: 'https://velog.io/@wijaeseong/posts',
    naverBlog: 'https://blog.naver.com/cadoim',
  },
  heroLede:
    '사용자 경험과 안정적인 서비스 구현을 함께 고민하며,\n직관적인 인터페이스를 개발하는',
  heroTitle: '프론트엔드 개발자\n위재성입니다.',
  heroSubtitle:
    'React · TypeScript로 서비스를 만들고, 팀 프로젝트와 전시에서 만난 사용자의 의견을 다음 개발에 연결합니다.',
  about:
    '경북소프트웨어마이스터고등학교에서 소프트웨어를 공부하고 있으며, 2028년 졸업 예정입니다. React · TypeScript를 중심으로 프론트엔드를 개발하고, Spring과 Node.js를 공부하며 서버와 데이터의 흐름까지 이해하려고 노력합니다.\n\n팀 프로젝트에서 기능을 구현하고, 해커톤과 전시에서 결과물을 설명하며 경험을 쌓았습니다. 학생회장과 A-end 백엔드 교육 담당으로 활동하고, 이음 컨퍼런스에서 배운 내용을 나누고 있습니다.',
  highlights: [
    { value: 'SWgo', label: '피싱 예방 훈련 서비스 · 팀 최우수상' },
    { value: 'SQLD', label: 'SQL 개발자 · 2026.06 취득' },
    { value: '2028', label: '경북소프트웨어마이스터고 졸업 예정' },
  ],
};
