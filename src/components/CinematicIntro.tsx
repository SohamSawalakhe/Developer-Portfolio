import { useState, useEffect, useRef } from 'react';
import { data } from '../data';

export default function CinematicIntro({ onEnter }: { onEnter: () => void }) {
  const [ready, setReady] = useState(false);
  const [exiting, setExiting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Matrix rain on intro
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'アイウエオカキクケコサシスセソタチツテト01001011';
    const fontSize = 14;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = new Array(cols).fill(1).map(() => Math.random() * -50);

    let animId: number;

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(0, 212, 255, 0.12)';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i] += 0.5;
      }
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 2500);
    return () => clearTimeout(t);
  }, []);

  const handleEnter = () => {
    setExiting(true);
    setTimeout(onEnter, 1800);
  };

  return (
    <div className={`cin-intro ${exiting ? 'phase-exit' : ''}`}>
      {/* Matrix rain canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.4 }}
      />

      {/* Corner brackets */}
      <div className="cin-corner cin-corner-tl" />
      <div className="cin-corner cin-corner-tr" />
      <div className="cin-corner cin-corner-bl" />
      <div className="cin-corner cin-corner-br" />

      {/* Horizontal scan lines */}
      <div className="cin-logo-lines">
        <div className="cin-hline" />
        <div className="cin-hline" />
        <div className="cin-hline" />
      </div>

      {/* Content */}
      <div className="cin-logo-phase" style={{ zIndex: 2 }}>
        <div className="cin-tag-top">A Portfolio Experience</div>
        <div className="cin-main-name" data-text={data.personal.firstName}>
          {data.personal.firstName}
        </div>
        <div className="cin-subtitle">{data.personal.title}</div>

        {ready && (
          <div className="cin-enter-wrap">
            <button className="cin-enter-btn" onClick={handleEnter}>
              Enter Experience →
            </button>
          </div>
        )}
      </div>

      {/* Bottom loader */}
      <div className="cin-readout">SYSTEM READY · INITIALIZING PORTFOLIO v2.0</div>
      <div className="cin-loader">
        <div className="cin-loader-fill" />
      </div>
    </div>
  );
}
