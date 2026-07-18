import { FiArrowUp } from 'react-icons/fi';
import Magnetic from '../ui/Magnetic';
import { useSmoothScroll } from '../../context/SmoothScroll';
import { profile } from '../../data/profile';

export default function Footer() {
  const { scrollTo } = useSmoothScroll();

  return (
    <footer className="relative border-t border-lav/8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 py-10 sm:px-8">
        <Magnetic>
          <button
            onClick={() => scrollTo(0)}
            aria-label="Back to top"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-lav/15 text-fog transition-all duration-300 hover:border-lav/40 hover:text-lav"
          >
            <FiArrowUp aria-hidden="true" />
          </button>
        </Magnetic>
        <p className="text-center text-sm text-mist">
          © {new Date().getFullYear()} <span className="font-semibold text-fog">{profile.name}</span>
        </p>
      </div>
    </footer>
  );
}
