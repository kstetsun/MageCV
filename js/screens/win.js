function initWinPage() {
  let data = {};
  if (typeof loadRaw === "function") {
    data = loadRaw() || {};
  }

  const days = data.day || '?';
  const resumes = data.resumesSentTotal || '?';
  const mode = data.mode ? (data.mode.charAt(0).toUpperCase() + data.mode.slice(1)) : '?';

  const jobTitles = [
    'Archmage of Spreadsheets',
    'Potion Logistics Coordinator',
    'Junior Rune Scribe',
    'Enchanted Mailroom Clerk',
    'Wand Quality Inspector',
    'Scroll Archivist',
    'Mystic HR Specialist',
    'Crystal Ball Analyst'
  ];

  const salaries = [
    '420 Gold Coins/month + dragon dental',
    '800 Enchanted Florins/month + broom allowance',
    '1,200 Arcane Shillings/month + free cauldron',
    '650 Moonsilver/month + unlimited spell scrolls',
    '900 Cursed Doubloons/month + phantom pension',
    '550 Ethereal Sovereigns/month + hat stipend',
    '1,000 Runic Marks/month + free wand polishing'
  ];

  const perks = [
    '12 days Astral Plane leave per year',
    'Complimentary familiar (cat or toad only)',
    'Unlimited access to the forbidden library',
    'One free memory wipe per quarter',
    'Weekly mandatory cauldron yoga',
    'Private portal to the break room',
    'Daily enchanted lunch (no eye of newt on Fridays)'
  ];

  const startDates = [
    'Immediately (the ravens are already watching)',
    'After the next lunar eclipse',
    'Upon completion of the onboarding ritual',
    'First Monday following the next blood moon',
    'As soon as your references stop screaming',
    'When Mercury is no longer in retrograde',
    'Third Thursday of the Harvest Moon'
  ];

  const pick = arr => arr[Math.floor(Math.random() * arr.length)];

  document.getElementById('winDays').textContent = days;
  document.getElementById('winResumeCount').textContent = resumes;
  document.getElementById('winMode').textContent = mode;
  document.getElementById('winJobTitle').textContent = pick(jobTitles);
  document.getElementById('winSalary').textContent = pick(salaries);
  document.getElementById('winPerks').textContent = pick(perks);
  document.getElementById('winStartDate').textContent = pick(startDates);

  if (typeof clearSave === "function") {
    clearSave();
  }

  launchConfetti();
}

function launchConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const COLORS = ['#d4a03c', '#7ecfa0', '#b48eff', '#e07070', '#70b8e0', '#f5c842', '#ff9f6b'];
  const SHAPES = ['circle', 'rect', 'star', 'spark'];
  const COUNT = 180;

  const particles = Array.from({ length: COUNT }, () => {
    const side = Math.floor(Math.random() * 4);
    let x, y, vx, vy;
    const speed = 2 + Math.random() * 4;
    const angle = Math.random() * Math.PI * 2;
    if (side === 0) { x = Math.random() * canvas.width; y = -10; vx = Math.cos(angle) * 1.5; vy = speed; }
    else if (side === 1) { x = canvas.width + 10; y = Math.random() * canvas.height; vx = -speed; vy = Math.sin(angle) * 1.5; }
    else if (side === 2) { x = Math.random() * canvas.width; y = canvas.height + 10; vx = Math.cos(angle) * 1.5; vy = -speed; }
    else { x = -10; y = Math.random() * canvas.height; vx = speed; vy = Math.sin(angle) * 1.5; }
    return {
      x, y, vx, vy,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      size: 5 + Math.random() * 8,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.15,
      alpha: 1,
      life: 180 + Math.random() * 120,
      age: 0,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.05 + Math.random() * 0.05
    };
  });

  function drawStar(ctx, cx, cy, r, points) {
    ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
      const a = (i * Math.PI) / points - Math.PI / 2;
      const rad = i % 2 === 0 ? r : r * 0.4;
      ctx.lineTo(cx + Math.cos(a) * rad, cy + Math.sin(a) * rad);
    }
    ctx.closePath();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    for (const p of particles) {
      p.age++;
      if (p.age > p.life) continue;
      alive = true;
      p.x += p.vx + Math.sin(p.wobble) * 0.8;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      p.wobble += p.wobbleSpeed;
      p.vy += 0.04;
      p.alpha = p.age < 20 ? p.age / 20 : p.age > p.life - 40 ? (p.life - p.age) / 40 : 1;
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      if (p.shape === 'circle') {
        ctx.beginPath(); ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2); ctx.fill();
      } else if (p.shape === 'rect') {
        ctx.fillRect(-p.size * 0.5, -p.size * 0.25, p.size, p.size * 0.5);
      } else if (p.shape === 'star') {
        drawStar(ctx, 0, 0, p.size * 0.6, 5); ctx.fill();
      } else {
        ctx.strokeStyle = p.color; ctx.lineWidth = 2; ctx.globalAlpha = p.alpha * 0.8;
        ctx.beginPath(); ctx.moveTo(-p.size * 0.5, 0); ctx.lineTo(p.size * 0.5, 0); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, -p.size * 0.5); ctx.lineTo(0, p.size * 0.5); ctx.stroke();
      }
      ctx.restore();
    }
    if (alive) requestAnimationFrame(draw);
    else { canvas.style.display = 'none'; }
  }

  draw();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

function startOver() {
  window.location.href = 'start.html';
}

window.startOver = startOver;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWinPage);
} else {
  initWinPage();
}