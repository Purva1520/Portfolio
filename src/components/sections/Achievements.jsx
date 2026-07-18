import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { FiAward, FiCheckCircle } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import SectionHeading from '../ui/SectionHeading';
import GlowCard from '../ui/GlowCard';
import { Reveal, Stagger, StaggerItem } from '../ui/Reveal';
import { achievements, certifications, stats } from '../../data/profile';

function Counter({ value, decimals, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value.toFixed(decimals) : (0).toFixed(decimals));

  useEffect(() => {
    if (!inView || reduced) return undefined;
    const controls = animate(0, value, {
      duration: 1.7,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, reduced, value, decimals]);

  return (
    <span ref={ref} className="text-aurora font-sans text-5xl font-extrabold tracking-tight md:text-6xl">
      {display}
      <span className="text-3xl md:text-4xl">{suffix}</span>
    </span>
  );
}

export default function Achievements() {
  return (
    <section
      id="milestones"
      className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 md:py-36"
      aria-label="Achievements and certifications"
    >
      <SectionHeading
        index="05"
        eyebrow="Milestones"
        title={
          <>
            Numbers with <span className="serif-accent font-normal text-rose">stories</span> behind
            them
          </>
        }
      />

      {/* Stat counters */}
      <Stagger className="grid grid-cols-2 gap-4 lg:grid-cols-4" gap={0.08}>
        {stats.map((stat) => (
          <StaggerItem key={stat.label}>
            <GlowCard className="glass h-full rounded-3xl p-6 text-center transition-colors duration-500 hover:border-lav/20 md:p-8">
              <Counter value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
              <p className="mt-3 text-xs leading-relaxed text-mist md:text-sm">{stat.label}</p>
            </GlowCard>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Highlight achievements */}
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {achievements.map((achievement, i) => (
          <Reveal key={achievement} delay={i * 0.08}>
            <GlowCard className="glass flex h-full items-start gap-4 rounded-3xl p-6 transition-colors duration-500 hover:border-lav/20 md:p-7">
              <span className="mt-0.5 shrink-0 rounded-full bg-lav/10 p-2.5 text-lav" aria-hidden="true">
                {i === 0 ? <FiAward size={18} /> : <SiLeetcode size={18} />}
              </span>
              <p className="text-sm leading-relaxed text-fog md:text-base">{achievement}</p>
            </GlowCard>
          </Reveal>
        ))}
      </div>

      {/* Certifications */}
      <Reveal className="mt-16">
        <p className="eyebrow mb-6">Certifications</p>
      </Reveal>
      <Stagger className="flex flex-col" gap={0.06}>
        {certifications.map((cert) => (
          <StaggerItem key={cert.name} y={18}>
            <div className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-lav/8 py-5 transition-colors duration-300 first:border-t hover:bg-lav/[0.03]">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="w-44 shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-mist">
                  {cert.issuer}
                </span>
                <span className="text-base font-semibold text-fog transition-colors duration-300 group-hover:text-snow md:text-lg">
                  {cert.name}
                </span>
              </div>
              <FiCheckCircle
                aria-hidden="true"
                className="text-mist/50 transition-colors duration-300 group-hover:text-lav"
              />
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
