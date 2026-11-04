# Base de Conhecimento do Projeto — Guedes.AI V2 (lguedes.com.br)

> Leia este arquivo antes de qualquer alteração. Responda sempre em **português do Brasil**.

## 1. Stack e infraestrutura

| Item | Detalhe |
|---|---|
| Site | **Astro 7** — SSG estático (`output: static`), pasta `site/` |
| Hospedagem | **Cloudflare Pages** — deploy automático a cada push na branch `main` |
| CMS | **Sanity** — pasta `cms/` (Studio: https://guedes-ai.sanity.studio, projectId `84rosfy5`, dataset `production`) |
| Repositório | https://github.com/substratodigital/lguedes (remote `origin`, branch `main`). Raiz git = `09_GUEDES_AI/`, o projeto fica em `v2/` |
| Produção | https://www.lguedes.com.br |

### Escopo do Sanity (IMPORTANTE)
- O Sanity é usado para:
  1. **Seção de artigos/publicações** (`site/src/components/Publicacoes.astro` via `getPublicacoesData()`). Tipos: `artigoPeriodico`, `congresso`, `livro`, `capitulo`, `premio`, `midia`, `artigoOpiniao`.
  2. **Página de links da bio do Instagram** (`/links` e redirect `/bio` via `getBioLinksData()`). Tipo: `linkBio`.
- Se o Sanity falhar ou vier vazio, o site usa os fallbacks estáticos em `site/src/data/publicacoes.ts` e `site/src/data/links.ts`. **Não quebrar esses fallbacks.**
- A página `/links` conta com renderização estática SSG + revalidação leve em segundo plano no cliente via Sanity CDN, permitindo atualizações imediatas de links sem necessidade de rebuild.
- Todo o resto do conteúdo (hero, bio, palestras, consultoria, galeria etc.) é **estático no código** (`site/src/i18n/translations.ts`, `site/src/data/*.ts`).
- Ao commitar mudanças no site, **não incluir** `cms/.sanity/` (cache) nem alterar `cms/` sem pedido explícito.

## 2. Comandos (Windows / PowerShell)
- O PowerShell bloqueia `npm.ps1` → usar **`npm.cmd`**.
- Dev: `cd site; npm.cmd run dev` · Build: `cd site; npm.cmd run build`
- Sempre rodar o build antes de push (a Cloudflare usa o mesmo build).
- Não versionar `fotosbrutas/` e `referencias/` (material bruto / vídeos de referência).

## 3. Design system
- **100% light mode**, editorial tech premium. Vanilla CSS com tokens (sem Tailwind).
- Fontes: Geist, GeistMono, GeistPixel. Cores: índigo `#4F46E5` (primária), teal `#0D9488`.
- Animações: GSAP 3 + ScrollTrigger, Canvas/SVG leves, pausadas fora da viewport.
- **REGRA PRIMORDIAL: NUNCA numerar nada a não ser que for solicitado explicitamente** (exceção única autorizada: a codificação dos produtos de consultoria `1.1` a `2.7`, que é a listagem oficial do PDF do professor). Em palestras, temas, pilares, seções, etapas, cards e headers: **não usar** 01, 02, 03...
- **REGRA DE BOTÕES / CTAs:** quando houver pares de botões de ação (ex.: Hero da oferta, CTAs principais), manter sempre a **mesma largura**, no desktop posicionados **lado a lado** (um ao lado do outro), sendo **um preenchido (`.btn`) e o outro vazado (`.btn-outline`)** para hierarquia e destaque elegante.
- **Logo e Tipografia:** o logo `GUEDES.AI` no header usa a fonte pixelada (`var(--font-pixel)` / `GeistPixel`), com o ponto em `#4F46E5`. O subtítulo do Hero fica em **uma única linha** no desktop (`max-width: 52ch`, sem quebras `\n` manuais).
- Ícones: `lucide-static` não tem mais ícones de marca → LinkedIn é um SVG customizado em `Icon.astro` (`CUSTOM_ICONS`).

## 4. Estrutura da home (`site/src/pages/index.astro` e `en/index.astro`)
Hero → Clientes → Bio → **Consultoria** → Palestras → **GaleriaEventos** → Trajetória → Publicações (Sanity) → Soluções → Depoimentos → Newsletter → ContatoFooter.

- Idiomas: PT (`/`) e EN (`/en/`). `Lang = 'pt' | 'en'` em `site/src/i18n/index.ts`.
- Menu: `translations.ts` → `nav.links`. O `Nav.astro` prefixa links `#…` com a home quando está em páginas internas e preserva a página atual no alternador de idioma PT/EN.

## 5. Consultoria
- Conteúdo PT/EN: `site/src/data/consultoria.ts` (origem: PDF "Portfólio de produtos de consultoria | Luís Guedes").
- Cards da home: `site/src/components/Consultoria.astro` (2 cards com micro-animações interativas e chips em coluna única).
- Página de oferta (template): `site/src/components/ConsultoriaOfferPage.astro` (15 diagramas esquemáticos SVG, método de atuação, rail sticky de produtos e CTA sincronizado com formulário).
- Rotas: `/consultoria/complexidade-organizacional`, `/consultoria/eficiencia-e-inteligencia`, `/en/consulting/organizational-complexity`, `/en/consulting/operational-efficiency-and-ai`.

## 6. Documentação & Histórico
- Registro detalhado da evolução disponível em [EVOLUCAO_E_HISTORICO_V2.md](file:///g:/00%20-%20CLIENTES/09_GUEDES_AI/v2/docs/EVOLUCAO_E_HISTORICO_V2.md).


## 6. Notas técnicas
- **Hero ASCII (`site/src/scripts/hero-ascii.ts`)**: shader WebGL. Não usar hash `sin(...)*43758` (estoura `mediump` em GPUs mobile e some no celular). No mobile o retrato é centralizado com `cx = w * 0.465`.
- **Galeria de eventos**: fotos padronizadas em `site/public/img/eventos/evento-XX.webp` (800×540). Novas fotos: converter para `.webp` no mesmo tamanho.
- **Footer**: só a foto `/img/guedes-formal.webp` grande, sem efeito ASCII e sem linha cinza.

