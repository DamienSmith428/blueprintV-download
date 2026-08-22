(function () {
  'use strict';

  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles, animId;

  const PARTICLE_COUNT = 70;
  const COLORS = [
    'rgba(0, 200, 255, ',
    'rgba(0, 120, 255, ',
    'rgba(0, 160, 220, ',
    'rgba(255, 140, 0, ',
  ];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createParticle() {
    return {
      x:    rand(0, W),
      y:    rand(0, H),
      vx:   rand(-0.15, 0.15),
      vy:   rand(-0.25, -0.05),
      r:    rand(1, 2.5),
      alpha: rand(0.1, 0.6),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      // whether to draw as a small diamond / square node
      node: Math.random() > 0.65,
    };
  }

  function initParticles() {
    particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
  }

  function drawParticle(p) {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle   = p.color + p.alpha + ')';
    ctx.shadowColor = p.color + '0.8)';
    ctx.shadowBlur  = p.node ? 6 : 4;

    if (p.node) {
      const s = p.r * 2;
      ctx.translate(p.x, p.y);
      ctx.rotate(Math.PI / 4);
      ctx.fillRect(-s / 2, -s / 2, s, s);
    } else {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawLines() {
    const threshold = 140;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < threshold) {
          const alpha = (1 - dist / threshold) * 0.12;
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.strokeStyle = 'rgba(0, 180, 255, 1)';
          ctx.lineWidth   = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);

    drawLines();

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around
      if (p.y < -10)  p.y = H + 10;
      if (p.y > H + 10) p.y = -10;
      if (p.x < -10)  p.x = W + 10;
      if (p.x > W + 10) p.x = -10;

      drawParticle(p);
    }

    animId = requestAnimationFrame(tick);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animId);
    } else {
      tick();
    }
  });

  window.addEventListener('resize', () => {
    resize();
    initParticles();
  });
  resize();
  initParticles();
  tick();
}());
