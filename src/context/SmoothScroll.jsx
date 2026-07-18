import { createContext, useCallback, useContext } from 'react';
import { useReducedMotion } from 'framer-motion';

const SmoothScrollContext = createContext({ scrollTo: () => {} });

// eslint-disable-next-line react-refresh/only-export-components
export const useSmoothScroll = () => useContext(SmoothScrollContext);

/**
 * Thin wrapper over native smooth scrolling. Sections declare their own
 * `scroll-margin-top`, so a plain scrollIntoView lands below the navbar.
 */
export function SmoothScrollProvider({ children }) {
  const reduced = useReducedMotion();

  const scrollTo = useCallback(
    (target) => {
      const behavior = reduced ? 'auto' : 'smooth';
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior });
        return;
      }
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      el?.scrollIntoView({ behavior, block: 'start' });
    },
    [reduced]
  );

  return (
    <SmoothScrollContext.Provider value={{ scrollTo }}>{children}</SmoothScrollContext.Provider>
  );
}
