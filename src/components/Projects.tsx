import { useState } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { data } from '../data';
import Reveal from './AnimateOnScroll';

const cats = ['All', ...new Set(data.projects.map(p => p.category))];

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const list = filter === 'All' ? data.projects : data.projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="section-tag">Portfolio</span>
            <h2>Featured Projects</h2>
            <p>Battle-tested projects that push boundaries — from AI to full-stack systems.</p>
          </div>
        </Reveal>

        <Reveal>
          <div className="filter-bar">
            {cats.map(c => (
              <button
                key={c}
                className={`filter-btn ${filter === c ? 'active' : ''}`}
                onClick={() => setFilter(c)}
              >{c}</button>
            ))}
          </div>
        </Reveal>

        <div className="projects-grid">
          {list.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <div className="proj-card">
                <div className="proj-img-wrap">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="proj-img"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${p.name.replace(/\s/g, '+')}&size=800&background=020617&color=00d4ff&bold=true&font-size=0.18&length=3`;
                    }}
                  />
                  <span className="proj-cat">{p.category}</span>
                </div>
                <div className="proj-body">
                  <h3>{p.name}</h3>
                  <div className="proj-tech">{p.technologies}</div>
                  <p>{p.description}</p>
                  <ul className="proj-hl">
                    {p.highlights.slice(0, 3).map((h, j) => <li key={j}>{h}</li>)}
                  </ul>
                  <div className="proj-links">
                    <a href={p.link} target="_blank" rel="noopener noreferrer"><FaGithub /> Code</a>
                    <a href={p.link} target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt /> Demo</a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
