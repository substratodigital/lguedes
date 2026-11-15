/**
 * Motions dos cards "Experiência selecionada em consultoria".
 * Cada território tem uma animação própria em canvas 2D:
 *  - strategy: iniciativas dispersas são podadas e convergem em fluxos até o alvo
 *  - ai:       rede neural com pulsos que viram barras de valor
 *  - org:      organograma que sai do emaranhado para uma hierarquia clara
 * Performance: rAF só roda com o card visível, DPR limitado a 2,
 * sem alocação por frame nos loops principais e respeito a reduced-motion.
 */

type Kind = 'strategy' | 'ai' | 'org';

interface Ctx {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  t: number;
  focus: number; // 0 = caos/experimento, 1 = foco/estrutura
  px: number; // ponteiro normalizado (0..1)
  py: number;
  hover: boolean;
}

const rgba = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a.toFixed(3)})`;
};

// PRNG determinístico para layouts estáveis
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/* ───────────────────────── Estratégia & Execução ───────────────────────── */
function makeStrategy() {
  const R = rng(7);
  const C = '#4F46E5';
  const lanes = [-0.26, 0, 0.26];
  const parts = Array.from({ length: 46 }, (_, i) => ({
    lane: i % 3,
    pruned: R() < 0.42,
    s: R(),
    speed: 0.0016 + R() * 0.0018,
    hx: 0.06 + R() * 0.78,
    hy: 0.12 + R() * 0.72,
    ph: R() * Math.PI * 2,
    r: 1.4 + R() * 1.6,
  }));

  return (c: Ctx) => {
    const { ctx, w, h, t, focus } = c;
    const tx = w * 0.86;
    const ty = h * (0.5 + (c.hover ? (c.py - 0.5) * 0.35 : Math.sin(t * 0.5) * 0.06));
    const sx = w * 0.06;

    // trilhas das prioridades
    for (let l = 0; l < 3; l++) {
      const y0 = h * (0.5 + lanes[l]);
      ctx.strokeStyle = rgba(C, 0.06 + focus * 0.16);
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 5]);
      ctx.beginPath();
      ctx.moveTo(sx, y0);
      ctx.bezierCurveTo(w * 0.42, y0, w * 0.56, ty, tx, ty);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    for (const p of parts) {
      p.s += p.speed * (0.4 + focus * 1.2);
      if (p.s > 1) p.s -= 1;
      const y0 = h * (0.5 + lanes[p.lane]);
      // ponto na curva bezier da trilha
      const u = p.s, iu = 1 - u;
      const bx = iu * iu * iu * sx + 3 * iu * iu * u * (w * 0.42) + 3 * iu * u * u * (w * 0.56) + u * u * u * tx;
      const by = iu * iu * iu * y0 + 3 * iu * iu * u * y0 + 3 * iu * u * u * ty + u * u * u * ty;
      const dx = (p.hx + Math.sin(t * 0.7 + p.ph) * 0.03) * w;
      const dy = (p.hy + Math.cos(t * 0.6 + p.ph) * 0.04) * h;

      let x: number, y: number, a: number;
      if (p.pruned) {
        // iniciativas de baixo retorno: perdem força e caem para fora do foco
        x = dx;
        y = dy + focus * h * 0.12;
        a = 0.5 * (1 - focus) + 0.05;
        ctx.fillStyle = `rgba(120,120,140,${a.toFixed(3)})`;
      } else {
        x = dx + (bx - dx) * focus;
        y = dy + (by - dy) * focus;
        a = 0.45 + focus * 0.5;
        ctx.fillStyle = rgba(C, a);
      }
      ctx.beginPath();
      ctx.arc(x, y, p.r * (p.pruned ? 1 : 1 + focus * 0.25), 0, Math.PI * 2);
      ctx.fill();
    }

    // alvo (execução)
    const pulse = (t * 0.9) % 1;
    ctx.strokeStyle = rgba(C, 0.35 * (1 - pulse) * (0.4 + focus * 0.6));
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(tx, ty, 8 + pulse * 22, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = rgba(C, 0.55 + focus * 0.4);
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(tx, ty, 12, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = C;
    ctx.beginPath();
    ctx.arc(tx, ty, 4, 0, Math.PI * 2);
    ctx.fill();
  };
}

/* ───────────────────────── IA & Transformação ───────────────────────── */
function makeAI() {
  const R = rng(21);
  const C = '#0D9488';
  const layers = [4, 6, 3];
  const nodes: { x: number; y: number; l: number }[] = [];
  layers.forEach((n, l) => {
    for (let i = 0; i < n; i++) nodes.push({ x: 0.1 + l * 0.24, y: (i + 1) / (n + 1), l });
  });
  const edges: [number, number][] = [];
  nodes.forEach((a, i) =>
    nodes.forEach((b, j) => {
      if (b.l === a.l + 1) edges.push([i, j]);
    })
  );
  const pulses = Array.from({ length: 18 }, () => ({ e: Math.floor(R() * edges.length), s: R(), v: 0.006 + R() * 0.008 }));
  const bars = Array.from({ length: 9 }, (_, i) => 0.18 + i * 0.03);
  let gain = 0;

  return (c: Ctx) => {
    const { ctx, w, h, t, focus } = c;
    const px = c.px * w, py = c.py * h;
    const N = (i: number) => ({ x: nodes[i].x * w, y: 0.12 * h + nodes[i].y * h * 0.76 });

    // nó mais próximo do ponteiro
    let hot = -1;
    if (c.hover) {
      let best = 1e9;
      for (let i = 0; i < nodes.length; i++) {
        const p = N(i);
        const d = Math.hypot(p.x - px, p.y - py);
        if (d < best) { best = d; hot = i; }
      }
    }

    ctx.lineWidth = 1;
    for (const [a, b] of edges) {
      const A = N(a), B = N(b);
      const lit = a === hot || b === hot;
      ctx.strokeStyle = rgba(C, lit ? 0.45 : 0.08 + focus * 0.08);
      ctx.beginPath();
      ctx.moveTo(A.x, A.y);
      ctx.lineTo(B.x, B.y);
      ctx.stroke();
    }

    for (const p of pulses) {
      p.s += p.v * (0.7 + focus * 1.3);
      if (p.s >= 1) {
        // chega à próxima camada: se for saída, gera valor
        const to = edges[p.e][1];
        if (nodes[to].l === layers.length - 1) {
          gain += 0.05;
          const next = hot >= 0 && nodes[hot].l === 0 ? hot : Math.floor(Math.random() * layers[0]);
          const opts = edges.map((e, k) => (e[0] === next ? k : -1)).filter((k) => k >= 0);
          p.e = opts[Math.floor(Math.random() * opts.length)];
        } else {
          const opts = edges.map((e, k) => (e[0] === to ? k : -1)).filter((k) => k >= 0);
          p.e = opts[Math.floor(Math.random() * opts.length)];
        }
        p.s = 0;
      }
      const [a, b] = edges[p.e];
      const A = N(a), B = N(b);
      const x = A.x + (B.x - A.x) * p.s, y = A.y + (B.y - A.y) * p.s;
      ctx.fillStyle = rgba(C, 0.85);
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    for (let i = 0; i < nodes.length; i++) {
      const p = N(i);
      const out = nodes[i].l === layers.length - 1;
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = rgba(C, i === hot ? 1 : out ? 0.8 : 0.5);
      ctx.lineWidth = i === hot ? 2 : 1.3;
      ctx.beginPath();
      ctx.arc(p.x, p.y, out ? 5 : 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // barras de valor capturado (lado direito)
    gain *= 0.94;
    const bx0 = w * 0.64, bw = (w * 0.3) / bars.length, base = h * 0.82;
    for (let i = 0; i < bars.length; i++) {
      const target = 0.18 + i * 0.07 * (0.5 + focus * 0.5) + Math.sin(t * 1.4 + i) * 0.02;
      bars[i] += (target + (i === bars.length - 1 ? gain : 0) - bars[i]) * 0.06;
      const bh = Math.min(0.7, bars[i]) * h * 0.8;
      ctx.fillStyle = rgba(C, 0.14 + (i / bars.length) * 0.5);
      ctx.fillRect(bx0 + i * bw + 1, base - bh, bw - 3, bh);
    }
    ctx.strokeStyle = rgba(C, 0.3);
    ctx.beginPath();
    ctx.moveTo(bx0, base + 0.5);
    ctx.lineTo(w * 0.95, base + 0.5);
    ctx.stroke();
  };
}

/* ───────────────────────── Organização & Liderança ───────────────────────── */
function makeOrg() {
  const R = rng(5);
  const C = '#6366F1';
  // 1 raiz, 3 gestores, 7 equipes
  const tree: { x: number; y: number; parent: number }[] = [{ x: 0.5, y: 0.2, parent: -1 }];
  [0.24, 0.5, 0.76].forEach((x) => tree.push({ x, y: 0.48, parent: 0 }));
  const leaves: [number, number][] = [[0.12, 1], [0.3, 1], [0.44, 2], [0.56, 2], [0.7, 3], [0.82, 3], [0.92, 3]];
  leaves.forEach(([x, p]) => tree.push({ x, y: 0.76, parent: p }));
  const chaos = tree.map(() => ({ x: 0.1 + R() * 0.8, y: 0.15 + R() * 0.68, ph: R() * 6.28 }));
  // interfaces redundantes (sobreposição de escopo) que somem com a estrutura
  const tangles: [number, number][] = [[4, 9], [5, 10], [1, 7], [2, 8], [6, 3], [8, 4], [10, 2]];

  return (c: Ctx) => {
    const { ctx, w, h, t, focus } = c;
    const e = focus * focus * (3 - 2 * focus); // smoothstep
    const P = tree.map((n, i) => {
      const ch = chaos[i];
      const cx = ch.x + Math.sin(t * 0.8 + ch.ph) * 0.02;
      const cy = ch.y + Math.cos(t * 0.7 + ch.ph) * 0.03;
      return { x: (cx + (n.x - cx) * e) * w, y: (cy + (n.y - cy) * e) * h };
    });

    let hot = -1;
    if (c.hover) {
      let best = 1e9;
      P.forEach((p, i) => {
        const d = Math.hypot(p.x - c.px * w, p.y - c.py * h);
        if (d < best) { best = d; hot = i; }
      });
    }
    const chain = new Set<number>();
    for (let k = hot; k >= 0; k = tree[k].parent) chain.add(k);

    ctx.lineWidth = 1;
    ctx.setLineDash([2, 4]);
    for (const [a, b] of tangles) {
      ctx.strokeStyle = `rgba(150,150,170,${(0.35 * (1 - e)).toFixed(3)})`;
      ctx.beginPath();
      ctx.moveTo(P[a].x, P[a].y);
      ctx.lineTo(P[b].x, P[b].y);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // linhas de reporte (ortogonais quando estruturado)
    for (let i = 1; i < tree.length; i++) {
      const a = P[tree[i].parent], b = P[i];
      const inChain = chain.has(i) && chain.has(tree[i].parent);
      ctx.strokeStyle = rgba(C, inChain ? 0.95 : 0.12 + e * 0.3);
      ctx.lineWidth = inChain ? 2 : 1.2;
      const my = a.y + (b.y - a.y) * 0.5;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.bezierCurveTo(a.x, my, b.x, my, b.x, b.y);
      ctx.stroke();
    }

    P.forEach((p, i) => {
      const lvl = i === 0 ? 0 : i < 4 ? 1 : 2;
      const s = lvl === 0 ? 7 : lvl === 1 ? 5.5 : 4;
      const lit = chain.has(i);
      ctx.fillStyle = lit ? C : '#fff';
      ctx.strokeStyle = rgba(C, lit ? 1 : 0.6);
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(p.x - s, p.y - s, s * 2, s * 2, 2.5);
      else ctx.rect(p.x - s, p.y - s, s * 2, s * 2);
      ctx.fill();
      ctx.stroke();
    });
  };
}

const factories: Record<Kind, () => (c: Ctx) => void> = {
  strategy: makeStrategy,
  ai: makeAI,
  org: makeOrg,
};

export function initCasesMotion(root: ParentNode = document) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.querySelectorAll<HTMLCanvasElement>('canvas[data-case-canvas]').forEach((canvas) => {
    const kind = canvas.dataset.caseCanvas as Kind;
    const draw = factories[kind]?.();
    const ctx = canvas.getContext('2d');
    if (!draw || !ctx) return;
    const card = (canvas.closest('[data-case-card]') as HTMLElement) || canvas.parentElement!;

    const c: Ctx = { ctx, w: 1, h: 1, t: Math.random() * 10, focus: 0.3, px: 0.5, py: 0.5, hover: false };
    let visible = false;
    let raf = 0;
    let last = 0;
    let touchUntil = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.w = Math.max(1, r.width);
      c.h = Math.max(1, r.height);
      canvas.width = Math.round(c.w * dpr);
      canvas.height = Math.round(c.h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    new ResizeObserver(resize).observe(canvas);

    const setPointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      c.px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      c.py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    };
    card.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') c.hover = true; });
    card.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') c.hover = false; });
    card.addEventListener('pointermove', setPointer, { passive: true });
    // toque: segura o estado "estruturado" por alguns segundos
    canvas.addEventListener('pointerdown', (e) => {
      setPointer(e);
      if (e.pointerType !== 'mouse') { c.hover = true; touchUntil = performance.now() + 3200; }
    });

    const frame = (now: number) => {
      raf = 0;
      if (!visible) return;
      const dt = Math.min(0.05, (now - (last || now)) / 1000);
      last = now;
      c.t += dt;
      if (touchUntil && now > touchUntil) { c.hover = false; touchUntil = 0; }
      // ciclo automático caos → foco quando não há interação
      const auto = 0.5 - 0.5 * Math.cos(c.t * 0.55);
      const target = c.hover ? 1 : 0.1 + auto * 0.75;
      c.focus += (target - c.focus) * (c.hover ? 0.07 : 0.04);
      ctx.clearRect(0, 0, c.w, c.h);
      draw(c);
      if (!reduced) raf = requestAnimationFrame(frame);
    };

    new IntersectionObserver(
      ([en]) => {
        visible = en.isIntersecting;
        if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
      },
      { threshold: 0.05 }
    ).observe(canvas);

    if (reduced) { c.focus = 1; c.hover = false; }
  });
}

/**
 * Carrossel 3D (mobile/tablet): o card central fica ampliado e os laterais
 * giram em perspectiva. Usa scroll-snap nativo (toque fluido) e só aplica
 * transform/opacity por frame.
 */
export function initCasesCarousel(root: ParentNode = document) {
  const track = root.querySelector<HTMLElement>('[data-cases-track]');
  if (!track) return;
  const cards = Array.from(track.querySelectorAll<HTMLElement>('[data-case-card]'));
  const dots = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-cases-dot]'));
  const mq = matchMedia('(max-width: 1023px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let raf = 0;

  const update = () => {
    raf = 0;
    if (!mq.matches) {
      cards.forEach((c) => { c.style.transform = ''; c.style.opacity = ''; c.style.zIndex = ''; });
      return;
    }
    const tr = track.getBoundingClientRect();
    const mid = tr.left + tr.width / 2;
    let active = 0, best = 1e9;
    cards.forEach((card, i) => {
      const r = card.getBoundingClientRect();
      const d = (r.left + r.width / 2 - mid) / r.width;
      const ad = Math.min(1.4, Math.abs(d));
      if (Math.abs(d) < best) { best = Math.abs(d); active = i; }
      if (reduced) return;
      const rot = Math.max(-1.2, Math.min(1.2, d)) * -24;
      const scale = 1 - Math.min(ad, 1) * 0.14;
      card.style.transform = `perspective(1100px) rotateY(${rot.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      card.style.opacity = (1 - Math.min(ad, 1) * 0.38).toFixed(3);
      card.style.zIndex = String(10 - Math.round(ad * 5));
    });
    cards.forEach((c, i) => c.classList.toggle('is-active', i === active));
    dots.forEach((d, i) => {
      d.classList.toggle('is-active', i === active);
      d.setAttribute('aria-current', i === active ? 'true' : 'false');
    });
  };
  const request = () => { if (!raf) raf = requestAnimationFrame(update); };

  const centerOn = (i: number, smooth = true) => {
    const card = cards[i];
    if (!card) return;
    const left = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
    track.scrollTo({ left, behavior: smooth && !reduced ? 'smooth' : 'auto' });
  };

  track.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request, { passive: true });
  mq.addEventListener('change', () => { if (mq.matches) centerOn(1, false); request(); });
  dots.forEach((d, i) => d.addEventListener('click', () => centerOn(i)));

  // começa com o card do meio em destaque
  if (mq.matches) centerOn(1, false);
  request();
}
