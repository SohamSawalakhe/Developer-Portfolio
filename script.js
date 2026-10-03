/* ============================================================
   SOHAM SAWALAKHE — CLEAN HERO & INTERACTIVE STUDIO ENGINE
   Floating Glassmorphic Cards · Video Modal · 3D Parallax
   ============================================================ */

'use strict';

/* ─── CREATIVE TELEMETRY PRELOADER CONTROLLER ─────────────── */
function initCreativePreloader() {
  const preloader = document.getElementById('creativePreloader');
  if (!preloader) return;

  const barFill = document.getElementById('preloaderBarFill');
  const barSpark = document.getElementById('preloaderBarSpark');
  const percentEl = document.getElementById('preloaderPercent');
  const statusEl = document.getElementById('preloaderStatusText');
  const pingEl = document.getElementById('preloaderPing');
  const gyroEl = document.getElementById('preloaderGyro');
  const avatarImg = document.getElementById('preloaderAvatarImg');
  const avatarCapsule = document.getElementById('preloaderAvatarCapsule');

  // Lock page scrolling while preloader runs
  document.body.classList.add('preloader-active');

  // Preload all 5 directional avatar perspectives for instant eye-tracking
  const avatarSources = {
    center: '/soham1.png',
    up:     '/soham2.png',
    down:   '/soham3.png',
    right:  '/soham4.png',
    left:   '/soham5.png'
  };

  const preloadedAvatars = {};
  for (const [key, src] of Object.entries(avatarSources)) {
    const img = new Image();
    img.src = src;
    preloadedAvatars[key] = img;
  }

  let currentAvatarDir = 'center';

  function setAvatarDirection(dir) {
    if (!avatarImg || currentAvatarDir === dir) return;
    currentAvatarDir = dir;
    avatarImg.src = avatarSources[dir] || avatarSources.center;
  }

  // Telemetry status sequence
  const bootStages = [
    { threshold: 0,  text: '[01/04] BOOTING NEURAL AVATAR & RIG...' },
    { threshold: 28, text: '[02/04] CALIBRATING 100-FRAME TELEMETRY ENGINE...' },
    { threshold: 58, text: '[03/04] SYNTHESIZING GHIBLI AMBIENT SOUNDSCAPES...' },
    { threshold: 86, text: '[04/04] SOHAM READY // DEPLOYING INTERFACE...' }
  ];

  // Dynamic ping jitter for real telemetry realism
  let pingInterval = setInterval(() => {
    if (!pingEl || isExiting) return;
    const jitter = Math.floor(11 + Math.random() * 8);
    pingEl.textContent = `${jitter}ms`;
  }, 420);

  // 3D Gyroscope & Cursor Interactive Eye-Tracking
  let lastMouseMoveTime = Date.now();

  function onMouseMove(e) {
    lastMouseMoveTime = Date.now();
    const rect = preloader.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    // 1. Interactive 3D Perspective Tilt
    if (gyroEl) {
      const tiltX = dx / (rect.width / 2);
      const tiltY = dy / (rect.height / 2);
      gyroEl.style.transform = `perspective(900px) rotateX(${-tiltY * 22}deg) rotateY(${tiltX * 22}deg)`;
    }

    // 2. Interactive Eye / Head Direction Tracking
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    const deadZone = 36; // px threshold from center before shifting gaze

    if (absX < deadZone && absY < deadZone) {
      setAvatarDirection('center');
    } else if (absX >= absY) {
      setAvatarDirection(dx > 0 ? 'right' : 'left');
    } else {
      setAvatarDirection(dy > 0 ? 'down' : 'up');
    }
  }

  preloader.addEventListener('mousemove', onMouseMove, { passive: true });
  preloader.addEventListener('mouseleave', () => {
    if (gyroEl) gyroEl.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    setAvatarDirection('center');
  });

  // Idle autonomous glance behavior (if user doesn't move mouse)
  const idleGlanceInterval = setInterval(() => {
    if (isExiting) return;
    if (Date.now() - lastMouseMoveTime > 800) {
      const glances = ['center', 'right', 'center', 'up', 'left', 'center'];
      const randomGlance = glances[Math.floor(Math.random() * glances.length)];
      setAvatarDirection(randomGlance);
    }
  }, 950);

  // Preload initial hero frames in parallel
  const PRELOAD_FRAMES = 12;
  let loadedFrames = 0;
  for (let i = 1; i <= PRELOAD_FRAMES; i++) {
    const img = new Image();
    img.src = `/frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
    img.onload = () => { loadedFrames++; };
    img.onerror = () => { loadedFrames++; };
  }

  // Animation timeline state
  let currentProgress = 0;
  let startTime = null;
  const DURATION = 1850; // 1.85s duration for silky luxury feel
  let isExiting = false;
  let animFrameId = null;

  function setProgress(val) {
    const rounded = Math.min(100, Math.max(0, Math.round(val)));
    if (percentEl) {
      percentEl.textContent = `${String(rounded).padStart(2, '0')}%`;
    }
    if (barFill) {
      barFill.style.width = `${rounded}%`;
    }
    if (barSpark) {
      barSpark.style.left = `${rounded}%`;
    }

    // Update status text based on progress
    if (statusEl) {
      for (let i = bootStages.length - 1; i >= 0; i--) {
        if (rounded >= bootStages[i].threshold) {
          statusEl.textContent = bootStages[i].text;
          break;
        }
      }
    }
  }

  function completePreloader() {
    if (isExiting) return;
    isExiting = true;
    if (animFrameId) cancelAnimationFrame(animFrameId);
    if (pingInterval) clearInterval(pingInterval);
    if (idleGlanceInterval) clearInterval(idleGlanceInterval);

    // Final stance: look straight at user with warm smile
    setAvatarDirection('center');

    setProgress(100);
    if (percentEl) percentEl.classList.add('is-done');
    if (statusEl) {
      statusEl.textContent = 'SOHAM ONLINE // READY';
      statusEl.style.color = '#10b981';
    }

    if (avatarCapsule) {
      avatarCapsule.style.borderColor = '#10b981';
      avatarCapsule.style.boxShadow = '0 12px 34px rgba(16, 185, 129, 0.35), 0 0 0 5px rgba(16, 185, 129, 0.15)';
    }

    // Step 1: Content scale & fade
    setTimeout(() => {
      preloader.classList.add('is-complete');
    }, 140);

    // Step 2: Curtain lift exit
    setTimeout(() => {
      preloader.classList.add('is-loaded');
      document.body.classList.remove('preloader-active');
      window.dispatchEvent(new CustomEvent('preloaderFinished'));
    }, 420);

    // Step 3: Remove from DOM tree
    setTimeout(() => {
      preloader.classList.add('is-removed');
      preloader.removeEventListener('mousemove', onMouseMove);
    }, 1300);
  }

  // Fast skip on click
  preloader.addEventListener('click', () => {
    if (!isExiting) {
      completePreloader();
    }
  });

  // Smooth rAF loop
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const timeProgress = Math.min(1, elapsed / DURATION);

    // Smooth cubic ease out
    const ease = 1 - Math.pow(1 - timeProgress, 3);
    // Real frame bonus
    const frameBonus = (loadedFrames / PRELOAD_FRAMES) * 15;
    const calculated = Math.min(100, (ease * 85) + frameBonus * ease);

    currentProgress = Math.max(currentProgress, calculated);
    setProgress(currentProgress);

    if (timeProgress >= 1 || currentProgress >= 100) {
      completePreloader();
    } else {
      animFrameId = requestAnimationFrame(step);
    }
  }

  // Start timeline
  animFrameId = requestAnimationFrame(step);

  // Safety fallback after 2.8s maximum
  setTimeout(() => {
    if (!isExiting) completePreloader();
  }, 2800);
}

// Immediately launch creative preloader
initCreativePreloader();

/* ─── HEADER & ACTIVE NAV CONTROLLER ─────────────────────── */
const siteHeader = document.getElementById('siteHeader');
const navLinks = document.querySelectorAll('.nav-item-link');

function updateHeaderAndNav() {
  // Sticky shadow toggle
  if (siteHeader) {
    siteHeader.classList.toggle('is-scrolled', window.scrollY > 30);
  }

  // Active section tracking
  const sections = document.querySelectorAll('section[id]');
  let currentSection = 'home';

  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= 200 && rect.bottom >= 100) {
      currentSection = sec.id;
    }
  });

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === `#${currentSection}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', updateHeaderAndNav, { passive: true });
window.addEventListener('DOMContentLoaded', updateHeaderAndNav);

/* ─── SMOOTH SCROLL FOR NAV LINKS & HERO BUTTONS ─────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').slice(1);
    if (!targetId) return;
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─── WATCH INTRO VIDEO MODAL ────────────────────────────── */
const btnWatchIntro = document.getElementById('btnWatchIntro');
const introVideoModal = document.getElementById('introVideoModal');
const introModalVideo = document.getElementById('introModalVideo');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalBackdrop = document.getElementById('modalBackdrop');

function openIntroModal() {
  if (!introVideoModal) return;
  introVideoModal.classList.add('is-open');
  introVideoModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  if (introModalVideo) {
    introModalVideo.currentTime = 0;
    introModalVideo.play().catch(() => {});
  }
}

function closeIntroModal() {
  if (!introVideoModal) return;
  introVideoModal.classList.remove('is-open');
  introVideoModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  if (introModalVideo) {
    introModalVideo.pause();
  }
}

if (btnWatchIntro) {
  btnWatchIntro.addEventListener('click', openIntroModal);
}
if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', closeIntroModal);
}
if (modalBackdrop) {
  modalBackdrop.addEventListener('click', closeIntroModal);
}
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && introVideoModal && introVideoModal.classList.contains('is-open')) {
    closeIntroModal();
  }
});

/* ─── 3D MOUSE PARALLAX FOR FLOATING CARDS ───────────────── */
const heroSection = document.getElementById('home');
const cardLearning = document.getElementById('cardLearning');
const cardProjects = document.getElementById('cardProjects');
const cardCodeWrapper = document.getElementById('cardCodeWrapper');
// heroMainArt removed — replaced by canvas

let mouseX = 0;
let mouseY = 0;
let currentTiltX = 0;
let currentTiltY = 0;

if (heroSection) {
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;   // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;  // -1 to 1
    mouseX = x;
    mouseY = y;
  });

  heroSection.addEventListener('mouseleave', () => {
    mouseX = 0;
    mouseY = 0;
  });
}

function renderParallax() {
  currentTiltX += (mouseX - currentTiltX) * 0.06;
  currentTiltY += (mouseY - currentTiltY) * 0.06;

  if (cardLearning) {
    cardLearning.style.transform = `translate3d(${-currentTiltX * 14}px, ${-currentTiltY * 10}px, 0)`;
  }
  if (cardProjects) {
    cardProjects.style.transform = `translate3d(${-currentTiltX * 20}px, ${-currentTiltY * 14}px, 0)`;
  }
  if (cardCodeWrapper) {
    cardCodeWrapper.style.transform = `translate3d(${-currentTiltX * 12}px, ${-currentTiltY * 8}px, 0)`;
  }

  requestAnimationFrame(renderParallax);
}
requestAnimationFrame(renderParallax);


/* ─── HERO CANVAS FRAME ANIMATION (scroll-telling) ────────────── */
(function initHeroCanvas() {
  const FRAME_COUNT = 100;
  const LERP_FACTOR = 0.14;          // smoothness: lower = smoother but slower
  const BG_COLOR    = '#faf8f5';     // must match the .hero-scroll-sticky bg

  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let currentFrame = 0;
  let targetFrame  = 0;

  /* --- build frame URL ---------------------------------------- */
  function frameSrc(n) {
    return `/frames/ezgif-frame-${String(n).padStart(3, '0')}.jpg`;
  }

  /* --- preload all frames into an array ----------------------- */
  const frames = new Array(FRAME_COUNT);
  let firstFrameReady = false;

  for (let i = 0; i < FRAME_COUNT; i++) {
    const img = new Image();
    img.decoding = 'async';
    img.src = frameSrc(i + 1);
    img.onload = () => {
      if (i === 0 && !firstFrameReady) {
        firstFrameReady = true;
        // Wait one rAF so the sticky layout is painted and canvas has a proper rect
        requestAnimationFrame(() => {
          sizeCanvas();
          drawFrame(0);
          requestAnimationFrame(tick);
        });
      }
    };
    frames[i] = img;
  }

  /* --- DPR-aware canvas sizing -------------------------------- */
  function sizeCanvas() {
    const dpr  = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    canvas.width  = Math.round(rect.width  * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  /* --- cover-fit draw ----------------------------------------- */
  function drawFrame(idx) {
    const img = frames[Math.round(idx)];
    if (!img || !img.complete || !img.naturalWidth) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw  = canvas.width  / dpr;
    const ch  = canvas.height / dpr;

    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, cw, ch);

    const imgAR  = img.naturalWidth  / img.naturalHeight;
    const canvAR = cw / ch;
    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;

    if (imgAR > canvAR) {
      // image is wider — crop left/right
      sw = img.naturalHeight * canvAR;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      // image is taller — crop top/bottom
      sh = img.naturalWidth / canvAR;
      sy = (img.naturalHeight - sh) / 2;
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
  }

  /* --- rAF tick: lerp + draw ---------------------------------- */
  function tick() {
    currentFrame += (targetFrame - currentFrame) * LERP_FACTOR;

    drawFrame(currentFrame);

    // Animate the amber progress bar
    const bar = document.getElementById('heroScrollProgressBar');
    if (bar) {
      bar.style.width = `${(targetFrame / (FRAME_COUNT - 1)) * 100}%`;
    }

    // Fade the scroll indicator after 30% through the animation
    const scrollBtn = document.getElementById('heroScrollBtn');
    if (scrollBtn) {
      scrollBtn.classList.toggle('is-fading', targetFrame / (FRAME_COUNT - 1) > 0.3);
    }

    requestAnimationFrame(tick);
  }

  /* --- scroll handler ----------------------------------------- */
  function onHeroScroll() {
    const section = document.getElementById('home');
    if (!section) return;

    const heroTop       = section.offsetTop;
    const heroScrollable = Math.max(1, section.offsetHeight - window.innerHeight);
    const progress      = Math.max(0, Math.min(1,
      (window.scrollY - heroTop) / heroScrollable
    ));

    targetFrame = progress * (FRAME_COUNT - 1);
  }

  window.addEventListener('scroll', onHeroScroll, { passive: true });
  window.addEventListener('resize', () => { sizeCanvas(); drawFrame(Math.round(currentFrame)); }, { passive: true });

  // Call once to set initial state
  onHeroScroll();
})();


/* ─── AMBIENT CURSOR GLOW ─────────────────────────────────── */
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow) {
  window.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  }, { passive: true });
}

/* ─── INTERSECTION OBSERVER REVEALS ───────────────────────── */
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-revealed');

      // Animate skill progress bars when skills section is entered
      if (entry.target.querySelector('.sk-bar')) {
        entry.target.querySelectorAll('.sk-bar').forEach(bar => {
          const w = bar.getAttribute('data-width');
          bar.style.width = `${w}%`;
        });
      }

      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => observer.observe(el));

function checkReveals() {
  const triggerBottom = window.innerHeight * 1.1;
  document.querySelectorAll('.reveal:not(.is-revealed)').forEach(el => {
    const box = el.getBoundingClientRect();
    if (box.top < triggerBottom) {
      el.classList.add('is-revealed');
    }
  });
}
window.addEventListener('scroll', checkReveals, { passive: true });
window.addEventListener('DOMContentLoaded', checkReveals);
window.addEventListener('load', checkReveals);
setTimeout(checkReveals, 300);

/* ─── CARD LUMINESCENCE CURSOR TRACKER ───────────────────── */
const glowCards = document.querySelectorAll(
  '.about-details-card, .tech-stream-banner, .project-spotlight-card, .bento-card, .exp-card, .edu-modern-card, .cert-badge-card, .contact-box, .story-sticky-aside, .story-manifesto-card'
);

glowCards.forEach(card => {
  const glow = card.querySelector('.card-ambient-glow');
  if (!glow) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let rgb = '229, 152, 56';
    if (glow.classList.contains('glow-emerald')) rgb = '16, 185, 129';
    if (glow.classList.contains('glow-blue')) rgb = '59, 130, 246';
    if (glow.classList.contains('glow-purple')) rgb = '168, 85, 247';

    glow.style.background = `radial-gradient(circle 320px at ${x}px ${y}px, rgba(${rgb}, 0.28) 0%, rgba(${rgb}, 0.06) 45%, transparent 70%)`;
  }, { passive: true });

  card.addEventListener('mouseleave', () => {
    glow.style.background = '';
  });
});


/* ─── ABOUT 3-PHASE HOTSPOTS CONTROLLER ───────────────────── */
function initAboutPhaseHotspots() {
  const hotspots = document.querySelectorAll('.stage-hotspot');
  if (!hotspots.length) return;

  hotspots.forEach(spot => {
    spot.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = spot.classList.contains('is-active');
      hotspots.forEach(s => s.classList.remove('is-active'));
      if (!isActive) {
        spot.classList.add('is-active');
      }
    });
  });

  document.addEventListener('click', () => {
    hotspots.forEach(s => s.classList.remove('is-active'));
  });
}

/* ─── ABOUT 3-PHASE SCROLL-TELLING CONTROLLER (CLEAN HERO STYLE) ─── */
function initAboutScrolltelling() {
  const section = document.getElementById('about');
  if (!section) return;

  const backdrop = section.querySelector('.about-clean-backdrop');
  const tabs = section.querySelectorAll('.about-phase-tab');
  const panes = section.querySelectorAll('.about-story-pane');
  const stagePins = section.querySelectorAll('.stage-pin');
  const progressBar = document.getElementById('aboutProgressBar');
  const scrollBtn = document.getElementById('aboutScrollBtn');

  let currentActivePhase = -1;

  function applyPhase(phase, force = false) {
    if (currentActivePhase === phase && !force) return;
    currentActivePhase = phase;

    // 1. Physically move & zoom the artwork to focus on the active phase
    if (backdrop) {
      if (phase === 1) {
        // Focus on College & campus era (top-left)
        backdrop.style.transform = 'scale(1.08) translate3d(4%, 2%, 0)';
      } else if (phase === 2) {
        // Smoothly glide to Research & applied AI era (center / Soham / city)
        backdrop.style.transform = 'scale(1.22) translate3d(-3%, -4%, 0)';
      } else if (phase === 3) {
        // Smoothly glide to Production systems & dual-monitor setup (right)
        backdrop.style.transform = 'scale(1.16) translate3d(-9%, 2%, 0)';
      }
    }

    // 2. Update tab buttons
    tabs.forEach(tab => {
      const p = parseInt(tab.dataset.phase);
      const isActive = p === phase;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // 3. Update story panes with smooth fade & slide
    panes.forEach(pane => {
      const p = parseInt(pane.dataset.pane);
      pane.classList.toggle('active', p === phase);
    });

    // 4. Update stage hotspot pins on artwork
    stagePins.forEach(pin => {
      const p = parseInt(pin.dataset.pin);
      pin.classList.toggle('active', p === phase);
    });
  }

  function updateAboutProgress() {
    const rect = section.getBoundingClientRect();
    const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
    const progress = Math.max(0, Math.min(1, -rect.top / scrollable));

    // Update bottom thin progress bar (matching hero progress bar)
    if (progressBar) {
      progressBar.style.width = (progress * 100) + '%';
    }

    // Phase 1 (0 -> 0.33), Phase 2 (0.33 -> 0.66), Phase 3 (0.66 -> 1.0)
    let phase = 1;
    if (progress >= 0.60) {
      phase = 3;
    } else if (progress >= 0.25) {
      phase = 2;
    }

    applyPhase(phase);

    // Fade scroll button when nearing end of section
    if (scrollBtn) {
      scrollBtn.classList.toggle('is-fading', progress > 0.85);
    }
  }

  // Click tab to jump smoothly to that phase & move the artwork
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const phase = parseInt(tab.dataset.phase);
      applyPhase(phase, true);

      let targetProgress = 0.05;
      if (phase === 2) targetProgress = 0.45;
      if (phase === 3) targetProgress = 0.85;

      const rect = section.getBoundingClientRect();
      const sectionAbsTop = window.scrollY + rect.top;
      const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);

      window.scrollTo({
        top: sectionAbsTop + scrollable * targetProgress,
        behavior: 'smooth'
      });
    });
  });

  // Click stage pins to jump smoothly to that phase
  stagePins.forEach(pin => {
    pin.addEventListener('click', (e) => {
      e.preventDefault();
      const phase = parseInt(pin.dataset.pin);
      applyPhase(phase, true);

      let targetProgress = 0.05;
      if (phase === 2) targetProgress = 0.45;
      if (phase === 3) targetProgress = 0.85;

      const rect = section.getBoundingClientRect();
      const sectionAbsTop = window.scrollY + rect.top;
      const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);

      window.scrollTo({
        top: sectionAbsTop + scrollable * targetProgress,
        behavior: 'smooth'
      });
    });
  });

  window.addEventListener('scroll', updateAboutProgress, { passive: true });
  window.addEventListener('resize', updateAboutProgress, { passive: true });

  // Initial render
  applyPhase(1, true);
  updateAboutProgress();
}

/* ─── PORSCHE-STYLE HORIZONTAL PROJECT SCROLLER ───────────── */
function initProjectsSideScroll() {
  const section = document.getElementById('projects');
  if (!section) return;

  const stickyViewport = document.getElementById('projectsSticky');
  const track = document.getElementById('projectsHorizontalTrack');
  const progressBar = document.getElementById('projectsProgressBar');
  const currentCounter = document.getElementById('pphCurrentMission');
  const tabs = document.querySelectorAll('.pph-tab');
  const prevBtn = document.getElementById('pphPrevBtn');
  const nextBtn = document.getElementById('pphNextBtn');
  const cards = document.querySelectorAll('.side-proj-card');

  if (!track || !cards.length) return;

  let currentActiveIndex = -1;
  let rafId = null;

  function updateSideScroll() {
    const rect = section.getBoundingClientRect();
    const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
    const rawProgress = -rect.top / scrollable;
    const progress = Math.max(0, Math.min(1, rawProgress));

    // Calculate maximum horizontal travel distance
    const trackParent = track.parentElement;
    const maxTranslate = Math.max(0, track.scrollWidth - trackParent.clientWidth);
    const currentTranslate = progress * maxTranslate;

    track.style.transform = `translate3d(-${currentTranslate.toFixed(1)}px, 0, 0)`;

    // Update bottom progress bar
    if (progressBar) {
      progressBar.style.width = `${Math.max(5, progress * 100).toFixed(1)}%`;
    }

    // Determine active mission card index (0 to cards.length - 1)
    const totalCards = cards.length;
    const activeIndex = Math.min(totalCards - 1, Math.floor(progress * totalCards * 0.999));

    if (activeIndex !== currentActiveIndex) {
      currentActiveIndex = activeIndex;

      if (currentCounter) {
        currentCounter.textContent = `0${activeIndex + 1}`;
      }

      tabs.forEach((tab, idx) => {
        const isActive = idx === activeIndex;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      cards.forEach((card, idx) => {
        card.classList.toggle('is-active', idx === activeIndex);
      });
    }
  }

  // Support horizontal trackpad swipe gesture inside sticky projects viewport
  if (stickyViewport) {
    stickyViewport.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        window.scrollBy({ top: e.deltaX, behavior: 'auto' });
      }
    }, { passive: true });
  }

  function onScroll() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(updateSideScroll);
  }

  function scrollToMission(idx) {
    const totalCards = cards.length;
    const targetProgress = totalCards > 1 ? idx / (totalCards - 1) : 0;
    const rect = section.getBoundingClientRect();
    const sectionAbsTop = window.scrollY + rect.top;
    const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);

    window.scrollTo({
      top: sectionAbsTop + scrollable * targetProgress,
      behavior: 'smooth'
    });
  }

  // Click on tabs to jump to corresponding mission
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = parseInt(tab.getAttribute('data-index') || '0', 10);
      scrollToMission(idx);
    });
  });

  // Previous and Next arrow controls
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetIdx = Math.max(0, (currentActiveIndex >= 0 ? currentActiveIndex : 0) - 1);
      scrollToMission(targetIdx);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetIdx = Math.min(cards.length - 1, (currentActiveIndex >= 0 ? currentActiveIndex : 0) + 1);
      scrollToMission(targetIdx);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  // Initial calculation
  updateSideScroll();
}

function initPortfolioApp() {
  console.log('[Portfolio] Initializing app modules...');
  if (typeof init3DCardTilt === 'function') init3DCardTilt();
  if (typeof initAvatar3DTilt === 'function') initAvatar3DTilt();
  if (typeof initRadarSimulator === 'function') initRadarSimulator();
  if (typeof initAboutScrolltelling === 'function') initAboutScrolltelling();
  if (typeof initProjectsSideScroll === 'function') initProjectsSideScroll();
  console.log('[Portfolio] All modules initialized successfully!');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolioApp);
} else {
  initPortfolioApp();
}
