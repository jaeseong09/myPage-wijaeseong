import { useScrollProgress } from '../../hooks/useScrollProgress';

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed top-0 left-0 h-[2px] z-50 transition-none"
      style={{
        width: `${progress * 100}%`,
        background: 'var(--point-blue)',
      }}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="페이지 스크롤 진행률"
    />
  );
}
