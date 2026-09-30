import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    let frame = 0;
    let previousPercent = -1;
    const update = () => {
      frame = 0;
      if (!ref.current) return;
      const h = document.documentElement;
      const distance = h.scrollHeight - h.clientHeight;
      const progress = distance > 0 ? Math.min(1, Math.max(0, h.scrollTop / distance)) : 0;
      ref.current.style.transform = `scaleX(${progress})`;
      const percent = Math.round(progress * 100);
      if (percent !== previousPercent) {
        ref.current.setAttribute('aria-valuenow', String(percent));
        previousPercent = percent;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [pathname]);

  return ref;
}
