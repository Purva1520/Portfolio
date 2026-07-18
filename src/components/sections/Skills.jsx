import {
  SiC, SiCplusplus, SiPython, SiJavascript, SiHtml5, SiReact, SiTailwindcss, SiVite,
  SiNodedotjs, SiExpress, SiMongodb, SiMysql, SiPostgresql, SiLinux, SiDocker,
  SiKubernetes, SiGit, SiFigma, SiNumpy, SiOpencv,
} from 'react-icons/si';
import { FiPenTool } from 'react-icons/fi';
import { FaJava } from 'react-icons/fa6';
import { TbApi, TbBinaryTree, TbBrandCss3, TbDatabase, TbDeviceMobile } from 'react-icons/tb';
import SectionHeading from '../ui/SectionHeading';
import GlowCard from '../ui/GlowCard';
import { Stagger, StaggerItem } from '../ui/Reveal';
import { skillGroups } from '../../data/profile';

const iconMap = {
  C: SiC,
  'C++': SiCplusplus,
  Java: FaJava,
  Python: SiPython,
  JavaScript: SiJavascript,
  SQL: TbDatabase,
  HTML5: SiHtml5,
  CSS3: TbBrandCss3,
  'React.js': SiReact,
  'Tailwind CSS': SiTailwindcss,
  Vite: SiVite,
  'Responsive UI': TbDeviceMobile,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  'REST APIs': TbApi,
  MongoDB: SiMongodb,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  'Data Structures & Algorithms': TbBinaryTree,
  'Linux Administration': SiLinux,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  'Git & GitHub': SiGit,
  Figma: SiFigma,
  Canva: FiPenTool,
  NumPy: SiNumpy,
  OpenCV: SiOpencv,
};

/* Per-category accents drawn from the site palette */
const accents = {
  languages: { hex: '211, 211, 255', text: 'text-lav' },
  frontend: { hex: '239, 195, 228', text: 'text-rose' },
  backend: { hex: '232, 207, 181', text: 'text-sand' },
  systems: { hex: '169, 162, 250', text: 'text-iris' },
  design: { hex: '170, 168, 197', text: 'text-fog' },
};

function SkillPill({ name, accent }) {
  const Icon = iconMap[name];
  return (
    <li>
      <span
        className="flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-medium transition-all duration-300 hover:-translate-y-0.5"
        style={{
          borderColor: `rgba(${accent.hex}, 0.22)`,
          background: `rgba(${accent.hex}, 0.07)`,
          color: `rgb(${accent.hex})`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = `rgba(${accent.hex}, 0.16)`;
          e.currentTarget.style.boxShadow = `0 6px 22px rgba(${accent.hex}, 0.18)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = `rgba(${accent.hex}, 0.07)`;
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {Icon && <Icon aria-hidden="true" className="opacity-80" size={14} />}
        {name}
      </span>
    </li>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 md:py-36" aria-label="Skills">
      <SectionHeading
        index="02"
        eyebrow="Skills"
        title={
          <>
            The tools I <span className="serif-accent font-normal text-rose">reach for</span> daily
          </>
        }
      />

      <Stagger className="grid gap-4 md:grid-cols-2" gap={0.1}>
        {skillGroups.map((group, i) => {
          const accent = accents[group.id];
          const wide = i === skillGroups.length - 1 && skillGroups.length % 2 === 1;
          return (
            <StaggerItem key={group.id} className={wide ? 'md:col-span-2' : ''}>
              <GlowCard className="glass group relative h-full overflow-hidden rounded-3xl p-6 transition-colors duration-500 hover:border-lav/20 md:p-8">
                {/* Accent wash in the corner */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-40 transition-opacity duration-700 group-hover:opacity-70"
                  style={{ background: `radial-gradient(circle, rgba(${accent.hex}, 0.16) 0%, transparent 70%)` }}
                />

                <div className="relative flex items-center justify-between gap-4">
                  <div className="flex items-baseline gap-3">
                    <span className={`font-mono text-[11px] ${accent.text}`}>0{i + 1}</span>
                    <h3 className="text-lg font-extrabold tracking-tight text-snow md:text-xl">
                      {group.label}
                    </h3>
                  </div>
                  <span
                    className="rounded-full px-2.5 py-1 font-mono text-[10px]"
                    style={{ background: `rgba(${accent.hex}, 0.1)`, color: `rgb(${accent.hex})` }}
                  >
                    {group.skills.length}
                  </span>
                </div>

                <p className="relative mt-2 max-w-md text-sm leading-relaxed text-mist">{group.blurb}</p>

                <ul className="relative mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <SkillPill key={skill} name={skill} accent={accent} />
                  ))}
                </ul>
              </GlowCard>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
