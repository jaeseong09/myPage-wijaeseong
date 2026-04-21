export interface Profile {
  name: string;
  tagline: string;
  location: string;
  school: string;
  email: string;
  phone: string;
  social: {
    github: string;
    velog: string;
    naverBlog: string;
  };
  heroLede: string;
  heroTitle: string;
  heroSubtitle: string;
  about: string;
}

export const profile: Profile = {
  name: '위재성',
  tagline: '프론트엔드 개발자',
  location: '경북, 설천',
  school: '경북소프트웨어 마이스터 고등학교 (GBSW)',
  email: 'jaeseongwi48@gmail.com',
  phone: '010-4629-0813',
  social: {
    github: 'https://github.com/jaeseong09',
    velog: 'https://velog.io/@wijaeseong/posts',
    naverBlog: 'https://blog.naver.com/cadoim',
  },
  heroLede:
    '사용자 경험과 안정적인 서비스 구현을 함께 고민하며,\n직관적인 인터페이스를 개발하는',
  heroTitle: '프론트엔드 개발자\n위재성입니다.',
  heroSubtitle:
    '웹 성능과 사용자 경험 개선에 집중하며, 반응형 웹과 직관적인 UI 설계로 일관된 경험을 제공합니다.',
  about:
    'React · TypeScript를 기반으로 사용자 경험과 안정적인 서비스 구현을 함께 고민합니다.\n백엔드에 대한 이해를 바탕으로 팀과 명확한 약속을 세우는 협업을 지향합니다.',
};
