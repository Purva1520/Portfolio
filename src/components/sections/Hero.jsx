import { Suspense, lazy, useEffect, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { FiArrowDown, FiDownload, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import Magnetic from '../ui/Magnetic';
import { useSmoothScroll } from '../../context/SmoothScroll';
import { links, profile } from '../../data/profile';

const HeroScene = lazy(() => import('../three/HeroScene'));

const EASE = [0.22, 1, 0.36, 1];

const line = (delay) => ({
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 0.9, ease: EASE, delay } },
});

const fade = (delay, y = 18) => ({
  hidden: { opacity: 0, y },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay } },
});

const socials = [
  { href: links.github.url, label: 'GitHub', Icon: FiGithub },
  { href: links.linkedin.url, label: 'LinkedIn', Icon: FiLinkedin },
  { href: links.leetcode.url, label: 'LeetCode', Icon: LeetCodeGlyph },
  { href: `mailto:${profile.email}`, label: 'Email', Icon: FiMail },
];

function LeetCodeGlyph(props) {
  // Feather-weight LeetCode mark so the social row stays visually even.
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...props}>
      <path d="M13.48 2.4a1.02 1.02 0 0 1 1.45 1.43l-2.24 2.27 4.14 4.1a1.02 1.02 0 1 1-1.44 1.45l-4.86-4.83a1.02 1.02 0 0 1 0-1.44l2.95-2.98ZM8.9 7.03a1.02 1.02 0 0 1 1.44 1.44L7.4 11.4a3.38 3.38 0 0 0 0 4.78l3.07 3.05c.63.62 1.47.97 2.36.97.9 0 1.74-.35 2.36-.97l1.9-1.88a1.02 1.02 0 1 1 1.43 1.45l-1.9 1.88A5.36 5.36 0 0 1 12.84 22c-1.44 0-2.8-.56-3.8-1.56l-3.08-3.05a5.42 5.42 0 0 1 0-7.68L8.9 7.03Zm12.08 6.02a1.02 1.02 0 1 1 0 2.04h-8.05a1.02 1.02 0 1 1 0-2.04h8.05Z" />
    </svg>
  );
}

export default function Hero({ introReady }) {
  const { scrollTo } = useSmoothScroll();
  const reduced = useReducedMotion();
  const sectionRef = useRef(null);
  const sceneInView = useInView(sectionRef, { margin: '200px' });
  const [mountScene, setMountScene] = useState(false);

  // Defer the WebGL bundle until the browser is idle so first paint stays fast.
  useEffect(() => {
    if (reduced) return undefined;
    const idle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 350));
    const cancel = window.cancelIdleCallback ?? clearTimeout;
    const id = idle(() => setMountScene(true));
    return () => cancel(id);
  }, [reduced]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-28 pb-20"
      aria-label="Introduction"
    >
      {/* 3D scene — right half on desktop, dimmed backdrop on small screens */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-full opacity-35 lg:w-[54%] lg:opacity-100"
      >
        {mountScene && (
          <Suspense fallback={null}>
            <HeroScene active={sceneInView} />
          </Suspense>
        )}
        {/* Static glow stands in for the scene while it loads / under reduced motion */}
        {!mountScene && (
          <div
            className="absolute right-[8%] top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(141,133,240,0.28) 0%, rgba(239,195,228,0.08) 45%, transparent 70%)',
              filter: 'blur(30px)',
            }}
          />
        )}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        {/* Name */}
        <h1 className="font-sans font-extrabold leading-[0.95] tracking-[-0.03em]">
          <span className="block overflow-hidden pb-1">
            <motion.span
              className="block text-[clamp(3.4rem,11vw,8.2rem)] text-snow"
              variants={line(0.3)}
              initial="hidden"
              animate={introReady ? 'show' : 'hidden'}
            >
              Purva
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-2">
            <motion.span
              className="text-aurora block text-[clamp(3.4rem,11vw,8.2rem)]"
              variants={line(0.42)}
              initial="hidden"
              animate={introReady ? 'show' : 'hidden'}
            >
              Gupta
            </motion.span>
          </span>
        </h1>

        {/* Role sentence */}
        <motion.p
          className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-mist md:text-xl"
          variants={fade(0.62)}
          initial="hidden"
          animate={introReady ? 'show' : 'hidden'}
        >
          Full-stack developer & CSE undergrad crafting{' '}
          <em className="serif-accent text-[1.15em] text-sand">calm, considered</em> web experiences —
          from <em className="serif-accent text-[1.15em] text-rose">pixels</em> to{' '}
          <em className="serif-accent text-[1.15em] text-lav">APIs</em>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-9 flex flex-wrap items-center gap-4"
          variants={fade(0.76)}
          initial="hidden"
          animate={introReady ? 'show' : 'hidden'}
        >
          <Magnetic>
            <button
              onClick={() => scrollTo('#work')}
              className="group inline-flex items-center gap-2.5 rounded-full bg-lav px-7 py-3.5 text-sm font-bold text-ink transition-all duration-300 hover:bg-snow hover:shadow-[0_0_36px_rgba(211,211,255,0.4)]"
            >
              View my work
              <FiArrowDown aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </button>
          </Magnetic>
          <Magnetic>
            <a
              href={profile.resumeFile}
              download={profile.resumeName}
              className="inline-flex items-center gap-2.5 rounded-full border border-lav/20 px-7 py-3.5 text-sm font-semibold text-snow transition-all duration-300 hover:border-lav/50 hover:bg-lav/5"
            >
              <FiDownload aria-hidden="true" />
              Résumé
            </a>
          </Magnetic>

          <div className="ml-1 flex items-center gap-1" role="list" aria-label="Social links">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                role="listitem"
                className="rounded-full p-2.5 text-mist transition-all duration-300 hover:-translate-y-0.5 hover:text-lav"
              >
                <Icon aria-hidden="true" size={19} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollTo('#about')}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        variants={fade(1.3, 0)}
        initial="hidden"
        animate={introReady ? 'show' : 'hidden'}
        aria-label="Scroll to about section"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist">scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-lav/15" aria-hidden="true">
          <motion.span
            className="absolute left-0 top-0 h-3 w-px bg-lav"
            animate={reduced ? {} : { y: [-12, 40] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.button>
    </section>
  );
}
