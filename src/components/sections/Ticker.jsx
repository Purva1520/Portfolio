import { useReducedMotion } from 'framer-motion';
import { tickerItems } from '../../data/profile';

/** Infinite marquee of specialties between the hero and the page body. */
export default function Ticker() {
  const reduced = useReducedMotion();

  const row = (hidden) => (
    <ul
      className={`flex w-max items-center ${reduced ? 'flex-wrap justify-center' : ''}`}
      aria-hidden={hidden || undefined}
    >
      {tickerItems.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap px-5 py-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-mist">{item}</span>
          <span className="ml-10 text-xs text-sand/60" aria-hidden="true">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Specialties" className="relative border-y border-lav/8 bg-surface/40">
      {reduced ? (
        row(false)
      ) : (
        <div className="mask-fade-x overflow-hidden">
          <div className="animate-marquee flex w-max [animation-play-state:running] hover:[animation-play-state:paused]">
            {row(false)}
            {row(true)}
          </div>
        </div>
      )}
    </section>
  );
}
