/** Card whose inner radial glow tracks the pointer (see `.glow-card`). */
export default function GlowCard({ children, className = '', as: Tag = 'div', ...rest }) {
  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <Tag onMouseMove={onMouseMove} className={`glow-card ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
