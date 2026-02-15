import { FaEnvelope } from 'react-icons/fa';
import { data } from '../data';
import Reveal from './AnimateOnScroll';

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="section-tag">About Me</span>
            <h2>Behind The Code</h2>
            <p>The story of a developer building the future, one commit at a time.</p>
          </div>
        </Reveal>

        <Reveal>
          <div className="about-grid">
            <div className="about-image-container">
              <img
                src={data.personal.image}
                alt={data.personal.name}
                className="about-image"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${data.personal.firstName}+${data.personal.lastName}&size=300&background=020617&color=00d4ff&bold=true&font-size=0.4`;
                }}
              />
            </div>
            <div className="about-content">
              <h3>{data.personal.name}</h3>
              <p className="about-role">{data.personal.tagline}</p>
              <p className="about-text">{data.personal.about}</p>

              <div className="about-details">
                <div className="about-detail"><strong>Birthday:</strong> <span>{data.personal.birthday}</span></div>
                <div className="about-detail"><strong>Age:</strong> <span>{data.personal.age}</span></div>
                <div className="about-detail"><strong>Degree:</strong> <span>{data.personal.degree}</span></div>
                <div className="about-detail"><strong>Location:</strong> <span>{data.personal.location}</span></div>
                <div className="about-detail"><strong>Email:</strong> <span>{data.personal.email}</span></div>
                <div className="about-detail"><strong>Phone:</strong> <span>{data.personal.phone}</span></div>
              </div>

              <div className="about-actions">
                <a href={`mailto:${data.personal.email}`} className="btn btn-glow">
                  <FaEnvelope /> Contact Me
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="stats-row">
            <div className="stat-box">
              <div className="stat-num">{data.facts.projects}</div>
              <div className="stat-label">Projects</div>
            </div>
            <div className="stat-box">
              <div className="stat-num">{data.facts.researchPapers}</div>
              <div className="stat-label">Papers</div>
            </div>
            <div className="stat-box">
              <div className="stat-num">{data.facts.supportHours}</div>
              <div className="stat-label">Dev Hours</div>
            </div>
            <div className="stat-box">
              <div className="stat-num">{data.facts.certifications}</div>
              <div className="stat-label">Certifications</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
