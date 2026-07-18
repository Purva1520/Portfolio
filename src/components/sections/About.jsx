import { useEffect, useState } from 'react';
import { FiMapPin } from 'react-icons/fi';
import SectionHeading from '../ui/SectionHeading';
import GlowCard from '../ui/GlowCard';
import { Stagger, StaggerItem } from '../ui/Reveal';
import { profile, softSkills } from '../../data/profile';

function LocalClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const time = now.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Kolkata',
  });
  return (
    <time className="font-mono text-2xl text-snow" dateTime={now.toISOString()}>
      {time}
      <span className="ml-2 text-xs text-mist">IST</span>
    </time>
  );
}

const cardBase = 'glass rounded-3xl p-6 transition-colors duration-500 hover:border-lav/20 md:p-7';

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 md:py-36" aria-label="About">
      <SectionHeading
        index="01"
        eyebrow="About"
        title={
          <>
            A curious builder with a{' '}
            <span className="serif-accent font-normal text-sand">soft spot</span> for structure
          </>
        }
      />

      <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" gap={0.08}>
        {/* Bio — the anchor card */}
        <StaggerItem className="md:col-span-2">
          <GlowCard className={`${cardBase} flex h-full items-center`}>
            <p className="max-w-prose text-pretty text-lg leading-relaxed text-fog md:text-xl">
              {profile.summary}
            </p>
          </GlowCard>
        </StaggerItem>

        {/* CGPA */}
        <StaggerItem>
          <GlowCard className={`${cardBase} h-full`}>
            <p className="eyebrow">Academics</p>
            <p className="text-aurora mt-4 font-sans text-6xl font-extrabold tracking-tight">9.05</p>
            <p className="mt-2 text-sm text-mist">CGPA · B.E. Computer Science, Chitkara University</p>
          </GlowCard>
        </StaggerItem>

        {/* LeetCode */}
        <StaggerItem>
          <GlowCard className={`${cardBase} h-full`}>
            <p className="eyebrow">Practice</p>
            <p className="mt-4 font-sans text-6xl font-extrabold tracking-tight text-snow">
              150<span className="text-lav">+</span>
            </p>
            <p className="mt-2 text-sm text-mist">
              LeetCode problems solved, with a 50-day coding-streak badge on the shelf
            </p>
          </GlowCard>
        </StaggerItem>

        {/* Location + live clock */}
        <StaggerItem>
          <GlowCard className={`${cardBase} flex h-full flex-col justify-between gap-6`}>
            <p className="eyebrow flex items-center gap-2">
              <FiMapPin aria-hidden="true" className="text-lav/70" />
              Based in
            </p>
            <div>
              <p className="text-lg font-semibold text-snow">{profile.location}</p>
              <div className="mt-1.5">
                <LocalClock />
              </div>
            </div>
          </GlowCard>
        </StaggerItem>

        {/* Soft skills */}
        <StaggerItem>
          <GlowCard className={`${cardBase} h-full`}>
            <p className="eyebrow">Beyond the code</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {softSkills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-lav/12 px-3 py-1.5 text-xs font-medium text-fog"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </GlowCard>
        </StaggerItem>
      </Stagger>
    </section>
  );
}
