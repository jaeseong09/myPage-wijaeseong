import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useIntersection } from '../../hooks/useIntersection';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { skillCategories } from '../../data/skills';
import type { Skill } from '../../data/skills';

const SKILL_ICONS: Record<string, string> = {
  React: '⚛️',
  TypeScript: '𝑻𝑺',
  'Spring Boot': '🍃',
  Java: '☕',
  MySQL: '🗄️',
  Figma: '🎨',
  'Git · GitHub': '🐙',
};

function SkillItem({
  skill,
  isSelected,
  onClick,
  reducedMotion,
}: {
  skill: Skill;
  isSelected: boolean;
  onClick: () => void;
  reducedMotion: boolean;
}) {
  return (
    <div>
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 text-left group"
        style={{
          background: isSelected ? 'var(--accent-soft)' : 'transparent',
          border: `0.5px solid ${isSelected ? 'rgba(70,190,255,0.3)' : 'var(--border-subtle)'}`,
        }}
        aria-expanded={isSelected}
      >
        <div className="flex items-center gap-3">
          <span
            className="text-base w-7 text-center font-mono select-none"
            aria-hidden="true"
          >
            {SKILL_ICONS[skill.name] ?? '◆'}
          </span>
          <span
            className="text-sm font-[500] transition-colors duration-200"
            style={{ color: isSelected ? 'var(--accent-primary)' : 'var(--text-primary)' }}
          >
            {skill.name}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isSelected ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown
            size={14}
            style={{ color: isSelected ? 'var(--accent-primary)' : 'var(--text-subtle)' }}
          />
        </motion.div>
      </button>

      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={reducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' as const }}
            className="overflow-hidden"
          >
            <p
              className="px-4 pt-2 pb-3 text-[13px] leading-[1.7]"
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
      className="py-24 md:py-32"
      style={{ borderTop: '1px solid var(--border-subtle)' }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs mb-4 tracking-widest"
          style={{ color: 'var(--accent-primary)' }}
        >
          02 / SKILLS
        </motion.p>

        <motion.h2
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="text-3xl font-[500] tracking-[-0.01em] mb-12"
          style={{ color: 'var(--text-primary)' }}
        >
          기술 스택
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.id}
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + catIdx * 0.08 }}
            >
              <p
                className="font-mono text-[10px] tracking-widest mb-4"
                style={{ color: 'var(--text-subtle)' }}
              >
                {cat.label.toUpperCase()}
              </p>
              <div className="flex flex-col gap-2">
                {cat.skills.map((skill) => (
                  <SkillItem
                    key={skill.name}
                    skill={skill}
                    isSelected={selectedSkill === skill.name}
                    onClick={() => handleClick(skill.name)}
                    reducedMotion={reducedMotion}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
