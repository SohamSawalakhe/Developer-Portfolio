import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaBars, FaTimes } from 'react-icons/fa';
import { data } from '../data';

interface NavbarProps {
  pages: Array<{ id: string; label: string }>;
  activePage: number;
  onNavigate: (idx: number) => void;
}

export default function Navbar({ pages, activePage, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (idx: number) => {
    setOpen(false);
    onNavigate(idx);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <div className="navbar-logo" onClick={() => go(0)}>
          <span className="logo-bracket">{'<'}</span>
          <span className="logo-text">{data.personal.firstName}</span>
          <span className="logo-bracket">{' />'}</span>
        </div>
        <ul className={`navbar-links ${open ? 'open' : ''}`}>
          {pages.map((page, idx) => (
            <li key={page.id}>
              <a
                href={`#${page.id}`}
                className={`nav-link ${activePage === idx ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); go(idx); }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <span className="nav-link-number">{String(idx + 1).padStart(2, '0')}</span>
                <span className="nav-link-text">{page.label}</span>
                {/* Active glow indicator */}
                {activePage === idx && <span className="nav-active-glow" />}
                {/* Hover teleport effect */}
                {hoveredIdx === idx && activePage !== idx && (
                  <span className="nav-hover-beam" />
                )}
              </a>
            </li>
          ))}
          <li className="nav-divider" />
          <li>
            <a href={data.personal.github} target="_blank" rel="noopener noreferrer" title="GitHub" className="nav-social">
              <FaGithub />
            </a>
          </li>
          <li>
            <a href={data.personal.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="nav-social">
              <FaLinkedin />
            </a>
          </li>
        </ul>
        <button className="mobile-menu-btn" onClick={() => setOpen(!open)}>
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Progress bar showing which page we're on */}
      <div className="navbar-progress">
        <div
          className="navbar-progress-fill"
          style={{ width: `${((activePage) / (pages.length - 1)) * 100}%` }}
        />
      </div>
    </nav>
  );
}
