import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMenu, FiX, FiGithub, FiLinkedin } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import { useSmoothScroll } from '../../context/SmoothScroll';
import { links, navLinks, profile } from '../../data/profile';

export default function Navbar({ ready }) {
  const { scrollTo } = useSmoothScroll();
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  // Track which section is in the middle of the viewport
  useEffect(() => {
    const sections = ['home', ...navLinks.map((l) => l.id)]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const goTo = (id) => {
    setMenuOpen(false);
    scrollTo(`#${id}`);
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-4 z-[85] flex justify-center px-4"
        initial={{ y: -32, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      >
        <nav
          aria-label="Primary"
          className="glass relative flex w-full max-w-2xl items-center justify-between rounded-full py-1.5 pl-5 pr-1.5 shadow-lg shadow-bg/60"
        >
          <button
            onClick={() => scrollTo(0)}
            className="serif-accent text-xl text-lav transition-colors hover:text-snow"
            aria-label="Back to top"
          >
            P<span className="text-sand">.</span>
          </button>

          {/* A normal flex child: justify-between on the nav makes the gap
              logo→tabs equal to the gap tabs→Résumé, so the tabs read as
              optically centered despite the logo and button differing in width. */}
          <ul className="hidden items-center md:flex">
            {navLinks.map((link) => (
              <li key={link.id} className="relative">
                <button
                  onClick={() => goTo(link.id)}
                  aria-current={activeSection === link.id ? 'true' : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-[0.82rem] font-medium transition-colors duration-300 ${
                    activeSection === link.id ? 'text-snow' : 'text-mist hover:text-fog'
                  }`}
                >
                  {activeSection === link.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-lav/10"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <a
              href={profile.resumeFile}
              download={profile.resumeName}
              className="hidden rounded-full bg-lav px-4 py-2 text-[0.82rem] font-bold text-ink transition-all duration-300 hover:bg-snow hover:shadow-[0_0_24px_rgba(211,211,255,0.35)] sm:block"
            >
              Résumé
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              className="rounded-full p-2.5 text-fog md:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <FiMenu aria-hidden="true" size={20} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[92] flex flex-col bg-bg/92 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between px-6 pt-7">
              <span className="serif-accent text-xl text-lav">
                P<span className="text-sand">.</span>
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-lav/15 p-2.5 text-fog"
                aria-label="Close menu"
              >
                <FiX aria-hidden="true" size={20} />
              </button>
            </div>

            <ul className="flex flex-1 flex-col justify-center gap-2 px-8">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    onClick={() => goTo(link.id)}
                    className="group flex w-full items-baseline gap-4 py-2 text-left"
                  >
                    <span className="font-mono text-xs text-mist">0{i + 1}</span>
                    <span className="serif-accent text-4xl text-snow transition-colors group-hover:text-lav">
                      {link.label}
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="flex items-center justify-between border-t border-lav/10 px-8 py-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.35 }}
            >
              <div className="flex gap-5 text-fog">
                <a href={links.github.url} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <FiGithub size={20} />
                </a>
                <a href={links.linkedin.url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FiLinkedin size={20} />
                </a>
                <a href={links.leetcode.url} target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
                  <SiLeetcode size={20} />
                </a>
              </div>
              <a
                href={profile.resumeFile}
                download={profile.resumeName}
                className="rounded-full bg-lav px-5 py-2.5 text-sm font-bold text-ink"
              >
                Résumé
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
