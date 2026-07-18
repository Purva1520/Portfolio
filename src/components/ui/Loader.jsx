import { motion } from 'framer-motion';
import { profile } from '../../data/profile';

const letters = profile.name.split('');

/**
 * Opening curtain: the name rises letter by letter over a thin progress
 * line, then the whole panel lifts away like a stage curtain.
 */
export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      aria-hidden="true"
    >
      <div className="overflow-hidden px-6">
        <div className="flex">
          {letters.map((letter, i) => (
            <motion.span
              key={`${letter}-${i}`}
              className="serif-accent text-[clamp(2.2rem,7vw,4.5rem)] leading-tight text-snow"
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.045, ease: [0.22, 1, 0.36, 1] }}
            >
              {letter === ' ' ? ' ' : letter}
            </motion.span>
          ))}
        </div>
      </div>

      <motion.p
        className="eyebrow mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        Portfolio
      </motion.p>

      <div className="mt-10 h-px w-44 overflow-hidden rounded-full bg-raised">
        <motion.div
          className="h-full w-full origin-left bg-gradient-to-r from-lav via-rose to-sand"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.55, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
        />
      </div>
    </motion.div>
  );
}
