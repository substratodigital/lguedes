/**
 * Hero ASCII — WebGL puro (sem Three.js / sem postprocessing).
 *
 * Princípios de performance:
 *  - 1 único draw call (triângulo full-screen + 1 fragment shader).
 *  - Renderiza SOB DEMANDA: só há frames durante a revelação inicial ou
 *    enquanto o mouse se move. Parado = 0% CPU/GPU.
 *  - Pausa fora da viewport (IntersectionObserver) e com aba oculta.
 *  - DPR limitado a 1.5; células maiores no mobile.
 *  - prefers-reduced-motion → 1 frame estático.
 */

const VERT = `
attribute vec2 aPos;
void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform sampler2D uImg;
uniform sampler2D uAtlas;
uniform vec2  uRes;
uniform float uCell;
uniform vec4  uRect;      // x, y, w, h (px, origem topo-esquerda)
uniform vec2  uMouse;     // px
uniform float uMouseAmt;  // 0..1
uniform float uTime;
uniform float uReveal;    // 0..1
uniform float uGlyphs;
uniform vec3  uInk;
uniform vec3  uAccent;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

void main(){
  vec2 px     = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  vec2 cell   = floor(px / uCell);
  vec2 center = (cell + 0.5) * uCell;
  vec2 local  = fract(px / uCell);

  vec2 uv = (center - uRect.xy) / uRect.zw;
  if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) discard;

  vec4  c   = texture2D(uImg, uv);
  float a   = c.a;
  float lum = dot(c.rgb, vec3(0.299, 0.587, 0.114));
  float h   = hash(cell);

  // Bordas se dissolvem em caracteres esparsos
  float vis = step(h, a * 1.25 - 0.1);
  if (vis < 0.5) discard;

  // Densidade = escuridão do pixel (fundo claro → tinta escura)
  float d  = clamp((1.0 - lum - 0.06) * 1.2, 0.0, 1.0);
  float gi = floor(d * (uGlyphs - 1.0) + 0.5);

  // Revelação: varredura de cima p/ baixo com ruído; fase "decodificando"
  float p = uReveal * 1.6 - (uv.y + h * 0.45);
  if (p < 0.0) discard;
  float decoding = 1.0 - step(0.22, p);

  // Interação do mouse: embaralha glifos e puxa para o índigo
  float md = length(center - uMouse);
  float m  = (1.0 - smoothstep(0.0, uCell * 16.0, md)) * uMouseAmt;
  float tick = floor(uTime * 14.0);
  float scr  = max(decoding, step(hash(cell + tick), m * 0.85));
  if (scr > 0.5) gi = 1.0 + floor(hash(cell * 1.7 + tick) * (uGlyphs - 1.0));

  vec2  auv = vec2((gi + local.x) / uGlyphs, local.y);
  float g   = texture2D(uAtlas, auv).a;

  float f   = clamp(smoothstep(0.25, 0.85, lum) * 0.9 + m + decoding * 0.6, 0.0, 1.0);
  vec3  col = mix(uInk, uAccent, f);
  float alpha = g * (0.55 + 0.45 * a);

  gl_FragColor = vec4(col * alpha, alpha);
}
`;

const GLYPHS = ' .:-=+*#%@';

type Opts = {
  src: string;
  /** Posição do centro horizontal da imagem (0..1) no desktop */
  anchorX?: number;
};

function hexToVec3(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function buildAtlas(size: number): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = size * GLYPHS.length;
  c.height = size;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `600 ${Math.round(size * 0.92)}px GeistMono, ui-monospace, monospace`;
  for (let i = 0; i < GLYPHS.length; i++) ctx.fillText(GLYPHS[i], i * size + size / 2, size * 0.54);
  return c;
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'shader');
  return s;
}

function texture(gl: WebGLRenderingContext, source: TexImageSource, unit: number) {
  const tex = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return tex;
}

export async function initHeroAscii(canvas: HTMLCanvasElement, opts: Opts) {
  const gl = canvas.getContext('webgl', {
    alpha: true, antialias: false, premultipliedAlpha: true,
    depth: false, stencil: false, powerPreference: 'low-power',
  });
  if (!gl) return null;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Carrega imagem e fonte em paralelo
  const img = new Image();
  img.decoding = 'async';
  img.src = opts.src;
  await Promise.all([
    img.decode(),
    document.fonts?.load('600 40px GeistMono').catch(() => null),
  ]);

  // Programa
  const prog = gl.createProgram()!;
  gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'aPos');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  texture(gl, img, 0);
  texture(gl, buildAtlas(64), 1);

  const U = (n: string) => gl.getUniformLocation(prog, n);
  const u = {
    img: U('uImg'), atlas: U('uAtlas'), res: U('uRes'), cell: U('uCell'), rect: U('uRect'),
    mouse: U('uMouse'), mouseAmt: U('uMouseAmt'), time: U('uTime'), reveal: U('uReveal'),
    glyphs: U('uGlyphs'), ink: U('uInk'), accent: U('uAccent'),
  };
  gl.uniform1i(u.img, 0);
  gl.uniform1i(u.atlas, 1);
  gl.uniform1f(u.glyphs, GLYPHS.length);
  gl.uniform3fv(u.ink, hexToVec3('#14141F'));
  gl.uniform3fv(u.accent, hexToVec3('#4F46E5'));
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);

  // Estado
  const state = {
    reveal: reduced ? 1 : 0,
    mx: -9999, my: -9999, tx: -9999, ty: -9999,
    mouseAmt: 0, lastMove: 0,
    px: 0, ppx: 0, // parallax
    visible: true,
    dpr: 1, w: 0, h: 0,
  };
  const aspect = img.naturalWidth / img.naturalHeight;

  function layout() {
    const r = canvas.getBoundingClientRect();
    state.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    state.w = Math.max(1, Math.round(r.width * state.dpr));
    state.h = Math.max(1, Math.round(r.height * state.dpr));
    canvas.width = state.w;
    canvas.height = state.h;
    gl!.viewport(0, 0, state.w, state.h);
    gl!.uniform2f(u.res, state.w, state.h);
    const mobile = r.width < 768;
    gl!.uniform1f(u.cell, (mobile ? 6 : 8) * state.dpr);
  }

  function rect(): [number, number, number, number] {
    const { w, h } = state;
    const mobile = w / state.dpr < 768;
    let ih = mobile ? h * 0.62 : h * 0.94;
    let iw = ih * aspect;
    if (iw > w * (mobile ? 1.05 : 0.6)) { iw = w * (mobile ? 1.05 : 0.6); ih = iw / aspect; }
    const cx = mobile ? w / 2 : w * (opts.anchorX ?? 0.66);
    const x = cx - iw / 2 + state.ppx * state.dpr;
    const y = mobile ? h * 0.06 : h - ih;
    return [x, y, iw, ih];
  }

  let raf = 0;
  function frame(now: number) {
    raf = 0;
    if (!state.visible) return;

    // Suaviza mouse e parallax
    state.mx += (state.tx - state.mx) * 0.18;
    state.my += (state.ty - state.my) * 0.18;
    const idle = now - state.lastMove > 140;
    const targetAmt = idle ? 0 : 1;
    state.mouseAmt += (targetAmt - state.mouseAmt) * (idle ? 0.06 : 0.2);
    state.ppx += (state.px - state.ppx) * 0.08;

    gl!.clear(gl!.COLOR_BUFFER_BIT);
    gl!.uniform4fv(u.rect, rect());
    gl!.uniform2f(u.mouse, state.mx * state.dpr, state.my * state.dpr);
    gl!.uniform1f(u.mouseAmt, state.mouseAmt);
    gl!.uniform1f(u.time, now / 1000);
    gl!.uniform1f(u.reveal, state.reveal);
    gl!.drawArrays(gl!.TRIANGLES, 0, 3);

    const settling = state.mouseAmt > 0.01 || Math.abs(state.px - state.ppx) > 0.1 || state.reveal < 1;
    if (settling) request();
  }
  function request() { if (!raf && state.visible) raf = requestAnimationFrame(frame); }

  layout();
  request();

  // Resize
  let rT = 0;
  new ResizeObserver(() => { clearTimeout(rT); rT = window.setTimeout(() => { layout(); request(); }, 80); }).observe(canvas);

  // Visibilidade
  new IntersectionObserver(([e]) => { state.visible = e.isIntersecting; if (state.visible) request(); }).observe(canvas);
  document.addEventListener('visibilitychange', () => { state.visible = !document.hidden; if (state.visible) request(); });

  // Mouse (só desktop com ponteiro fino)
  if (finePointer && !reduced) {
    const host = canvas.parentElement!;
    host.addEventListener('pointermove', (e) => {
      const r = canvas.getBoundingClientRect();
      state.tx = e.clientX - r.left;
      state.ty = e.clientY - r.top;
      if (state.mx < -999) { state.mx = state.tx; state.my = state.ty; }
      state.px = ((e.clientX / r.width) - 0.5) * -18;
      state.lastMove = performance.now();
      request();
    }, { passive: true });
    host.addEventListener('pointerleave', () => { state.px = 0; request(); });
  }

  return {
    /** Controlado pelo GSAP na timeline de entrada */
    setReveal(v: number) { state.reveal = v; request(); },
    get reduced() { return reduced; },
  };
}
