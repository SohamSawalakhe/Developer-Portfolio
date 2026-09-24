import { useRef, useEffect, useState } from 'react';

interface Avatar3DProps {
  src: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  /** Show the floating tech orbit rings */
  showOrbit?: boolean;
  /** Show pulsing corner scan lines */
  showScanCorners?: boolean;
}

const SIZE_MAP = {
  sm: 200,
  md: 280,
  lg: 360,
  xl: 460,
};

export default function Avatar3D({
  src,
  alt = 'Avatar',
  size = 'md',
  className = '',
  showOrbit = true,
  showScanCorners = true,
}: Avatar3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const px = SIZE_MAP[size];

  useEffect(() => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card) return;

    let rafId: number;
    let currentRx = 0;
    let currentRy = 0;
    let targetRx = 0;
    let targetRy = 0;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      currentRx = lerp(currentRx, targetRx, 0.08);
      currentRy = lerp(currentRy, targetRy, 0.08);

      const transform = `perspective(900px) rotateX(${currentRx}deg) rotateY(${currentRy}deg) scale3d(1.04, 1.04, 1.04)`;
      card.style.transform = transform;

      // Move glare based on rotation
      if (glare) {
        const glareX = 50 + currentRy * 3;
        const glareY = 50 - currentRx * 3;
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.18) 0%, transparent 65%)`;
        glare.style.opacity = isHovered ? '1' : '0';
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    const onMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);

      targetRy = dx * 16;
      targetRx = -dy * 14;
    };

    const onMouseLeave = () => {
      targetRx = 0;
      targetRy = 0;
    };

    // Listen on the window for smooth trailing even outside the card
    window.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      card.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isHovered]);

  return (
    <div
      className={`avatar3d-wrapper ${className}`}
      style={{ '--avatar-size': `${px}px` } as React.CSSProperties}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer glow halo */}
      <div className="avatar3d-halo" />

      {/* Orbit ring */}
      {showOrbit && (
        <div className="avatar3d-orbit-wrapper">
          <div className="avatar3d-orbit">
            <div className="avatar3d-orbit-dot" />
          </div>
          <div className="avatar3d-orbit avatar3d-orbit--2">
            <div className="avatar3d-orbit-dot avatar3d-orbit-dot--2" />
          </div>
        </div>
      )}

      {/* Main 3D tilt card */}
      <div
        ref={cardRef}
        className={`avatar3d-card ${isHovered ? 'avatar3d-card--hovered' : ''}`}
      >
        {/* Background depth layer */}
        <div className="avatar3d-depth-bg" />

        {/* Scan corner brackets */}
        {showScanCorners && (
          <>
            <div className="avatar3d-corner avatar3d-corner--tl" />
            <div className="avatar3d-corner avatar3d-corner--tr" />
            <div className="avatar3d-corner avatar3d-corner--bl" />
            <div className="avatar3d-corner avatar3d-corner--br" />
          </>
        )}

        {/* The avatar image */}
        <img
          src={src}
          alt={alt}
          className="avatar3d-img"
          draggable={false}
        />

        {/* Glare overlay */}
        <div ref={glareRef} className="avatar3d-glare" />

        {/* Bottom gradient fade (for images without transparent bg) */}
        <div className="avatar3d-bottom-fade" />

        {/* Scan line animation */}
        <div className="avatar3d-scan" />

        {/* Status badge */}
        <div className="avatar3d-status">
          <span className="avatar3d-status-dot" />
          <span className="avatar3d-status-text">Available for hire</span>
        </div>
      </div>

      {/* Ground reflection / shadow */}
      <div className="avatar3d-shadow" />
    </div>
  );
}
