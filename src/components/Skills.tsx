import { data } from '../data';
import Reveal from './AnimateOnScroll';

const cats = [
  { key: 'languages' as const, label: 'Programming Languages' },
  { key: 'frameworks' as const, label: 'Frameworks & Libraries' },
  { key: 'aiml' as const, label: 'AI / ML / Data' },
  { key: 'tools' as const, label: 'Dev Tools & Platforms' },
];

export default function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="section-tag">Skills</span>
            <h2>Technical Arsenal</h2>
            <p>Weapons of mass creation — languages, frameworks, and tools in my arsenal.</p>
          </div>
        </Reveal>

        <div className="skills-grid">
          {cats.map((c, ci) => (
            <Reveal key={c.key} delay={ci * 100}>
              <div className="skill-card">
                <h3>{c.label}</h3>
                {data.skills[c.key].map(s => (
                  <div className="skill-row" key={s.name}>
                    <div className="skill-meta">
                      <span className="skill-name">{s.name}</span>
                      <span className="skill-pct">{s.level}%</span>
                    </div>
                    <div className="skill-track">
                      <div className="skill-fill" style={{ width: `${s.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
