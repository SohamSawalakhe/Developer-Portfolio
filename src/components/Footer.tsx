import { data } from '../data';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-nav">
          <a href="#hero">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          <a href={data.personal.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={data.personal.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
        <p>© {new Date().getFullYear()} {data.personal.name} · Crafted with ⚡ and code</p>
      </div>
    </footer>
  );
}
