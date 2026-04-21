# 디자인 가이드

## 컬러 시스템

### CSS 변수 (tokens.css에 정의)

```css
:root {
  /* Background */
  --bg-primary: #0A0E1A;
  --bg-surface: rgba(255, 255, 255, 0.02);
  --bg-elevated: rgba(255, 255, 255, 0.04);

  /* Border */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-default: rgba(255, 255, 255, 0.12);
  --border-strong: rgba(55, 138, 221, 0.4);

  /* Accent (Folio에서 실제 쓰던 컬러) */
  --accent-primary: #46BEFF;
  --accent-strong: #378ADD;
  --accent-light: #85B7EB;
  --accent-soft: rgba(70, 190, 255, 0.1);

  /* Text */
  --text-primary: #E6EDF5;
  --text-secondary: rgba(230, 237, 245, 0.7);
  --text-muted: rgba(230, 237, 245, 0.5);
  --text-subtle: rgba(230, 237, 245, 0.3);

  /* Status */
  --status-success: #5DCAA5;
  --status-warning: #EF9F27;
}
```

### Tailwind 설정 확장

tailwind.config.js에서 위 CSS 변수를 참조하도록:

```js
theme: {
  extend: {
    colors: {
      bg: { primary: 'var(--bg-primary)', surface: 'var(--bg-surface)' },
      accent: { primary: 'var(--accent-primary)', strong: 'var(--accent-strong)' },
      text: { primary: 'var(--text-primary)', muted: 'var(--text-muted)' },
    }
  }
}
```

---

## 타이포그래피

```css
--font-sans: 'Pretendard Variable', -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Consolas', monospace;
```

| 용도 | 크기 | 굵기 | 자간 | 행간 |
|------|------|------|------|------|
| Hero title | 48px (mobile: 36px) | 500 | -0.02em | 1.2 |
| Section title | 32px | 500 | -0.01em | 1.3 |
| Card title | 16px | 500 | 0 | 1.4 |
| Body | 14-15px | 400 | 0 | 1.7 |
| Caption/meta | 12px | 400 | 0.02em | 1.5 |
| Code/mono | 12-14px | 400 | 0 | 1.5 |

**원칙**:
- 제목 weight는 500이 최대 (600/700 쓰지 말 것)
- 대문자 CAPS 사용 금지 → 소문자 유지
- 태그/연도/숫자는 mono 폰트

---

## 간격 (Spacing)

```
섹션 간 여백        96~120px (sm: 64px)
섹션 내부 여백      48~64px
카드 사이           16~24px
카드 내부 padding   20~24px
버튼 padding        10px 18px
```

---

## 컴포넌트 스타일

### 카드
```css
background: var(--bg-surface);
border: 0.5px solid var(--border-subtle);
border-radius: 12px;
padding: 20px 24px;
transition: all 0.3s ease;

hover {
  transform: translateY(-4px);
  border-color: var(--border-strong);
  background: var(--accent-soft);
}
```

### 태그
```css
padding: 3px 8px;
font-family: var(--font-mono);
font-size: 10px;
background: rgba(255, 255, 255, 0.04);
color: var(--text-muted);
border-radius: 4px;
```

### 버튼 (Primary CTA)
```css
padding: 10px 18px;
background: var(--accent-strong);
color: #ffffff;
font-size: 13px;
font-weight: 500;
border-radius: 8px;

hover {
  background: var(--accent-primary);
  transform: translateY(-1px);
}
```

### 버튼 (Secondary)
```css
padding: 10px 18px;
background: transparent;
border: 0.5px solid var(--border-default);
color: var(--text-secondary);
```

---

## 레이아웃 그리드

- 최대 콘텐츠 너비: `max-w-6xl` (1152px)
- 페이지 padding: `px-6 lg:px-12`
- 모바일 기준점: 768px

---

## 다크 모드 고정

`<html class="dark">` 고정. Tailwind `darkMode: 'class'` 설정하되 토글 기능은 만들지 말 것.

```html
<html lang="ko" class="dark">
```

---

## 반응형 전략

1. **데스크탑 우선 설계** (노션 포폴이 "전체 화면 기준"이라 명시)
2. 모바일(< 768px)에서도 정상 작동하도록 최소 보장
3. Hero는 모바일에서 폰트 크게 줄이기 (48px → 36px)
4. Projects 그리드는 모바일에서 1단, 데스크탑에서 3단

---

## 접근성 체크리스트

- [ ] `prefers-reduced-motion: reduce` 대응 — 애니메이션 비활성화
- [ ] 모든 이미지에 `alt` 텍스트
- [ ] 키보드 포커스 시 outline 유지 (accent color)
- [ ] 링크에 `rel="noopener noreferrer"` (외부 링크)
- [ ] 클릭 가능한 요소 최소 44x44px
- [ ] 컬러 대비 WCAG AA 이상 (text-muted는 주의)
