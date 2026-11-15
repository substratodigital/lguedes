/**
 * Hero Point-Cloud / Dots — WebGL puro (sem Three.js / sem postprocessing).
 *
 * Inspirado nas referências de v3-ajustes (ref_hero-01 a ref_hero-04):
 *  - Retrato em matriz densa de pontos circulares (halftone / point-cloud)
 *    com alta definição facial ("imagem mais clara") e dissolução orgânica
 *    em partículas nas bordas.
 *  - 1 único draw call (triângulo full-screen + 1 fragment shader).
 *  - Renderiza SOB DEMANDA: só há frames durante a revelação inicial ou
 *    enquanto o mouse se move. Parado = 0% CPU/GPU.
 *  - Pausa fora da viewport (IntersectionObserver) e com aba oculta.
 */

const VERT = `
attribute vec2 aPos;
void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform sampler2D uImg;
uniform vec2  uRes;
uniform float uCell;
uniform vec4  uRect;      // x, y, w, h (px, origem topo-esquerda)
uniform vec2  uMouse;     // px
uniform float uMouseAmt;  // 0..1
uniform float uTime;
uniform float uReveal;    // 0..1
uniform vec3  uInk;
uniform vec3  uAccent;
uniform vec3  uTeal;

// Hash estável sem sin() para evitar overflow de mediump (fp16) em GPUs mobile
float hash(vec2 p){
  vec2 p2 = fract(p * vec2(0.1031, 0.1030));
  p2 += dot(p2, p2.yx + 33.33);
  return fract((p2.x + p2.y) * p2.x);
}

vec2 hash2(vec2 p){
  return vec2(hash(p), hash(p + vec2(17.13, 41.97)));
}

void main(){
  vec2 px     = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  vec2 cell   = floor(px / uCell);
  vec2 center = (cell + 0.5) * uCell;
  vec2 local  = fract(px / uCell) - 0.5;

  // Coordenada normalizada dentro do retângulo do retrato
  vec2 uv = (center - uRect.xy) / uRect.zw;

  // Margem extra ao redor para partículas dispersas (point cloud halo)
  if (uv.x < -0.08 || uv.y < -0.05 || uv.x > 1.08 || uv.y > 1.04) discard;

  vec2 uvClamped = clamp(uv, 0.0, 1.0);
  vec2 pxUv      = clamp((px - uRect.xy) / uRect.zw, 0.0, 1.0);

  vec4 cCell = texture2D(uImg, uvClamped);
  vec4 cFine = texture2D(uImg, pxUv);

  float a     = cCell.a;
  float aFine = cFine.a;
  vec2  rnd   = hash2(cell);
  float h     = rnd.x;

  // Fora da silhueta: cria partículas esparsas que se dissolvem no ar (estilo ref_hero-01/02)
  float distEdge = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
  float inBounds = step(0.0, distEdge);
  float edgeScatter = smoothstep(0.0, 0.45, a) * inBounds;

  // Halo de partículas ao redor dos ombros/cabeça
  vec2 headCenter = vec2(0.52, 0.44);
  float radialDist = length((uv - headCenter) * vec2(1.15, 0.95));
  float haloProb = smoothstep(0.58, 0.22, radialDist) * 0.16;

  float visProb = max(edgeScatter * 1.18, haloProb);
  if (h > visProb) discard;

  // Revelação progressiva em nuvem de pontos (de cima p/ baixo com dispersão)
  float revFront = uReveal * 1.48 - (uv.y * 0.85 + h * 0.38);
  if (revFront < 0.0) discard;
  float assembling = 1.0 - smoothstep(0.0, 0.26, revFront);

  // Luminância corrigida para deixar o rosto mais claro, nítido e reconhecível
  float lumCell = dot(cCell.rgb, vec3(0.299, 0.587, 0.114));
  float lumFine = dot(cFine.rgb, vec3(0.299, 0.587, 0.114));

  // Curva de brilho suave que valoriza os meios-tons do rosto ("imagem mais clara")
  float brightCell = pow(clamp(lumCell * 1.14 + 0.04, 0.0, 1.0), 0.82);
  float brightFine = pow(clamp(lumFine * 1.14 + 0.04, 0.0, 1.0), 0.82);

  // Densidade tonal para o tamanho do dot (áreas escuras = dots maiores; luz = micro-dots)
  float darkness = clamp(1.0 - brightCell, 0.0, 1.0);

  // Interação com o cursor: ondas de dispersão e destaque nos pontos
  float md = length(center - uMouse);
  float m  = (1.0 - smoothstep(0.0, uCell * 18.0, md)) * uMouseAmt;

  // Leve jitter orgânico nas bordas, durante a revelação ou sob o mouse
  float borderFactor = 1.0 - smoothstep(0.2, 0.88, a);
  vec2 jitter = (rnd - 0.5) * (borderFactor * 0.34 + assembling * 0.42 + m * 0.28);
  float distDot = length(local - jitter);

  // Raio do dot: pontos sempre presentes no retrato para formar a malha point-cloud
  float baseRadius = mix(0.15, 0.46, pow(darkness, 0.88));
  // Partículas do halo externo são micro-pontos delicados
  if (a < 0.15) {
    baseRadius = mix(0.11, 0.24, rnd.y);
  }
  float radius = baseRadius * (1.0 + m * 0.18 - assembling * 0.2);

  float aa = max(0.045, 0.85 / uCell);
  float dotMask = 1.0 - smoothstep(radius - aa, radius + aa, distDot);

  // Camada contínua sutil sob os dots no núcleo do rosto para nitidez imediata da expressão
  float coreClarity = smoothstep(0.45, 0.95, aFine) * (1.0 - darkness * 0.35);
  float subtlePhoto = (1.0 - brightFine) * 0.28 * coreClarity;

  // Cor dos pontos: combina tinta escura editorial, índigo vibrante nos meios-tons/highlights e pontos de dados
  float accentMix = clamp(smoothstep(0.22, 0.78, brightCell) * 0.68 + m * 0.65 + assembling * 0.55, 0.0, 1.0);
  vec3 dotColor = mix(uInk, uAccent, accentMix);

  // Alguns micro-pontos de telemetria em teal/índigo no halo (estilo ref_hero-02/03)
  if (h > 0.94 && (a < 0.55 || m > 0.2)) {
    dotColor = mix(uAccent, uTeal, step(0.5, rnd.y));
  }

  // Alpha final combinando os dots circulares nítidos + base de clareza facial
  float dotAlpha = dotMask * mix(0.38, 0.96, darkness) * clamp(a * 1.15 + 0.25, 0.0, 1.0);
  if (a < 0.15) {
    dotAlpha = dotMask * 0.45 * (1.0 - assembling);
  }

  float finalAlpha = clamp(max(dotAlpha, subtlePhoto), 0.0, 1.0);
  if (finalAlpha < 0.01) discard;

  vec3 finalColor = mix(dotColor, mix(uInk, uAccent, 0.25), subtlePhoto * 0.5);
  gl_FragColor = vec4(finalColor * finalAlpha, finalAlpha);
}
`;

type Opts = {
  src: string;
  /** Posição do centro horizontal da imagem (0..1) no desktop */
  anchorX?: number;
};

function hexToVec3(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
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
  const glOpts: WebGLContextAttributes = {
    alpha: true, antialias: false, premultipliedAlpha: true,
    depth: false, stencil: false,
  };
  const gl = (
    canvas.getContext('webgl', glOpts) ||
    canvas.getContext('experimental-webgl', glOpts)
  ) as WebGLRenderingContext | null;
  if (!gl) return null;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Carrega imagem de forma resiliente no mobile (onload + decode opcional)
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.decoding = 'async';
  const imgReady = new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('hero-img'));
    img.src = opts.src;
    if (img.complete && img.naturalWidth > 0) resolve();
  }).then(() => (img.decode ? img.decode().catch(() => null) : null));

  await imgReady;

  // Programa WebGL
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

  const U = (n: string) => gl.getUniformLocation(prog, n);
  const u = {
    img: U('uImg'), res: U('uRes'), cell: U('uCell'), rect: U('uRect'),
    mouse: U('uMouse'), mouseAmt: U('uMouseAmt'), time: U('uTime'), reveal: U('uReveal'),
    ink: U('uInk'), accent: U('uAccent'), teal: U('uTeal'),
  };
  gl.uniform1i(u.img, 0);
  gl.uniform3fv(u.ink, hexToVec3('#14141F'));
  gl.uniform3fv(u.accent, hexToVec3('#4F46E5'));
  gl.uniform3fv(u.teal, hexToVec3('#0D9488'));
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
    state.dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    state.w = Math.max(1, Math.round(r.width * state.dpr));
    state.h = Math.max(1, Math.round(r.height * state.dpr));
    canvas.width = state.w;
    canvas.height = state.h;
    gl!.viewport(0, 0, state.w, state.h);
    gl!.uniform2f(u.res, state.w, state.h);
    const mobile = window.innerWidth < 768;
    // Grade fina de pontos (dots) para alta nitidez fisionômica
    gl!.uniform1f(u.cell, (mobile ? 3.8 : 4.4) * state.dpr);
  }

  function rect(): [number, number, number, number] {
    const { w, h } = state;
    const mobile = window.innerWidth < 768;
    if (mobile) {
      // Mobile: retrato amplo na largura, ancorado no topo; a parte inferior
      // da imagem é cortada pela altura do palco (mais rosto, menos altura).
      const iwM = w * 1.12;
      const ihM = iwM / aspect;
      const xM = w * 0.47 - iwM / 2;
      const yM = h * 0.015;
      return [xM, yM, iwM, ihM];
    }
    let ih = h * 0.94;
    let iw = ih * aspect;
    if (iw > w * (mobile ? 0.96 : 0.6)) {
      iw = w * (mobile ? 0.96 : 0.6);
      ih = iw / aspect;
    }
    const cx = mobile ? w * 0.465 : w * (opts.anchorX ?? 0.68);
    const x = cx - iw / 2 + state.ppx * state.dpr;
    const y = mobile ? (h - ih) * 0.5 : h - ih;
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

  // Mouse e toque (desktop e mobile)
  if (!reduced) {
    const host = canvas.parentElement!;
    host.addEventListener('pointermove', (e) => {
      const r = canvas.getBoundingClientRect();
      state.tx = e.clientX - r.left;
      state.ty = e.clientY - r.top;
      if (state.mx < -999) { state.mx = state.tx; state.my = state.ty; }
      if (finePointer) state.px = ((e.clientX / r.width) - 0.5) * -18;
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
