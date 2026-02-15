import { useEffect, useState } from 'react';
import { FaEnvelope, FaMicrochip, FaCode, FaRocket, FaDownload } from 'react-icons/fa';
import { data } from '../data';

export default function Hero({ isHomePage }: { isHomePage?: boolean }) {
  const [typed, setTyped] = useState('');
  const [idx, setIdx] = useState(0);
  const [charI, setCharI] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const items = data.personal.typedItems;
    const word = items[idx % items.length];
    const t = setTimeout(() => {
      if (!del) {
        setTyped(word.slice(0, charI + 1));
        setCharI(charI + 1);
        if (charI + 1 === word.length) setTimeout(() => setDel(true), 2000);
      } else {
        setTyped(word.slice(0, charI - 1));
        setCharI(charI - 1);
        if (charI - 1 === 0) { setDel(false); setIdx(idx + 1); }
      }
    }, del ? 35 : 70);
    return () => clearTimeout(t);
  }, [charI, del, idx]);

  return (
    <section id="hero" className="hero">
      {/* Animated grid background for hero */}
      <div className="hero-grid-bg" />
      
      <div className="hero-content">
        <div className="hero-badge">
          <span className="dot" />
          Open to Opportunities
        </div>

        <h1>
          <span className="first">{data.personal.firstName} </span>
          <span className="last">{data.personal.lastName}</span>
        </h1>

        <div className="hero-typed">
          {'> '}<strong>{typed}</strong>
          <span className="cursor">_</span>
        </div>

        <p className="hero-desc">{data.personal.professionalSummary}</p>

        <div className="hero-actions">
          {isHomePage && (
            <a href={data.personal.resume} target="_blank" rel="noopener noreferrer" className="btn btn-glow">
              <FaDownload /> Download Resume
            </a>
          )}
          <a href={`mailto:${data.personal.email}`} className="btn btn-ghost">
            <FaEnvelope /> Get In Touch
          </a>
        </div>

        <div className="hero-tags">
          <span className="hero-tag"><FaMicrochip /> AI/ML</span>
          <span className="hero-tag"><FaCode /> Full-Stack</span>
          <span className="hero-tag"><FaRocket /> {data.facts.projects} Projects</span>
        </div>
      </div>

      <div className="scroll-cue">
        <div className="scroll-cue-line" />
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
