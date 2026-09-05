/* ============================================================
   SOHAM SAWALAKHE — SCROLL STORY ENGINE
   Centered Avatar + 5-Stage Journey Cards · Framer-style
   ============================================================ */

'use strict';

/* ─── DOM ELEMENTS ───────────────────────────────── */
const nav = document.getElementById('nav');
const heroSection = document.getElementById('home');
const scrollHint = document.getElementById('scrollHint');

const introGateway = document.getElementById('introGateway');
const introLoaderWrap = document.getElementById('introLoaderWrap');
const introProgressFill = document.getElementById('introProgressFill');
const introStatus = document.getElementById('introStatus');
const introPct = document.getElementById('introPct');
const introEnterBtn = document.getElementById('introEnterBtn');
const introHintText = document.getElementById('introHintText');
let introReady = false;

/* Avatar images (one per stage) */
const avatarImgs = [
  document.getElementById('heroImg1'),
  document.getElementById('heroImg2'),
  document.getElementById('heroImg3'),
  document.getElementById('heroImg4'),
  document.getElementById('heroImg5'),
];

/* ─── FAST & CRISP INTRO CONTROLLER ──────────────────── */
function startIntroSequence() {
  const duration = 450;
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const p = Math.min(1, elapsed / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    const pct = Math.round(eased * 100);

    if (introProgressFill) introProgressFill.style.width = `${pct}%`;
    if (introPct) introPct.textContent = `${pct}%`;

    if (pct < 60) {
      if (introStatus) introStatus.textContent = 'INITIALIZING SYSTEM...';
    } else {
      if (introStatus) introStatus.textContent = 'READY';
    }

    if (p < 1) {
      requestAnimationFrame(tick);
    } else {
      introReady = true;
      if (introLoaderWrap) introLoaderWrap.classList.add('is-hidden');
      if (introEnterBtn) introEnterBtn.classList.add('is-ready');
      if (introHintText) introHintText.classList.add('is-ready');
      if (typeof anime !== 'undefined') {
        anime({
          targets: '#introEnterBtn',
          scale: [0.88, 1],
          opacity: [0, 1],
          duration: 350,
          easing: 'easeOutBack'
        });
      }
    }
  }

  requestAnimationFrame(tick);
}

// Initial hide states
if (nav) nav.classList.add('nav-initial-hide');

function enterExperience() {
  if (!introGateway || introGateway.classList.contains('is-exiting')) return;
  introGateway.classList.add('is-exiting');

  playAmbientAudio();

  if (nav) {
    nav.classList.remove('nav-initial-hide');
    nav.classList.add('nav-reveal-focus');
  }

  // Animate avatar in on enter
  setTimeout(() => {
    introGateway.style.display = 'none';

    if (typeof anime !== 'undefined') {
      anime({
        targets: '#heroAvatarStage',
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 1000,
        easing: 'easeOutExpo'
      });
    }
  }, 750);
}

if (introEnterBtn) {
  introEnterBtn.addEventListener('click', enterExperience);
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') enterExperience();
});

/* ─── STAGE SWITCHER (image crossfade only) ───────────────── */
function setAvatarImage(idx) {
  avatarImgs.forEach((img, i) => {
    if (!img) return;
    img.classList.toggle('active', i === idx);
  });
}

/* ─── EASING HELPERS ─────────────────────────────────────── */
function clamp01(v) { return Math.max(0, Math.min(1, v)); }
function easeInOut(t) { return t < 0.5 ? 2*t*t : 1-Math.pow(-2*t+2,2)/2; }
function lerp(a, b, t) { return a + (b - a) * t; }

/* ─── BG COLOR LERP ──────────────────────────────────────── */
// 5 background stops, one per panel
const BG_STOPS = [
  { r: 176, g: 158, b: 140 }, // warm taupe  – panel 1
  { r: 160, g: 143, b: 120 }, // deeper sand – panel 2
  { r: 140, g: 118, b: 95  }, // amber brown – panel 3
  { r: 120, g: 100, b: 78  }, // dark amber  – panel 4
  { r: 100, g: 84,  b: 64  }, // rich espresso – panel 5
];

function lerpColor(a, b, t) {
  return {
    r: Math.round(lerp(a.r, b.r, t)),
    g: Math.round(lerp(a.g, b.g, t)),
    b: Math.round(lerp(a.b, b.b, t)),
  };
}

function getBgColor(progress) {
  // progress 0..1 maps across BG_STOPS
  const scaled = progress * (BG_STOPS.length - 1);
  const i = Math.min(Math.floor(scaled), BG_STOPS.length - 2);
  const t = scaled - i;
  return lerpColor(BG_STOPS[i], BG_STOPS[i + 1], t);
}

/* ─── PANELS CONFIG ──────────────────────────────────────── */
const PANELS = [
  document.getElementById('hPanel1'),
  document.getElementById('hPanel2'),
  document.getElementById('hPanel3'),
  document.getElementById('hPanel4'),
  document.getElementById('hPanel5'),
];
const TOTAL_PANELS = 5;

/* ─── SMOOTH SCROLL STATE ────────────────────────────────── */
let rawProgress = 0;
let smoothProgress = 0;
let rafId = null;
let isHeroActive = false;

/* ─── CONTINUOUS RAF LOOP ────────────────────────────────── */
function heroRAF() {
  // Lerp smooth progress towards raw progress (buttery 60fps damped feel)
  smoothProgress += (rawProgress - smoothProgress) * 0.085;

  // Render
  renderHero(smoothProgress);

  rafId = requestAnimationFrame(heroRAF);
}

/* ─── MAIN RENDER: drives everything from 0..1 progress ──── */
function renderHero(progress) {
  if (!heroSection) return;

  // --- 1. Background color morph ---
  const heroBg = document.getElementById('heroBg');
  const col = getBgColor(progress);
  const lighter = {
    r: Math.min(255, col.r + 22),
    g: Math.min(255, col.g + 18),
    b: Math.min(255, col.b + 15)
  };

  const solidBg = `rgb(${col.r}, ${col.g}, ${col.b})`;
  document.body.style.backgroundColor = solidBg;
  document.documentElement.style.backgroundColor = solidBg;

  if (heroBg) {
    heroBg.style.background =
      `radial-gradient(circle at 50% 45%, ` +
      `rgb(${lighter.r},${lighter.g},${lighter.b}) 0%, ` +
      `rgb(${col.r},${col.g},${col.b}) 65%, ` +
      `rgb(${col.r},${col.g},${col.b}) 100%)`;
  }

  // --- 2. Spotlight & Ambient glow tracking ---
  const spotlight = document.getElementById('heroSpotlight');
  if (spotlight) {
    const spotX = 50 + (progress - 0.5) * 12;
    const spotY = 50 + (progress - 0.5) * 10;
    spotlight.style.left = `${spotX}%`;
    spotlight.style.top = `${spotY}%`;
  }

  // --- 3. Avatar image per panel (cross-fade at each 1/5 threshold) ---
  const imgIdx = Math.min(TOTAL_PANELS - 1, Math.floor(progress * TOTAL_PANELS));
  setAvatarImage(imgIdx);

  // --- 4. Avatar stage subtle breathing parallax & gaze reaction ---
  const avatarStage = document.getElementById('heroAvatarStage');
  if (avatarStage) {
    const avatarY = -progress * 20;
    const avatarScale = 1 + progress * 0.03;
    let gazeX = 0, gazeY = 0;
    if (imgIdx === 1) gazeY = -8;  // subtly floats up with upward gaze
    if (imgIdx === 2) gazeY = 8;   // settles down with downward gaze
    if (imgIdx === 3) gazeX = 14;  // shifts right towards look direction
    if (imgIdx === 4) gazeX = -10; // shifts left towards look direction
    avatarStage.style.transform = `translate(${gazeX}px, ${avatarY + gazeY}px) scale(${avatarScale})`;
  }

  // --- 5. Timeline pills active update ---
  const tPills = document.querySelectorAll('.hero-t-pill');
  tPills.forEach((pill, idx) => {
    pill.classList.toggle('active', idx === imgIdx);
  });

  // --- 6. CONTINUOUS SCROLL TRAVEL: ZERO-GAP OVERLAPPING CARD CROSS-FADES ---
  // Guarantees cards always smoothly cross-fade without dead-zones across all devices.
  const isMobile = window.innerWidth <= 960;

  PANELS.forEach((panel, i) => {
    if (!panel) return;
    const inner = panel.querySelector('.hp-inner');
    if (!inner) return;

    let opacity = 0;
    let transX = 0;
    let transY = 0;

    if (i === 0) {
      // Panel 1 (Intro · Look Straight): active [0.0, 0.22]
      if (progress <= 0.12) {
        opacity = 1;
      } else if (progress <= 0.22) {
        opacity = 1 - easeInOut((progress - 0.12) / 0.10);
      } else {
        opacity = 0;
      }
      transY = lerp(0, -22, clamp01(progress / 0.22));

    } else if (i === 1) {
      // Panel 2 (The Beginning · Look UP ⬆️): active [0.12, 0.42]
      if (progress < 0.12) {
        opacity = 0;
      } else if (progress <= 0.22) {
        opacity = easeInOut((progress - 0.12) / 0.10);
      } else if (progress <= 0.32) {
        opacity = 1;
      } else if (progress <= 0.42) {
        opacity = 1 - easeInOut((progress - 0.32) / 0.10);
      } else {
        opacity = 0;
      }
      const tTravel = clamp01((progress - 0.12) / 0.30);
      if (isMobile) {
        transY = lerp(16, -10, tTravel);
      } else {
        transY = lerp(35, -15, tTravel);
      }

    } else if (i === 2) {
      // Panel 3 (The Builder · Look DOWN ⬇️): active [0.32, 0.62]
      if (progress < 0.32) {
        opacity = 0;
      } else if (progress <= 0.42) {
        opacity = easeInOut((progress - 0.32) / 0.10);
      } else if (progress <= 0.52) {
        opacity = 1;
      } else if (progress <= 0.62) {
        opacity = 1 - easeInOut((progress - 0.52) / 0.10);
      } else {
        opacity = 0;
      }
      const tTravel = clamp01((progress - 0.32) / 0.30);
      if (isMobile) {
        transY = lerp(-14, 10, tTravel);
      } else {
        transY = lerp(-32, 15, tTravel);
      }

    } else if (i === 3) {
      // Panel 4 (Scopus · Look RIGHT ➡️): active [0.52, 0.82]
      if (progress < 0.52) {
        opacity = 0;
      } else if (progress <= 0.62) {
        opacity = easeInOut((progress - 0.52) / 0.10);
      } else if (progress <= 0.72) {
        opacity = 1;
      } else if (progress <= 0.82) {
        opacity = 1 - easeInOut((progress - 0.72) / 0.10);
      } else {
        opacity = 0;
      }
      const tTravel = clamp01((progress - 0.52) / 0.30);
      if (isMobile) {
        transY = lerp(12, -8, tTravel);
      } else {
        transX = lerp(45, -15, tTravel);
      }

    } else if (i === 4) {
      // Panel 5 (SitaraHub · Look LEFT ⬅️): active [0.72, 1.00]
      if (progress < 0.72) {
        opacity = 0;
      } else if (progress <= 0.82) {
        opacity = easeInOut((progress - 0.72) / 0.10);
      } else {
        opacity = 1;
      }
      const tTravel = clamp01((progress - 0.72) / 0.20);
      if (isMobile) {
        transY = lerp(-10, 0, tTravel);
      } else {
        transX = lerp(-40, 0, tTravel);
      }
    }

    inner.style.opacity = opacity;
    inner.style.transform = `translate(${transX}px, ${transY}px)`;
    inner.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';

    const isVisible = opacity > 0.01;
    panel.style.display = isVisible ? 'block' : 'none';
    panel.style.visibility = isVisible ? 'visible' : 'hidden';
    panel.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
  });

  // --- 7. Scroll hint ---
  if (scrollHint) {
    scrollHint.classList.toggle('hidden', progress > 0.03);
  }

  // --- 9. Upper Nav Bar (Always present, compact on scroll) ---
  if (nav) {
    nav.classList.toggle('nav-scrolled', window.scrollY > 40);
  }

  updateActiveNavLink();
}

/* ─── SCROLL LISTENER: just capture raw progress ─────────── */
function updateScrollProgress() {
  if (!heroSection) return;

  const rect = heroSection.getBoundingClientRect();
  const totalScrollable = heroSection.offsetHeight - window.innerHeight;
  if (totalScrollable <= 0) return;

  rawProgress = clamp01(-rect.top / totalScrollable);
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });

/* ─── ACTIVE NAV LINK HIGHLIGHT ───────────────────────────── */
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  let activeId = 'home';

  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top <= 180) {
      activeId = sec.id;
    }
  });

  document.querySelectorAll('.nav-item').forEach(link => {
    if (link.getAttribute('href') === `#${activeId}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

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

/* ─── 3D VORTEX GALAXY INTERACTIVITY ─────────────────────── */
const filterBtns = document.querySelectorAll('.v-filter-btn');
const vNodes = document.querySelectorAll('.v-node');
const hudName = document.getElementById('hudName');
const hudProf = document.getElementById('hudProf');
const hudDesc = document.getElementById('hudDesc');

// Filter nodes by category
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    vNodes.forEach(node => {
      const cat = node.getAttribute('data-cat');
      if (filter === 'all' || cat === filter) {
        node.classList.remove('is-dimmed');
        node.classList.add('is-highlighted');
      } else {
        node.classList.add('is-dimmed');
        node.classList.remove('is-highlighted');
      }
    });
  });
});

// Live HUD updates on node hover
vNodes.forEach(node => {
  node.addEventListener('mouseenter', () => {
    const name = node.getAttribute('data-name');
    const prof = node.getAttribute('data-prof');
    const desc = node.getAttribute('data-desc');

    if (hudName) hudName.textContent = name;
    if (hudProf) hudProf.textContent = prof;
    if (hudDesc) hudDesc.textContent = desc;
  });

  node.addEventListener('mouseleave', () => {
    if (hudName) hudName.textContent = 'Hover on any skill node';
    if (hudProf) hudProf.textContent = '95%';
    if (hudDesc) hudDesc.textContent = 'Orbits run smoothly in 3D space with continuous counter-rotation.';
  });
});

/* ─── FLOATING AMBIENT MUSIC PLAYER (NATIVE HTML5 AUDIO) ──── */
const ambientPlayer = document.getElementById('ambientPlayer');
const playerToggleBtn = document.getElementById('playerToggleBtn');
const playerCloseBtn = document.getElementById('playerCloseBtn');
const pPlayPauseBtn = document.getElementById('pPlayPauseBtn');
const pPlayIcon = document.getElementById('pPlayIcon');
const pPlayText = document.getElementById('pPlayText');
const pMuteBtn = document.getElementById('pMuteBtn');
const pMuteIcon = document.getElementById('pMuteIcon');
const playlistSelect = document.getElementById('playlistSelect');
const pTrackName = document.getElementById('pTrackName');
const pMiniTitle = document.getElementById('pMiniTitle');
const pTrackIcon = document.getElementById('pTrackIcon');
const pVolumeSlider = document.getElementById('pVolumeSlider');
const pWaveStatus = document.getElementById('pWaveStatus');
const ambientAudio = document.getElementById('ambientAudio');

if (ambientAudio) {
  ambientAudio.volume = 0.4;
}

function playAmbientAudio() {
  if (!ambientAudio) return;
  ambientAudio.play().then(() => {
    if (ambientPlayer) ambientPlayer.classList.add('is-playing');
    if (pPlayIcon) pPlayIcon.textContent = '⏸';
    if (pPlayText) pPlayText.textContent = 'Pause Soundtrack';
    if (pWaveStatus) pWaveStatus.textContent = 'Playing Soothing Stream';
  }).catch(e => {
    console.log('Audio autoplay wait:', e);
  });
}

function pauseAmbientAudio() {
  if (!ambientAudio) return;
  ambientAudio.pause();
  if (ambientPlayer) ambientPlayer.classList.remove('is-playing');
  if (pPlayIcon) pPlayIcon.textContent = '▶';
  if (pPlayText) pPlayText.textContent = 'Play Soundtrack';
  if (pWaveStatus) pWaveStatus.textContent = 'Soundtrack Paused';
}

// Toggle Player Panel
if (playerToggleBtn && ambientPlayer) {
  playerToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    ambientPlayer.classList.toggle('collapsed');
  });
}

if (playerCloseBtn && ambientPlayer) {
  playerCloseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    ambientPlayer.classList.add('collapsed');
  });
}

// Close panel when clicking outside
document.addEventListener('click', (e) => {
  if (ambientPlayer && !ambientPlayer.contains(e.target)) {
    ambientPlayer.classList.add('collapsed');
  }
});

// Play / Pause Button Toggle
if (pPlayPauseBtn) {
  pPlayPauseBtn.addEventListener('click', () => {
    if (!ambientAudio) return;
    if (ambientAudio.paused) {
      playAmbientAudio();
    } else {
      pauseAmbientAudio();
    }
  });
}

// Mute / Unmute Button Toggle
if (pMuteBtn && ambientAudio) {
  pMuteBtn.addEventListener('click', () => {
    ambientAudio.muted = !ambientAudio.muted;
    if (pMuteIcon) pMuteIcon.textContent = ambientAudio.muted ? '🔇' : '🔊';
  });
}

// Volume Slider Control
if (pVolumeSlider && ambientAudio) {
  pVolumeSlider.addEventListener('input', (e) => {
    ambientAudio.volume = parseFloat(e.target.value);
    if (ambientAudio.volume > 0 && ambientAudio.muted) {
      ambientAudio.muted = false;
      if (pMuteIcon) pMuteIcon.textContent = '🔊';
    }
  });
}

// Playlist Track Switcher
if (playlistSelect && ambientAudio) {
  playlistSelect.addEventListener('change', (e) => {
    const selectedOpt = e.target.options[e.target.selectedIndex];
    const src = e.target.value;
    const trackName = selectedOpt.getAttribute('data-name') || selectedOpt.textContent;
    const icon = selectedOpt.getAttribute('data-icon') || '🎵';

    if (pTrackName) pTrackName.textContent = trackName;
    if (pMiniTitle) pMiniTitle.textContent = trackName.split(' ')[0] + ' Beats';
    if (pTrackIcon) pTrackIcon.textContent = icon;

    ambientAudio.src = src;
    playAmbientAudio();
  });
}

/* ─── SMOOTH CLICK ANCHOR NAVIGATION ──────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    e.preventDefault();
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
});

/* ─── INITIALIZATION ──────────────────────────────────────── */
function initPortfolioApp() {
  // Set first image active immediately
  setAvatarImage(0);
  // Initial render at 0 progress
  renderHero(0);
  // Start the smooth RAF engine
  heroRAF();
  // Capture initial scroll state
  updateScrollProgress();
  // Start intro sequence
  startIntroSequence();

}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolioApp);
} else {
  initPortfolioApp();
}
