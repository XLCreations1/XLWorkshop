/* shared.js — XLWorkshop */

(function () {
  /* ── Stars ── */
  function buildStars() {
    const layer = document.querySelector('.stars-layer');
    if (!layer) return;
    const count = 160;
    for (let i = 0; i < count; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      const size = Math.random() * 2.4 + 0.6;
      const opacity = Math.random() * 0.7 + 0.2;
      const duration = Math.random() * 4 + 2;
      s.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random()*100}%;
        top:${Math.random()*70}%;
        --o:${opacity}; --d:${duration}s;
        animation-delay:${Math.random()*5}s;
      `;
      layer.appendChild(s);
    }
  }

  /* ── Fireflies ── */
  function buildFireflies() {
    const count = 18;
    for (let i = 0; i < count; i++) {
      const f = document.createElement('div');
      f.className = 'firefly';
      const duration = Math.random() * 10 + 6;
      const fx  = (Math.random() - 0.5) * 160;
      const fy  = (Math.random() - 0.5) * 120 - 20;
      const fx2 = (Math.random() - 0.5) * 200;
      const fy2 = (Math.random() - 0.5) * 100;
      f.style.cssText = `
        left:${Math.random()*95}%;
        top:${Math.random()*75 + 20}%;
        --fd:${duration}s; --fx:${fx}px; --fy:${fy}px; --fx2:${fx2}px; --fy2:${fy2}px;
        animation-delay:${Math.random()*12}s;
      `;
      document.body.appendChild(f);
    }
  }

  /* ── Forest SVG silhouette ── */
  function buildForest() {
    const container = document.querySelector('.forest-silhouette');
    if (!container) return;
    container.innerHTML = `<svg viewBox="0 0 1440 260" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <!-- back layer: lighter -->
      <path d="M0,200 L60,140 L90,165 L130,100 L160,130 L200,80 L230,110 L270,70 L300,100 L340,60 L370,90 L420,50 L450,80 L490,55 L520,75 L560,40 L600,65 L640,30 L680,55 L720,20 L760,50 L800,35 L840,60 L880,30 L920,55 L960,25 L1000,50 L1040,35 L1080,55 L1120,30 L1160,50 L1200,40 L1240,60 L1280,45 L1320,65 L1360,50 L1400,70 L1440,55 L1440,260 L0,260 Z" fill="#1a0906" opacity="0.85"/>
      <!-- front layer: darker -->
      <path d="M0,240 L40,185 L70,210 L100,165 L130,190 L170,145 L200,170 L240,130 L270,155 L310,115 L340,140 L380,105 L410,125 L450,95 L490,115 L530,85 L570,108 L610,80 L650,100 L690,75 L730,98 L770,72 L810,95 L850,68 L890,90 L930,70 L970,92 L1010,68 L1050,88 L1090,65 L1130,85 L1170,62 L1210,80 L1250,60 L1290,78 L1330,58 L1370,75 L1410,58 L1440,72 L1440,260 L0,260 Z" fill="#0f0503" opacity="0.95"/>
    </svg>`;
  }

  /* ── Scroll fade-up ── */
  function initFadeUp() {
    const els = document.querySelectorAll('.fade-up');
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
  }

  /* ── Mobile nav toggle ── */
  function initNav() {
    const burger = document.getElementById('navBurger');
    const menu   = document.getElementById('mobileMenu');
    if (!burger || !menu) return;
    burger.addEventListener('click', () => menu.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (!burger.contains(e.target) && !menu.contains(e.target)) menu.classList.remove('open');
    });
  }

  /* ── Archive toggles ── */
  function initArchive() {
    document.querySelectorAll('.archive-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = document.getElementById(btn.dataset.target);
        if (!target) return;
        target.classList.toggle('open');
        btn.textContent = target.classList.contains('open') ? '▲ Hide Archive' : '▼ View Past Projects';
      });
    });
  }

  /* ── Active nav link ── */
  function markActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    buildStars();
    buildFireflies();
    buildForest();
    initFadeUp();
    initNav();
    initArchive();
    markActiveNav();
  });
})();
