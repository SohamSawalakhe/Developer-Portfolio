import { useEffect, useRef, useState } from 'react';

interface PageTransitionProps {
  isActive: boolean;
  direction: 'up' | 'down';
}

export default function PageTransition({ isActive, direction }: PageTransitionProps) {
  const [phase, setPhase] = useState<'idle' | 'enter' | 'hold' | 'exit'>('idle');
  const prevActive = useRef(isActive);

  // Use ref to track previous state and only update phase via timers
  useEffect(() => {
    if (isActive && !prevActive.current) {
      // Transition just started
      setPhase('enter');
      const t1 = setTimeout(() => setPhase('hold'), 400);
      const t2 = setTimeout(() => setPhase('exit'), 600);
      const t3 = setTimeout(() => setPhase('idle'), 1100);

      prevActive.current = true;
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }

    if (!isActive && prevActive.current) {
      prevActive.current = false;
    }
  }, [isActive]);

  if (phase === 'idle') return null;

  return (
    <div className={`warp-transition warp-${phase} warp-${direction}`}>
      <div className="warp-slice warp-slice-1" />
      <div className="warp-slice warp-slice-2" />
      <div className="warp-slice warp-slice-3" />
      <div className="warp-center">
        <div className="warp-ring" />
        <div className="warp-ring warp-ring-2" />
      </div>
      <div className="warp-lines">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="warp-line" style={{ animationDelay: `${i * 40}ms` }} />
        ))}
      </div>
    </div>
  );
}
