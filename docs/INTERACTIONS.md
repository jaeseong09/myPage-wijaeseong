# 인터랙션 구현 힌트

## 1. Projects 카드 → 상세페이지 Shared Element Transition (최우선)

### 핵심 아이디어
Framer Motion의 `layoutId`를 사용하면 두 개의 다른 컴포넌트가 같은 ID를 가질 때 자동으로 부드럽게 전환됩니다.

### 구현 방향
```tsx
// Projects 카드
<motion.div layoutId="project-folio-thumb">
  <img src="..." />
</motion.div>

// Folio 상세페이지 Hero
<motion.div layoutId="project-folio-thumb">
  <img src="..." />
</motion.div>
```

### 주의사항
- `AnimatePresence` 래핑 필요 (페이지 전환 감지)
- 라우팅 기반 전환 시 `mode="wait"` 고려
- 썸네일 URL이 두 곳에서 **동일한 이미지**를 가리켜야 자연스러움
- 모션 줄이기 설정 시 fallback

### 참고 자료
- Framer Motion 공식: https://www.framer.com/motion/layout-animations/
- 검색 키워드: "framer motion shared layout route transition"

---

## 2. Hero 타이핑 애니메이션

### 접근 방향
- 직접 구현 (setInterval로 한 글자씩 추가)
- 또는 `typewriter-effect` / `react-type-animation` 라이브러리 활용

### 구현 포인트
```tsx
// 개념 코드 — 직접 구현할 것
const [displayed, setDisplayed] = useState("");
useEffect(() => {
  let i = 0;
  const timer = setInterval(() => {
    setDisplayed(fullText.slice(0, i++));
    if (i > fullText.length) clearInterval(timer);
  }, 30);
  return () => clearInterval(timer);
}, []);
```

**주의**:
- 타이핑 중엔 커서(`|`) 깜빡임 유지
- `prefers-reduced-motion` 시 즉시 전체 텍스트 표시
- 타이핑 완료 후 다음 애니메이션 트리거

---

## 3. Hero Spotlight 효과

### 접근 방향
마우스 위치를 CSS 변수로 전달 → 배경 gradient의 중심점 이동

```tsx
const handleMouseMove = (e: MouseEvent) => {
  const { clientX, clientY } = e;
  document.documentElement.style.setProperty('--mx', `${clientX}px`);
  document.documentElement.style.setProperty('--my', `${clientY}px`);
};
```

```css
.hero::before {
  background: radial-gradient(
    600px circle at var(--mx) var(--my),
    rgba(70, 190, 255, 0.1),
    transparent 40%
  );
}
```

**주의**:
- 성능 이슈 방지를 위해 throttle (requestAnimationFrame)
- 모바일에선 비활성화

---

## 4. 섹션 진입 애니메이션

### 커스텀 훅 활용
```tsx
// useIntersection.ts
export function useIntersection(options?: IntersectionObserverInit) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}
```

### 섹션에서 사용
```tsx
const { ref, isVisible } = useIntersection();
<motion.section
  ref={ref}
  initial={{ opacity: 0, y: 40 }}
  animate={isVisible ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6, ease: 'easeOut' }}
>
```

---

## 5. Skills 아이콘 클릭 → 상세 패널

### 접근 방향
- 클릭한 스킬의 인덱스를 state에 저장
- 해당 인덱스가 있을 때 아래에 상세 패널 펼침
- `AnimatePresence`로 부드럽게 등장/퇴장

```tsx
const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

<AnimatePresence mode="wait">
  {selectedSkill && (
    <motion.div
      key={selectedSkill}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
    >
      {/* 상세 내용 */}
    </motion.div>
  )}
</AnimatePresence>
```

---

## 6. 커스텀 커서

### 접근 방향
- `position: fixed`된 작은 원을 마우스 위치로 이동
- 링크/버튼 호버 시 크기 확대
- `pointer-events: none`으로 클릭 방해 방지

```tsx
const cursorRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const move = (e: MouseEvent) => {
    if (cursorRef.current) {
      cursorRef.current.style.transform =
        `translate(${e.clientX}px, ${e.clientY}px)`;
    }
  };
  window.addEventListener('mousemove', move);
  return () => window.removeEventListener('mousemove', move);
}, []);
```

**주의**:
- 모바일/터치 디바이스에선 렌더링 X (`@media (hover: hover)`)
- `prefers-reduced-motion` 대응

---

## 7. 스크롤 프로그레스 바

### 커스텀 훅
```tsx
// useScrollProgress.ts
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setProgress(scrolled);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return progress;
}
```

### 사용
```tsx
const progress = useScrollProgress();
<div
  className="fixed top-0 left-0 h-0.5 bg-accent-primary z-50"
  style={{ width: `${progress * 100}%` }}
/>
```

---

## 8. 이메일 복사 인터랙션

### 접근 방향
- 클릭 시 `navigator.clipboard.writeText()`
- 성공 후 버튼 아이콘이 `Mail` → `Check`로 모핑
- 2초 후 원상복구

```tsx
const [copied, setCopied] = useState(false);
const handleCopy = async () => {
  await navigator.clipboard.writeText('jaeseongwi48@gmail.com');
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};
```

---

## 모션 제어 원칙

1. **일관된 이징**: 대부분 `cubic-bezier(0.4, 0, 0.2, 1)` 또는 `easeOut`
2. **적절한 지속시간**: 마이크로 인터랙션 150~200ms, 섹션 진입 600ms, 페이지 전환 400~500ms
3. **prefers-reduced-motion 대응**: 반드시 전역 체크 훅 하나 만들어두고 모든 애니메이션이 참조
4. **GPU 가속**: `transform`과 `opacity`만 애니메이션 (layout 트리거 금지)

```tsx
// usePrefersReducedMotion.ts
export function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefers(mq.matches);
    const handler = () => setPrefers(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return prefers;
}
```

---

## 성능 체크

- 애니메이션 중 Layout/Paint 트리거 확인 (Chrome DevTools Performance)
- 60fps 유지가 목표
- 무거운 계산은 `useMemo`로 메모이제이션
- 이미지는 lazy loading + WebP
