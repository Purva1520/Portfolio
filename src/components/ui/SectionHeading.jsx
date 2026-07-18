import { Reveal } from './Reveal';

/**
 * Consistent section opener: numbered mono eyebrow, display title
 * (accepts JSX so titles can mix serif italics), optional lead line.
 */
export default function SectionHeading({ index, eyebrow, title, lead, align = 'left' }) {
  const centered = align === 'center';
  return (
    <div className={`mb-14 md:mb-20 ${centered ? 'text-center' : ''}`}>
      <Reveal>
        <p className="eyebrow flex items-center gap-3" style={centered ? { justifyContent: 'center' } : undefined}>
          <span className="text-lav/80">{index}</span>
          <span aria-hidden="true" className="h-px w-8 bg-lav/25" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-5 max-w-3xl text-balance font-sans text-4xl font-extrabold tracking-tight text-snow sm:text-5xl md:text-[3.4rem] md:leading-[1.08]"
          style={centered ? { marginInline: 'auto' } : undefined}
        >
          {title}
        </h2>
      </Reveal>
      {lead ? (
        <Reveal delay={0.16}>
          <p className={`mt-5 max-w-xl text-base leading-relaxed text-mist md:text-lg ${centered ? 'mx-auto' : ''}`}>
            {lead}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
