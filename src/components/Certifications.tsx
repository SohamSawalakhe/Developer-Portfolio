import { FaShieldAlt, FaRobot, FaMicrochip, FaChartBar, FaChartLine, FaCode, FaUsers, FaBriefcase } from 'react-icons/fa';
import { data } from '../data';
import Reveal from './AnimateOnScroll';

const icons: Record<string, React.ReactNode> = {
  'shield': <FaShieldAlt />, 'robot': <FaRobot />, 'cpu': <FaMicrochip />,
  'bar-chart': <FaChartBar />, 'graph': <FaChartLine />, 'code': <FaCode />,
  'people': <FaUsers />, 'briefcase': <FaBriefcase />,
};

export default function Certifications() {
  return (
    <section id="certifications" className="section">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="section-tag">Credentials</span>
            <h2>Certifications</h2>
            <p>Professional badges earned through rigorous training and examinations.</p>
          </div>
        </Reveal>

        <div className="certs-grid">
          {data.certifications.map((c, i) => (
            <Reveal key={c.name} delay={i * 70}>
              <div className="cert-card">
                <div className="cert-icon">{icons[c.icon] || <FaCode />}</div>
                <h4>{c.name}</h4>
                <div className="cert-issuer"><strong>{c.issuer}</strong> · {c.date}</div>
                <p className="cert-desc">{c.description}</p>
                <div className="cert-tags">
                  {c.skills.map(s => <span key={s} className="cert-tag">{s}</span>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
