import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export function NotFound() {
  return (
    <main
      className="min-h-[100svh] flex flex-col items-center justify-center"
      style={{ padding: 'var(--container-pad-x)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col items-center gap-8 text-center"
      >
        <span
          className="font-mono text-[10px] tracking-[0.4em] uppercase"
          style={{ color: 'var(--text-subtle)' }}
        >
          ── 404
        </span>

        <h1
          className="editorial-h1"
          style={{ fontSize: 'clamp(72px, 18vw, 200px)', lineHeight: 1 }}
        >
          404
        </h1>

        <p
          className="text-[14px] leading-[1.7]"
          style={{ color: 'var(--text-muted)', maxWidth: '36ch' }}
        >
          요청하신 페이지를 찾을 수 없습니다.
        </p>

        <Link
          to="/"
          className="group inline-flex items-center gap-2 text-sm font-[500] pb-1 transition-colors duration-200"
          style={{
            color: 'var(--text-primary)',
            borderBottom: '1px solid var(--text-primary)',
          }}
        >
          메인으로 돌아가기
          <ArrowUpRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </motion.div>
    </main>
  );
}
