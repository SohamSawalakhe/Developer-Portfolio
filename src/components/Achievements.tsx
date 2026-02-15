import { FaBookOpen, FaAward, FaTrophy, FaLightbulb, FaUsers, FaHeart } from 'react-icons/fa';
import { data } from '../data';
import Reveal from './AnimateOnScroll';

const icons: Record<string, React.ReactNode> = {
  'journal': <FaBookOpen />, 'award': <FaAward />, 'trophy': <FaTrophy />,
  'lightbulb': <FaLightbulb />, 'people': <FaUsers />, 'heart': <FaHeart />,
};

export default function Achievements() {
  return (
    <section id="achievements" className="section skills-section">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="section-tag">Milestones</span>
            <h2>Achievements</h2>
            <p>Key victories and recognition earned along the way.</p>
          </div>
        </Reveal>

        <div className="ach-grid">
          {data.achievements.map((a, i) => (
            <Reveal key={a.title} delay={i * 70}>
              <div className="ach-card">
                <div className="ach-icon">{icons[a.icon] || <FaAward />}</div>
                <div className="ach-info">
                  <h4>{a.title}</h4>
                  <div className="ach-year">{a.year}</div>
                  <p>{a.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
