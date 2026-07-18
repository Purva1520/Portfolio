import { FiArrowUpRight, FiGithub } from 'react-icons/fi';
import SectionHeading from '../ui/SectionHeading';
import GlowCard from '../ui/GlowCard';
import { Reveal, Stagger, StaggerItem } from '../ui/Reveal';
import Magnetic from '../ui/Magnetic';
import { links, projects } from '../../data/profile';

const accents = {
  lavender: { hex: '211, 211, 255', text: 'text-lav' },
  sand: { hex: '232, 207, 181', text: 'text-sand' },
};

function ProjectCard({ project }) {
  const accent = accents[project.accent];
  return (
    <GlowCard className="glass group relative flex h-full flex-col overflow-hidden rounded-3xl p-7 transition-colors duration-500 hover:border-lav/25 md:p-9">
      {/* Accent wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-40 transition-opacity duration-700 group-hover:opacity-75"
        style={{ background: `radial-gradient(circle, rgba(${accent.hex}, 0.15) 0%, transparent 70%)` }}
      />
      {/* Oversized watermark index */}
      <span
        aria-hidden="true"
        className="serif-accent pointer-events-none absolute -top-7 right-4 text-[7.5rem] leading-none opacity-[0.07] transition-opacity duration-700 group-hover:opacity-[0.13]"
        style={{ color: `rgb(${accent.hex})` }}
      >
        {project.index}
      </span>

      <p className="eyebrow relative">
        <span className={accent.text}>{project.index}</span> — {project.kind}
      </p>

      <h3 className="relative mt-4 text-3xl font-extrabold tracking-tight text-snow md:text-4xl">
        {project.name}
      </h3>

      <p className="relative mt-4 max-w-lg text-pretty leading-relaxed text-mist">
        {project.description}
      </p>

      <ul className="relative mt-6 flex flex-col gap-2.5">
        {project.points.map((point) => (
          <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-fog">
            <span aria-hidden="true" className={`mt-1.5 text-[10px] ${accent.text}`}>
              ✦
            </span>
            {point}
          </li>
        ))}
      </ul>

      <ul className="relative mt-7 flex flex-wrap gap-2" aria-label="Technology stack">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-full border px-3 py-1.5 font-mono text-[11px]"
            style={{
              borderColor: `rgba(${accent.hex}, 0.2)`,
              background: `rgba(${accent.hex}, 0.06)`,
              color: `rgb(${accent.hex})`,
            }}
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="relative mt-auto pt-8">
        <Magnetic>
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-2.5 rounded-full border border-lav/20 px-6 py-3 text-sm font-semibold text-snow transition-all duration-300 hover:border-lav/50 hover:bg-lav/5"
          >
            <FiGithub aria-hidden="true" />
            View on GitHub
            <FiArrowUpRight
              aria-hidden="true"
              className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
            />
          </a>
        </Magnetic>
      </div>
    </GlowCard>
  );
}

export default function Projects() {
  return (
    <section id="work" className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 md:py-36" aria-label="Selected work">
      <SectionHeading
        index="03"
        eyebrow="Selected Work"
        title={
          <>
            Things I have <span className="serif-accent font-normal text-lav">built</span>
          </>
        }
        lead="Full-stack products, designed and engineered end to end — from data model to the last hover state."
      />

      <Stagger className="grid gap-4 lg:grid-cols-2" gap={0.12}>
        {projects.map((project) => (
          <StaggerItem key={project.id}>
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </Stagger>

      {/* More on GitHub */}
      <Reveal className="mt-4" y={30}>
        <GlowCard className="glass flex flex-col items-center gap-5 rounded-3xl px-8 py-12 text-center">
          <p className="serif-accent text-2xl text-fog md:text-3xl">
            More experiments live on <span className="text-lav">GitHub</span>
          </p>
          <p className="max-w-md text-sm text-mist">
            From DSA practice to weekend builds — the full picture of what I am learning right now.
          </p>
          <Magnetic>
            <a
              href={links.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-lav px-6 py-3 text-sm font-bold text-ink transition-all duration-300 hover:bg-snow hover:shadow-[0_0_30px_rgba(211,211,255,0.35)]"
            >
              <FiGithub aria-hidden="true" />
              {links.github.handle}
            </a>
          </Magnetic>
        </GlowCard>
      </Reveal>
    </section>
  );
}
