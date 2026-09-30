import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const ease = [0.22, 1, 0.36, 1] as const;

export function SectionRule() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className="section-rule"
      initial={reducedMotion ? false : { scaleX: 0 }}
      animate={reducedMotion ? { scaleX: 1 } : undefined}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      transition={{ duration: reducedMotion ? 0 : 0.55, ease }}
    />
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.h2
      className="editorial-h2"
      initial={reducedMotion ? false : { opacity: 0, y: 10 }}
      animate={reducedMotion ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reducedMotion ? 0 : 0.5, ease }}
    >
      {children}
    </motion.h2>
  );
}
