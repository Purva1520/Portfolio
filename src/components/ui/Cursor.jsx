import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Custom cursor: a crisp lavender dot, a lagging ring that swells over
 * interactive elements, and a large soft light that drifts behind content.
 * Only active on fine pointers; never rendered for reduced-motion users.
 */
export default function Cursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.6 });
  const lightX = useSpring(x, { stiffness: 60, damping: 20, mass: 1 });
  const lightY = useSpring(y, { stiffness: 60, damping: 20, mass: 1 });

  useEffect(() => {
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return undefined;
    setEnabled(true);
    document.documentElement.dataset.customCursor = 'true';

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e) => {
      if (!(e.target instanceof Element)) return;
      setHovering(Boolean(e.target.closest('a, button, [role="button"], [data-cursor]')));
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      delete document.documentElement.dataset.customCursor;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [reduced, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Ambient light that trails the pointer */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[1] h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x: lightX,
          y: lightY,
          opacity: visible ? 1 : 0,
          background:
            'radial-gradient(circle, rgba(169,162,250,0.075) 0%, rgba(239,195,228,0.03) 40%, transparent 65%)',
        }}
      />
      {/* Lagging ring */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[95] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{ x: ringX, y: ringY, borderColor: 'rgba(211,211,255,0.4)' }}
        animate={{
          scale: pressed ? 0.7 : hovering ? 1.8 : 1,
          opacity: visible ? (hovering ? 0.9 : 0.55) : 0,
          backgroundColor: hovering ? 'rgba(211,211,255,0.06)' : 'rgba(211,211,255,0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      />
      {/* Core dot */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[96] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lav"
        style={{ x, y, opacity: visible ? 1 : 0 }}
      />
    </>
  );
}
