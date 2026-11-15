/**
 * Radar contínuo das "Formas de intervenção".
 * Um feixe gira continuamente; ao cruzar cada ponto, ele pulsa e abre o popup
 * com a forma de intervenção. Hover/foco pausa o feixe e fixa o ponto;
 * toque/clique fixa até tocar fora. Só anima quando visível.
 */
export function initRadar(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-radar]').forEach((radar) => {
    const sweep = radar.querySelector<HTMLElement>('[data-radar-sweep]');
    const blips = Array.from(radar.querySelectorAll<HTMLButtonElement>('[data-radar-blip]'));
    const pop = radar.querySelector<HTMLElement>('[data-radar-pop]');
    const popTitle = radar.querySelector<HTMLElement>('[data-pop-title]');
    const popPhase = radar.querySelector<HTMLElement>('[data-pop-phase]');
    const popDesc = radar.querySelector<HTMLElement>('[data-pop-desc]');
    const steps = Array.from(radar.querySelectorAll<HTMLButtonElement>('[data-radar-step]'));
    const scope = radar.querySelector<HTMLElement>('[data-radar-scope]');
    if (!sweep || !blips.length || !pop) return;

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const PERIOD = 11; // segundos por volta
    const angles = blips.map((b) => parseFloat(b.dataset.angle || '0'));
    let angle = 0;
    let paused = false;
    let pinned = false;
    let visible = false;
    let last = 0;
    let raf = 0;
    let active = -1;

    const activate = (i: number) => {
      if (i === active) return;
      active = i;
      const b = blips[i];
      blips.forEach((x, k) => x.classList.toggle('is-active', k === i));
      steps.forEach((x, k) => {
        x.classList.toggle('is-active', k === i);
        x.setAttribute('aria-pressed', k === i ? 'true' : 'false');
      });
      // reinicia o "ping"
      b.classList.remove('is-ping');
      void b.offsetWidth;
      b.classList.add('is-ping');

      if (popTitle) popTitle.textContent = b.dataset.title || '';
      if (popPhase) popPhase.textContent = b.dataset.phase || '';
      if (popDesc) popDesc.textContent = b.dataset.desc || '';
      // posiciona o popup para fora do ponto (acima na metade superior,
      // abaixo na inferior), centrado e preso aos limites do radar.
      // No mobile o CSS transforma o popup num cartão fixo abaixo do radar.
      const x = parseFloat(b.style.getPropertyValue('--x'));
      const y = parseFloat(b.style.getPropertyValue('--y'));
      const stage = pop.parentElement as HTMLElement;
      const sw = stage.clientWidth;
      const pw = pop.offsetWidth || 260;
      const cx = (x / 100) * sw;
      const left = Math.max(0, Math.min(sw - pw, cx - pw / 2));
      pop.style.setProperty('--px', `${left}px`);
      pop.style.setProperty('--py', `${y}%`);
      pop.dataset.vside = y < 50 ? 'up' : 'down';
      pop.classList.remove('is-in');
      void pop.offsetWidth;
      pop.classList.add('is-in');
    };

    const frame = (now: number) => {
      raf = 0;
      if (!visible) return;
      const dt = Math.min(0.05, (now - (last || now)) / 1000);
      last = now;
      if (!paused && !pinned) {
        const prev = angle;
        angle = (angle + (dt / PERIOD) * 360) % 360;
        // detecta o cruzamento do feixe com cada ponto
        angles.forEach((a, i) => {
          const crossed = prev <= angle ? a > prev && a <= angle : a > prev || a <= angle;
          if (crossed) activate(i);
        });
        sweep.style.transform = `rotate(${angle.toFixed(2)}deg)`;
      }
      raf = requestAnimationFrame(frame);
    };
    const start = () => { if (!raf && !reduced) { last = 0; raf = requestAnimationFrame(frame); } };

    const focusOn = (i: number, pin = false) => {
      paused = true;
      if (pin) pinned = true;
      angle = angles[i];
      sweep.style.transform = `rotate(${angle}deg)`;
      activate(i);
    };

    blips.forEach((b, i) => {
      b.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') focusOn(i); });
      b.addEventListener('focus', () => focusOn(i));
      b.addEventListener('click', () => focusOn(i, true));
    });
    steps.forEach((s, i) => {
      s.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') focusOn(i); });
      s.addEventListener('click', () => focusOn(i, true));
    });
    const area = scope || radar;
    area.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse' && !pinned) paused = false; });
    radar.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') { pinned = false; paused = false; } });
    document.addEventListener('pointerdown', (e) => {
      if (!radar.contains(e.target as Node)) { pinned = false; paused = false; }
    });

    new IntersectionObserver(
      ([en]) => {
        visible = en.isIntersecting;
        if (visible) start();
      },
      { threshold: 0.15 }
    ).observe(radar);

    activate(0);
    if (reduced) sweep.style.transform = `rotate(${angles[0]}deg)`;
  });
}
