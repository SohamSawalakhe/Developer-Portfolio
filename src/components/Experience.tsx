import { data } from '../data';
import Reveal from './AnimateOnScroll';

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="section-tag">Journey</span>
            <h2>Experience & Education</h2>
            <p>The chapters of my professional story — from classrooms to codebase.</p>
          </div>
        </Reveal>

        <div className="exp-layout">
          <div className="exp-col">
            <h3>💼 Experience</h3>
            <div className="timeline">
              {data.experience.map((exp, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="tl-item">
                    <div className="tl-dot" />
                    <div className="tl-card">
                      <div className="tl-top">
                        <h4>{exp.role}</h4>
                        <span className="tl-badge">{exp.type}</span>
                      </div>
                      <p className="tl-company">{exp.company}</p>
                      <p className="tl-period">{exp.period} · {exp.location}</p>
                      <ul className="tl-list">
                        {exp.responsibilities.map((r, j) => <li key={j}>{r}</li>)}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="exp-col">
            <h3>🎓 Education</h3>
            <div className="timeline">
              {data.education.map((edu, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="tl-item">
                    <div className="tl-dot" />
                    <div className="tl-card">
                      <div className="tl-top">
                        <h4>{edu.degree}</h4>
                        <span className="tl-badge">{edu.score}</span>
                      </div>
                      <p className="tl-company">{edu.institution}</p>
                      <p className="tl-period">{edu.period}</p>
                      <p className="tl-desc">{edu.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
