import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowUpRight, FiCheck, FiCopy, FiGithub, FiLinkedin, FiPhone } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import SectionHeading from '../ui/SectionHeading';
import GlowCard from '../ui/GlowCard';
import Magnetic from '../ui/Magnetic';
import { Reveal, Stagger, StaggerItem } from '../ui/Reveal';
import { links, profile } from '../../data/profile';

function CopyButton({ value, label }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — the adjacent link still works */
    }
  };

  return (
    <button
      onClick={copy}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      className="relative flex h-11 w-11 items-center justify-center rounded-full border border-lav/15 text-mist transition-all duration-300 hover:border-lav/40 hover:text-lav"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? 'check' : 'copy'}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.16 }}
        >
          {copied ? <FiCheck aria-hidden="true" className="text-emerald-300" /> : <FiCopy aria-hidden="true" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

const profileCards = [
  { ...links.github, Icon: FiGithub, note: 'Projects & experiments' },
  { ...links.linkedin, Icon: FiLinkedin, note: 'The professional trail' },
  { ...links.leetcode, Icon: SiLeetcode, note: '150+ problems deep' },
];

export default function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 md:py-40" aria-label="Contact">
      <SectionHeading
        index="06"
        eyebrow="Contact"
        align="center"
        title={
          <>
            Let’s build something{' '}
            <span className="serif-accent font-normal text-lav">lovely</span> together
          </>
        }
        lead="Internships, collaborations or a good problem to solve — my inbox is open."
      />

      {/* Email + phone */}
      <Reveal className="flex flex-col items-center gap-5">
        <div className="flex items-center gap-3">
          <Magnetic>
            <a
              href={`mailto:${profile.email}`}
              className="glass group inline-flex items-center gap-3 rounded-full px-6 py-4 text-base font-semibold text-snow transition-all duration-300 hover:border-lav/35 hover:shadow-[0_0_40px_rgba(169,162,250,0.18)] sm:px-8 sm:text-lg"
            >
              <span className="animate-pulse-dot h-2 w-2 rounded-full bg-emerald-300" aria-hidden="true" />
              <span className="break-all">{profile.email}</span>
              <FiArrowUpRight
                aria-hidden="true"
                className="shrink-0 text-mist transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lav"
              />
            </a>
          </Magnetic>
          <CopyButton value={profile.email} label="email address" />
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${profile.phoneHref}`}
            className="inline-flex items-center gap-2.5 text-sm text-mist transition-colors duration-300 hover:text-fog"
          >
            <FiPhone aria-hidden="true" className="text-lav/70" />
            {profile.phone}
          </a>
          <CopyButton value={profile.phone} label="phone number" />
        </div>
      </Reveal>

      {/* Elsewhere */}
      <Stagger className="mx-auto mt-16 grid max-w-3xl gap-4 sm:grid-cols-3" gap={0.09}>
        {profileCards.map(({ label, handle, url, Icon, note }) => (
          <StaggerItem key={label}>
            <GlowCard
              as="a"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass group flex h-full flex-col gap-6 rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-lav/25"
            >
              <div className="flex items-center justify-between">
                <Icon aria-hidden="true" size={22} className="text-fog transition-colors duration-300 group-hover:text-lav" />
                <FiArrowUpRight
                  aria-hidden="true"
                  className="text-mist/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lav"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-snow">{label}</p>
                <p className="mt-0.5 font-mono text-xs text-mist">{handle}</p>
                <p className="mt-2 text-xs text-mist/80">{note}</p>
              </div>
            </GlowCard>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
