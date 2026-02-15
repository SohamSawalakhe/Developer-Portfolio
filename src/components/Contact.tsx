import { useState } from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaGithub, FaLinkedin, FaPaperPlane } from 'react-icons/fa';
import { data } from '../data';
import Reveal from './AnimateOnScroll';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(`mailto:${data.personal.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="section-tag">Transmission</span>
            <h2>Get In Touch</h2>
            <p>Have a project in mind? Let's build something extraordinary together.</p>
          </div>
        </Reveal>

        <Reveal>
          <div className="contact-layout">
            <div className="contact-cards">
              <div className="ct-card">
                <div className="ct-icon"><FaMapMarkerAlt /></div>
                <div><h4>Location</h4><p>{data.personal.location}, India</p></div>
              </div>
              <div className="ct-card">
                <div className="ct-icon"><FaEnvelope /></div>
                <div><h4>Email</h4><a href={`mailto:${data.personal.email}`}>{data.personal.email}</a></div>
              </div>
              <div className="ct-card">
                <div className="ct-icon"><FaPhone /></div>
                <div><h4>Phone</h4><a href={`tel:${data.personal.phone.replace(/\s/g, '')}`}>{data.personal.phone}</a></div>
              </div>
              <div className="socials">
                <a href={data.personal.github} target="_blank" rel="noopener noreferrer" className="soc-link" title="GitHub"><FaGithub /></a>
                <a href={data.personal.linkedin} target="_blank" rel="noopener noreferrer" className="soc-link" title="LinkedIn"><FaLinkedin /></a>
                <a href={`mailto:${data.personal.email}`} className="soc-link" title="Email"><FaEnvelope /></a>
              </div>
            </div>

            <form className="contact-form" onSubmit={submit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="ct-name">Your Name</label>
                  <input id="ct-name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label htmlFor="ct-email">Your Email</label>
                  <input id="ct-email" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="john@email.com" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="ct-subj">Subject</label>
                <input id="ct-subj" required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="What's this about?" />
              </div>
              <div className="form-group">
                <label htmlFor="ct-msg">Message</label>
                <textarea id="ct-msg" required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell me about your project..." />
              </div>
              <button type="submit" className="btn btn-glow" style={{ width: '100%', justifyContent: 'center' }}>
                <FaPaperPlane /> {sent ? 'Transmission Sent!' : 'Send Transmission'}
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
