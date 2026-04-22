import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useIntersection } from '../../hooks/useIntersection';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { skillCategories } from '../../data/skills';
import type { Skill } from '../../data/skills';

function SkillItem({
  skill,
  index,
  isSelected,
  onClick,
  reducedMotion,
}: {
  skill: Skill;
  index: number;
  isSelected: boolean;
  onClick: () => void;
  reducedMotion: boolean;
}) {
  return (
    <div style={{ borderTop: '1px solid var(--border-subtle)' }}>
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-4 text-left group"
        aria-expanded={isSelected}
      >
        <div className="flex items-center gap-5 flex-1 min-w-0">
          <span
            className="font-mono text-[10px] tracking-[0.28em] shrink-0"
            style={{ color: 'var(--text-subtle)' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className="text-[15px] font-[400] transition-colors duration-300 truncate"
            style={{
              color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
            }}
          >
            {skill.name}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isSelected ? 45 : 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' as const }}
          className="shrink-0 ml-3"
        >
          <Plus
            size={14}
            strokeWidth={1.25}
            style={{ color: isSelected ? 'var(--text-primary)' : 'var(--text-muted)' }}
          />
        </motion.div>
      </button>

      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={reducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' as const }}
            className="overflow-hidden"
          >
            <p
              className="pl-10 pr-2 pb-5 text-[13px] leading-[1.75] measure-prose"
              style={{ color: 'var(--text-muted)' }}
            >
              {skill.detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const { ref, isVisible } = useIntersection();
  const reducedMotion = usePrefersReducedMotion();

  const handleClick = (name: string) => {
    setSelectedSkill((prev) => (prev === name ? null : name));
  };

  return (
    <section
      id="skills"
      ref={ref as React.RefObject<HTMLElement>}
      className="section"
    >
      <div className="container">
        {/* 섹션 헤더 */}
        <div className="section-grid" style={{ marginBottom: 'var(--space-4xl)' }}>
          <motion.p
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="section-label"
          >
            ── 02
            <br />
            Skills
          </motion.p>

          <motion.h2
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="editorial-h2"
          >
            익숙한 도구와{' '}
            <span style={{ color: 'var(--text-muted)' }}>— 작업 방식.</span>
          </motion.h2>
        </div>

        {/* 비대칭 3컬럼 — 프론트엔드 컬럼을 크게 */}
        <div
          className="grid gap-x-12 md:gap-x-16 gap-y-16 grid-cols-1 md:grid-cols-3"
        >
          {skillCategories.map((cat, catIdx) => {
            return (
              <motion.div
                key={cat.id}
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + catIdx * 0.08 }}
              >
                <div className="flex items-baseline justify-between pb-4">
                  <div className="flex items-baseline gap-3">
                    <span
                      className="font-mono text-[10px] tracking-[0.3em]"
                      style={{ color: 'var(--text-subtle)' }}
                    >
                      {String(catIdx + 1).padStart(2, '0')}
                    </span>
                    <p
                      className="font-[400] tracking-[-0.01em]"
                      style={{
                        color: 'var(--text-primary)',
                        fontSize: '16px',
                      }}
                    >
                      {cat.label}
                    </p>
                  </div>
                  <span
                    className="font-mono text-[10px] tracking-widest"
                    style={{ color: 'var(--text-subtle)' }}
                  >
                    {String(cat.skills.length).padStart(2, '0')} items
                  </span>
                </div>
                <div
                  className="flex flex-col"
                  style={{ borderBottom: '1px solid var(--border-subtle)' }}
                >
                  {cat.skills.map((skill, idx) => (
                    <SkillItem
                      key={skill.name}
                      skill={skill}
                      index={idx}
                      isSelected={selectedSkill === skill.name}
                      onClick={() => handleClick(skill.name)}
                      reducedMotion={reducedMotion}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 푸터 캡션 — 섹션을 닫는 한 줄 */}
        <motion.p
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="font-mono text-[11px] leading-[1.7] mt-16 measure-prose"
          style={{ color: 'var(--text-muted)' }}
        >
          ── 클릭하면 각 도구에 대한 작업 방식을 펼쳐볼 수 있습니다.
        </motion.p>
      </div>
    </section>
  );
}
