import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, useReducedMotion } from 'framer-motion';
import { SmoothScrollProvider } from './context/SmoothScroll';
import Cursor from './components/ui/Cursor';
import Loader from './components/ui/Loader';
import ScrollProgress from './components/ui/ScrollProgress';
import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';
import Ticker from './components/sections/Ticker';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Journey from './components/sections/Journey';
import Achievements from './components/sections/Achievements';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';

/** Fixed, softly drifting aurora blobs behind the whole page. */
function AmbientBackground() {
  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden">
      <div className="aurora-blob aurora-lav" />
      <div className="aurora-blob aurora-rose" />
      <div className="aurora-blob aurora-sand" />
    </div>
  );
}

export default function App() {
  const reduced = useReducedMotion();
  const [loading, setLoading] = useState(true);

  // Opening curtain duration (short-circuited for reduced motion)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), reduced ? 250 : 2150);
    return () => clearTimeout(timer);
  }, [reduced]);

  // Lock scroll while the loader plays
  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider>
        <a
          href="#main"
          className="sr-only z-[99] rounded-full bg-lav px-5 py-2.5 font-bold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>

        <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>

        <Cursor />
        <ScrollProgress />
        <AmbientBackground />

        <Navbar ready={!loading} />

        <main id="main" className="relative z-10">
          <Hero introReady={!loading} />
          <Ticker />
          <About />
          <Skills />
          <Projects />
          <Journey />
          <Achievements />
          <Contact />
        </main>

        <Footer />
      </SmoothScrollProvider>
    </MotionConfig>
  );
}
