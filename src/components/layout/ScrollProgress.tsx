import { useScrollProgress } from '../../hooks/useScrollProgress';

export function ScrollProgress() {
  const ref = useScrollProgress();

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 w-full h-[2px] z-50 transition-none pointer-events-none"
      style={{
        transform: 'scaleX(0)',
        transformOrigin: 'left',
        background: 'var(--point-blue)',
      }}
      role="progressbar"
      aria-valuenow={0}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="페이지 스크롤 진행률"
    />
  );
}
