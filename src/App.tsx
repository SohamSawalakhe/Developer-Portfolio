import { useState, useCallback, useRef, useEffect } from 'react';
import ParticleField from './components/ParticleField';
import CinematicIntro from './components/CinematicIntro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import MusicPlayer from './components/MusicPlayer';
import ChatBot from './components/ChatBot';
import PageTransition from './components/PageTransition';

const pages = [
  { id: 'hero', label: 'Home', Component: Hero },
  { id: 'about', label: 'About', Component: About },
  { id: 'skills', label: 'Skills', Component: Skills },
  { id: 'experience', label: 'Journey', Component: Experience },
  { id: 'projects', label: 'Projects', Component: Projects },
  { id: 'certifications', label: 'Certs', Component: Certifications },
  { id: 'achievements', label: 'Awards', Component: Achievements },
  { id: 'contact', label: 'Contact', Component: Contact },
];

export default function App() {
  const [entered, setEntered] = useState(false);
  const [introGone, setIntroGone] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'up' | 'down'>('down');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const lastScrollTime = useRef(0);

  const handleEnter = () => {
    setEntered(true);
    setTimeout(() => setIntroGone(true), 100);
  };

  const navigateToPage = useCallback((targetIdx: number) => {
    if (isTransitioning || targetIdx === activePage || targetIdx < 0 || targetIdx >= pages.length) return;

    setTransitionDirection(targetIdx > activePage ? 'down' : 'up');
    setIsTransitioning(true);

    // After warp animation plays, switch page
    setTimeout(() => {
      setActivePage(targetIdx);
      // Scroll to top of section
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ top: 0 });
      }
    }, 600);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 1200);
  }, [activePage, isTransitioning]);

  // Wheel-based page navigation with debounce
  useEffect(() => {
    if (!entered) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < 1500) return;
      if (isScrolling.current || isTransitioning) return;

      const { scrollTop, scrollHeight, clientHeight } = container;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 10;
      const atTop = scrollTop <= 10;

      if (e.deltaY > 30 && atBottom) {
        // Scroll down - next page
        lastScrollTime.current = now;
        isScrolling.current = true;
        navigateToPage(activePage + 1);
        setTimeout(() => { isScrolling.current = false; }, 1500);
      } else if (e.deltaY < -30 && atTop) {
        // Scroll up - previous page
        lastScrollTime.current = now;
        isScrolling.current = true;
        navigateToPage(activePage - 1);
        setTimeout(() => { isScrolling.current = false; }, 1500);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: true });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [entered, activePage, isTransitioning, navigateToPage]);

  // Touch/swipe-based page navigation for mobile
  useEffect(() => {
    if (!entered) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    let touchStartY = 0;
    let touchTriggered = false;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchTriggered = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchTriggered || isScrolling.current || isTransitioning) return;

      const now = Date.now();
      if (now - lastScrollTime.current < 1500) return;

      const touchCurrentY = e.touches[0].clientY;
      const deltaY = touchStartY - touchCurrentY;
      const { scrollTop, scrollHeight, clientHeight } = container;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 10;
      const atTop = scrollTop <= 10;

      // Require minimum 50px swipe distance
      if (Math.abs(deltaY) < 50) return;

      if (deltaY > 0 && atBottom) {
        // Swiped up at bottom - next page
        e.preventDefault();
        touchTriggered = true;
        lastScrollTime.current = now;
        isScrolling.current = true;
        navigateToPage(activePage + 1);
        setTimeout(() => { isScrolling.current = false; }, 1500);
      } else if (deltaY < 0 && atTop) {
        // Swiped down at top - previous page
        e.preventDefault();
        touchTriggered = true;
        lastScrollTime.current = now;
        isScrolling.current = true;
        navigateToPage(activePage - 1);
        setTimeout(() => { isScrolling.current = false; }, 1500);
      }
    };

    const handleTouchEnd = () => {
      touchTriggered = false;
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [entered, activePage, isTransitioning, navigateToPage]);

  const CurrentPage = pages[activePage].Component;

  return (
    <>
      {/* Deep space particle background */}
      <ParticleField />

      {/* Scanline film overlay */}
      <div className="scanlines" />

      {/* Cinematic intro */}
      {!introGone && <CinematicIntro onEnter={handleEnter} />}

      {/* Main portfolio content */}
      {entered && (
        <div className="content-wrapper">
          <Navbar
            pages={pages}
            activePage={activePage}
            onNavigate={navigateToPage}
          />

          {/* Page transition warp effect */}
          <PageTransition
            isActive={isTransitioning}
            direction={transitionDirection}
          />

          {/* Current page with scroll container */}
          <div
            ref={scrollContainerRef}
            className={`page-container ${isTransitioning ? 'page-exit' : 'page-enter'}`}
            key={activePage}
          >
            <CurrentPage isHomePage={activePage === 0} />
            {activePage === pages.length - 1 && <Footer />}
          </div>

          {/* Nav indicators */}
          <div className="nav-indicators">
            {pages.map((p, i) => (
              <div
                key={p.id}
                className={`nav-dot ${activePage === i ? 'active' : ''}`}
                onClick={() => navigateToPage(i)}
                title={p.label}
              >
                <span className="nav-dot-label">{p.label}</span>
              </div>
            ))}
          </div>

          {/* Page counter */}
          <div className="page-counter">
            <span className="page-current">{String(activePage + 1).padStart(2, '0')}</span>
            <span className="page-divider">/</span>
            <span className="page-total">{String(pages.length).padStart(2, '0')}</span>
          </div>

          <BackToTop />
          <MusicPlayer />
          <ChatBot />
        </div>
      )}
    </>
  );
}
