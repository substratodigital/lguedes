# Diretrizes para Claude / Agentes de IA — Guedes.AI V2

> Responda SEMPRE em **português do Brasil**.
> Leia atentamente os arquivos [`AGENTS.md`](./AGENTS.md) e [`docs/EVOLUCAO_E_HISTORICO_V2.md`](./docs/EVOLUCAO_E_HISTORICO_V2.md) antes de qualquer modificação.

---

## 1. Visão Geral da Stack & Repositório
- **Site:** Astro 7 SSG estático (`output: 'static'`) localizado em `site/`.
- **Hospedagem:** Cloudflare Pages com deploy automático a cada push na branch `main`.
- **Repositório:** `https://github.com/substratodigital/lguedes` (raiz git em `09_GUEDES_AI/`, projeto ativo na pasta `v2/`).
- **CMS:** Sanity Studio hospedado em `https://guedes-ai.sanity.studio` (código em `cms/`, projectId `84rosfy5`, dataset `production`).
  - Usado para:
    1. **Publicações / Artigos** (`site/src/components/Publicacoes.astro`).
    2. **Links da Bio do Instagram** (`site/src/pages/links.astro` e redirect `/bio` via tipo `linkBio`).
  - Fallbacks estáticos obrigatórios: `site/src/data/publicacoes.ts` e `site/src/data/links.ts` (nunca quebrar).
  - O resto do site é 100% estático em código (`site/src/data/*.ts`, `site/src/i18n/translations.ts`).

---

## 2. Comandos no Windows / PowerShell
- O PowerShell bloqueia `npm.ps1` por padrão. **Sempre use `npm.cmd`**.
- Dev do site: `cd site; npm.cmd run dev`
- Build do site: `cd site; npm.cmd run build` (deve gerar 8 rotas estáticas com código 0).
- Deploy do Sanity Studio: `cd cms; npm.cmd run deploy`
- Nunca versionar pastas brutas `fotosbrutas/`, `referencias/` nem o cache `cms/.sanity/`.

---

## 3. Regras Primordiais de Design System
1. **NUNCA NUMERAR NADA A NÃO SER QUE FOR SOLICITADO:**
   - Proibido adicionar `01`, `02`, `03...` em títulos, seções, etapas, cards, abas ou temas.
   - **Única exceção permitida:** a codificação oficial dos produtos de consultoria (`1.1` a `2.7`), extraída do PDF de portfólio do professor.
2. **PADRÃO DE CTAs / BOTÕES DUPLOS:**
   - Quando houver botões em dupla (ex.: Hero da oferta, CTAs principais):
     - Mesma largura padronizada (`min-width: 280px` no desktop, `100%` no mobile).
     - No desktop, sempre posicionados **lado a lado**.
     - Hierarquia visual: **um preenchido (`.btn`) e o outro vazado (`.btn-outline`)**.
3. **IDENTIDADE VISUAL:**
   - 100% Light mode, editorial tech refinado.
   - Cores: Índigo `#4F46E5` (primária), Teal `#0D9488` (secundária/dados).
   - Tipografia: `Geist` (sans base), `GeistMono` (dados/telemetria), `GeistPixel` (logo `GUEDES.AI` e badges de destaque).
   - Subtítulo da Hero: Uma única linha no desktop (`max-width: 52ch`).

---

## 4. Estrutura de Rotas Ativas (8 páginas SSG)
- `/` — Home (PT)
- `/en/` — Home (EN)
- `/consultoria/complexidade-organizacional` — Eixo 1 de Consultoria (PT)
- `/consultoria/eficiencia-e-inteligencia` — Eixo 2 de Consultoria (PT)
- `/en/consulting/organizational-complexity` — Consulting Pillar 1 (EN)
- `/en/consulting/operational-efficiency-and-ai` — Consulting Pillar 2 (EN)
- `/links` — Página de links da bio estilo Linktree (mobile-first, integrada ao Sanity com revalidação ao vivo)
- `/bio` — Redirecionamento instantâneo para `/links`
