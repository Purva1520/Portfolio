import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FiBookOpen } from 'react-icons/fi';
import SectionHeading from '../ui/SectionHeading';
import GlowCard from '../ui/GlowCard';
import { Reveal } from '../ui/Reveal';
import { journey } from '../../data/profile';

export default function Journey() {
  const railRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 0.8', 'end 0.45'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="journey" className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 md:py-36" aria-label="Journey">
      <SectionHeading
        index="04"
        eyebrow="Journey"
        title={
          <>
            The path <span className="serif-accent font-normal text-sand">so far</span>
          </>
        }
        lead="Year by year — the education that shaped how I build."
      />

      <div ref={railRef} className="relative ml-2 sm:ml-4">
        {/* Rail */}
        <div aria-hidden="true" className="absolute bottom-2 left-0 top-2 w-px bg-lav/10" />
        <motion.div
          aria-hidden="true"
          className="absolute bottom-2 left-0 top-2 w-px origin-top bg-gradient-to-b from-lav via-rose to-sand"
          style={{ scaleY }}
        />

        <ol className="flex flex-col gap-8">
          {journey.map((item, i) => (
            <li key={`${item.title}-${i}`} className="relative pl-9 sm:pl-12">
              {/* Node */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-8 flex h-3 w-3 -translate-x-1/2 items-center justify-center"
              >
                <span className="h-2.5 w-2.5 rounded-full border border-lav/50 bg-bg" />
              </span>

              <Reveal y={26} delay={0.05}>
                <GlowCard className="glass rounded-3xl p-6 transition-colors duration-500 hover:border-lav/20 md:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] text-lav/80">0{i + 1}</span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-lav/25 bg-lav/8 px-3 py-1 text-[11px] font-semibold text-lav">
                        <FiBookOpen aria-hidden="true" size={11} />
                        Education
                      </span>
                    </div>
                    <span className="font-mono text-xs tracking-wider text-mist">{item.period}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="text-xl font-extrabold tracking-tight text-snow md:text-2xl">
                      {item.title}
                    </h3>
                    {item.metric && (
                      <span className="text-aurora font-sans text-2xl font-extrabold tracking-tight">
                        {item.metric}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm font-medium text-lav/80">{item.subtitle}</p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist">{item.detail}</p>
                </GlowCard>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
