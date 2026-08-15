/* ============================================================
   SOHAM SAWALAKHE — BUTTERY SCROLL-SCRUBBING ENGINE
   Vanilla JS · Precision Canvas Rendering · Fixed Sticky Scrollytelling
   Native Ambient HTML5 Soundtrack Player
   ============================================================ */

'use strict';

/* ─── FRAME SEQUENCE CONFIGURATION ────────────────────────── */
const TOTAL_FRAMES = 300;
const FRAME_DIR = 'frames/';

function getFrameSrc(i) {
  const num = String(i + 1).padStart(4, '0');
  return `${FRAME_DIR}frame_${num}.jpg`;
}

/* ─── ENGINE STATE ────────────────────────────────────────── */
let currentFrame = 0;
let targetFrame = 0;
let images = [];
let loadedCount = 0;

/* ─── DOM ELEMENTS ────────────────────────────────────────── */
const canvas = document.getElementById('heroCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;
const nav = document.getElementById('nav');
const heroSection = document.getElementById('home');
const scrollHint = document.getElementById('scrollHint');
const stage1 = document.getElementById('stage1');
const stage2 = document.getElementById('stage2');
const stage3 = document.getElementById('stage3');

const introGateway = document.getElementById('introGateway');
const introLoaderWrap = document.getElementById('introLoaderWrap');
const introProgressFill = document.getElementById('introProgressFill');
const introStatus = document.getElementById('introStatus');
const introPct = document.getElementById('introPct');
const introEnterBtn = document.getElementById('introEnterBtn');
const introHintText = document.getElementById('introHintText');
let introReady = false;

/* ─── CANVAS SETUP ────────────────────────────────────────── */
function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawFrame(Math.round(currentFrame));
}

window.addEventListener('resize', resizeCanvas);

/* ─── DRAW FRAME (CANVAS COVER & NON-OVERLAPPING OFFSET) ──── */
function drawFrame(idx) {
  if (!canvas || !ctx) return;
  const frameIdx = Math.max(0, Math.min(TOTAL_FRAMES - 1, idx));
  const img = images[frameIdx];
  if (!img || !img.complete || img.naturalWidth === 0) return;

  const cw = canvas.width;
  const ch = canvas.height;
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;

  // Cover scaling mode
  const scale = Math.max(cw / iw, ch / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  
  // On desktop screens, shift keyboard product slightly right so the card on the left never overlaps!
  let dx = (cw - dw) / 2;
  let dy = (ch - dh) / 2;

  if (cw >= 1024) {
    dx = (cw - dw) / 2 + (cw * 0.14);
  } else {
    // On mobile/tablet screens, shift keyboard image upwards so it is 100% visible in the top half
    dy = (ch - dh) / 2 - (ch * 0.16);
  }

  // Draw background to avoid seam
  ctx.fillStyle = '#af9e8c';
  ctx.fillRect(0, 0, cw, ch);
  ctx.drawImage(img, dx, dy, dw, dh);
}

/* ─── FAST & CRISP INTRO CONTROLLER ───────────────────────── */
function startIntroSequence() {
  const duration = 450; // Super fast 0.45s progress animation
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

// Initial blur state for entrance
if (canvas) canvas.classList.add('canvas-initial-blur');
if (nav) nav.classList.add('nav-initial-hide');

function enterExperience() {
  if (!introGateway || introGateway.classList.contains('is-exiting')) return;
  
  introGateway.classList.add('is-exiting');

  // Automatically start soothing ambient soundtrack on entering!
  playAmbientAudio();

  // Trigger Faded Focus Reveal on Canvas and Navigation
  if (canvas) {
    canvas.classList.remove('canvas-initial-blur');
    canvas.classList.add('canvas-crisp-focus');
  }
  if (nav) {
    nav.classList.remove('nav-initial-hide');
    nav.classList.add('nav-reveal-focus');
  }

  // Staggered cinematic hero scene entrance
  setTimeout(() => {
    introGateway.style.display = 'none';
    
    if (typeof anime !== 'undefined') {
      anime({
        targets: '#stage1',
        opacity: [0, 1],
        translateY: [35, 0],
        filter: ['blur(8px)', 'blur(0px)'],
        duration: 900,
        easing: 'easeOutExpo'
      });
      
      anime({
        targets: '#stage1 .badge-pill, #stage1 .hero-title, #stage1 .hero-desc, #stage1 .hero-btns',
        opacity: [0, 1],
        translateY: [15, 0],
        duration: 700,
        delay: anime.stagger(80, { start: 150 }),
        easing: 'easeOutExpo'
      });
    }
  }, 750);
}

if (introEnterBtn) {
  introEnterBtn.addEventListener('click', enterExperience);
}

// Allow pressing Enter on intro gateway once ready
window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    enterExperience();
  }
});

/* ─── PRELOAD SEQUENCE ────────────────────────────────────── */
function preloadFrames() {
  images = new Array(TOTAL_FRAMES);

  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const img = new Image();
    img.src = getFrameSrc(i);
    
    img.onload = () => {
      loadedCount++;
      if (i === 0) {
        drawFrame(0);
      }
    };

    img.onerror = () => {
      loadedCount++;
    };

    images[i] = img;
  }
}

/* ─── ULTRA-SMOOTH LERP ANIMATION LOOP ────────────────────── */
function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

function renderEngine() {
  // 0.12 factor provides silky Apple-like damping
  currentFrame = lerp(currentFrame, targetFrame, 0.12);

  if (Math.abs(currentFrame - targetFrame) > 0.01) {
    drawFrame(Math.round(currentFrame));
  } else {
    currentFrame = targetFrame;
    drawFrame(Math.round(currentFrame));
  }

  requestAnimationFrame(renderEngine);
}

/* ─── SCROLLYTELLING SCENE CONTROLLER ─────────────────────── */
function updateScrollProgress() {
  if (!heroSection) return;

  const rect = heroSection.getBoundingClientRect();
  const totalScrollable = heroSection.offsetHeight - window.innerHeight;

  if (totalScrollable <= 0) return;

  const scrolled = -rect.top;
  const rawProgress = scrolled / totalScrollable;
  const progress = Math.max(0, Math.min(1, rawProgress));

  // Map progress (0 -> 1) to Frame (0 -> 299)
  targetFrame = progress * (TOTAL_FRAMES - 1);

  // Progressive scene reveal
  if (progress < 0.28) {
    if (stage1) stage1.classList.add('active');
    if (stage2) stage2.classList.remove('active');
    if (stage3) stage3.classList.remove('active');
  } else if (progress >= 0.28 && progress < 0.62) {
    if (stage1) stage1.classList.remove('active');
    if (stage2) stage2.classList.add('active');
    if (stage3) stage3.classList.remove('active');
  } else if (progress >= 0.62 && progress <= 0.98) {
    if (stage1) stage1.classList.remove('active');
    if (stage2) stage2.classList.remove('active');
    if (stage3) stage3.classList.add('active');
  } else {
    if (stage1) stage1.classList.remove('active');
    if (stage2) stage2.classList.remove('active');
    if (stage3) stage3.classList.remove('active');
  }

  // Scroll Hint fading
  if (scrollHint) {
    if (progress > 0.04) {
      scrollHint.classList.add('hidden');
    } else {
      scrollHint.classList.remove('hidden');
    }
  }

  // Nav Morph
  if (nav) {
    if (window.scrollY > 40) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  }

  // Active Nav Link Update
  updateActiveNavLink();
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
  resizeCanvas();
  preloadFrames();
  startIntroSequence();
  requestAnimationFrame(renderEngine);
  updateScrollProgress();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolioApp);
} else {
  initPortfolioApp();
}
