import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function RouteScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const target = hash ? document.getElementById(hash.slice(1)) : null;
      if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
