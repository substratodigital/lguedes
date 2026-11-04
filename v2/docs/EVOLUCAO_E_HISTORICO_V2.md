# Histórico de Evolução — Sessão 04/11/2026 (Guedes.AI V2)

> Registro consolidado de todas as implementações, correções, aprendizados técnicos e regras de design estabelecidas na sessão de 04 de novembro de 2026.

---

## 1. O que foi implementado e entregue

### 1.1 Hero (`Hero.astro` & `hero-ascii.ts`)
- **Alinhamento vertical:** conteúdo centralizado perfeitamente na viewport no desktop (`align-items: center`), corrigindo o alinhamento que ficava muito baixo.
- **Correção da animação ASCII no mobile:**
  - O shader WebGL falhava em GPUs móveis porque a função pseudo-aleatória clássica `fract(sin(...) * 43758.5453)` estourava a precisão de ponto flutuante `mediump` (16 bits), gerando `NaN`/`Inf` e descartando 100% dos pixels no fragment shader.
  - Implementado hash sem seno (`fract(p * vec2(0.1031, 0.1030))...`), declarada precisão alta condicional (`#ifdef GL_FRAGMENT_PRECISION_HIGH precision highp float; #endif`) e fallback para `experimental-webgl`.
  - Retrato do professor centralizado no celular com compensação de centro visual (`cx = w * 0.465`).
- **Remoção de estatísticas:** removida a linha de texto `"+100 palestras +30 anos +5 países"` da hero.
- **Tipografia do subtítulo:** a frase *"Especialista em estratégia, inovação e ESG"* agora renderiza em **linha única contínua no desktop** (`max-width: 52ch`, sem quebras forçadas de `\n`), mantendo quebra fluida e centralizada no mobile.

### 1.2 Header / Navegação (`Nav.astro` & `Icon.astro`)
- **Ícone do LinkedIn corrigido:** a biblioteca `lucide-static` removeu ícones de marcas; adicionado vetor SVG inline oficial em `CUSTOM_ICONS.Linkedin` dentro de `Icon.astro`.
- **Logo `GUEDES.AI` padronizado:** header atualizado com a tipografia oficial pixelada (`var(--font-pixel)` / `GeistPixel`), alinhada ao design editorial do projeto.
- **Menu atualizado:** inserido o item `"Consultoria"` (EN: `"Consulting"`) imediatamente após `"Sobre"`.
- **Navegação inteligente:** links com âncora (`#...`) prefixam a home automaticamente quando o usuário está navegando em páginas internas de ofertas.
- **Seletor de idioma:** botão PT/EN preserva a página atual, alternando entre a oferta em português e a respectiva oferta traduzida em inglês.

### 1.3 Nova Seção "Consultoria" na Home (`Consultoria.astro` & `consultoria.ts`)
- Localizada na home logo após a Bio e antes de Palestras.
- **2 cards com micro-interações ultra-minimalistas** baseadas no cursor do usuário:
  - **Card 01:** *"Produtos que enfrentam a complexidade crescente das organizações"* (Eixo de Arquitetura, Estratégia e Governança). Animação de planos isométricos com nós que transitam de dispersão orgânica para matriz de governança ordenada.
  - **Card 02:** *"Produtos que ampliam a eficiência operacional e a inteligência aplicada aos negócios"* (Eixo de Eficiência, Riscos e IA). Animação de barras de frequência com spline contínua preditiva e retículo HUD interativo.
- **Identificação minimalista no mesmo canto da animação:**
  - Card 1: `arquitetura e governança`
  - Card 2: `eficiência e IA aplicada`
- **Listagem de soluções:** cada card lista suas atividades oficiais em **coluna única vertical perfeitamente alinhada**, permitindo navegação direta para a âncora do produto.
- Removidos números arbitrários como `01 - Eixo 01`, `02 - Eixo 02`, `08 produtos`, tags fictícias e coordenadas HUD dispersas.

### 1.4 4 Páginas Dedicadas de Ofertas (`ConsultoriaOfferPage.astro`)
Criadas as rotas estáticas em PT e EN destrinchando todas as 15 soluções do PDF oficial do professor:
- `/consultoria/complexidade-organizacional` (Produtos 1.1 a 1.8)
- `/consultoria/eficiencia-e-inteligencia` (Produtos 2.1 a 2.7)
- `/en/consulting/organizational-complexity` (Products 1.1 to 1.8)
- `/en/consulting/operational-efficiency-and-ai` (Products 2.1 to 2.7)

**Estrutura de cada página de oferta:**
- Hero com tese executiva, citação do Prof. Dr. Luís Guedes e blueprint arquitetural interativo.
- Seção de metodologia com os 3 pilares de atuação.
- Rail lateral sticky para navegação rápida entre os produtos com destaque via `IntersectionObserver`.
- Cards de produtos detalhados contendo:
  - Diagrama esquemático minimalista em SVG individual para cada solução (15 diagramas vetoriais criados).
  - Número oficial (`1.1` a `2.7`), título e tag temática.
  - "Quando acionar" (desafio do cliente).
  - "Entregáveis centrais" (lista de outputs tangíveis).
  - "Captura de valor" (impacto e ROI).
  - Botão de solicitação rápida que preenche automaticamente o campo "Consultoria" no formulário de contato.
- Banner de cross-linking conectando um eixo ao outro.

### 1.5 Galeria de Fotos em Eventos (`GaleriaEventos.astro`)
- 16 fotos brutas originais de `fotosbrutas/` tratadas, corrigidas de orientação/rotação e convertidas para `.webp` de alta fidelidade e baixo peso (`site/public/img/eventos/evento-01.webp` a `evento-16.webp`, 800×540).
- 2 fileiras infinitas contínuas rodando em direções opostas, com desaceleração suave ao passar o cursor (hover) e suporte a arraste/drag no mouse e touch.

### 1.6 Palestras / "Temas para Contratação" (`Palestras.astro`)
- Removidas todas as numerações arbitrárias (`01`, `02`, `03` nas abas e prefixos `01 /` no topo dos painéis), mantendo o foco limpo nos títulos dos temas e seus badges.

### 1.7 Rodapé (`ContatoFooter.astro`)
- Removido efeito ASCII e máscara circular de hover do retrato; mantida a foto oficial do professor grande (`/img/guedes-formal.webp`) com acabamento nítido e elegante.
- Removidas as linhas divisórias cinzas horizontais.

---

## 2. Regras Fundamentais de Design System Consolidadas

1. **REGRA PRIMORDIAL DE NUMERAÇÃO:**
   - **NUNCA numerar nada a não ser que for solicitado explicitamente pelo cliente.**
   - Não usar "01, 02, 03..." em palestras, temas, pilares, seções, etapas, cards e headers.
   - **Única exceção autorizada:** a codificação dos produtos de consultoria `1.1` a `2.7`, pois reflete a indexação oficial do PDF de portfólio do professor.

2. **REGRA DE BOTÕES / CTAs:**
   - Em pares de ações (ex.: Hero da página de oferta, CTAs principais):
     - Mesma largura padronizada (`min-width: 280px` no desktop, `100%` no mobile).
     - No desktop, sempre posicionados **lado a lado**.
     - Hierarquia elegante: **um preenchido (`.btn`) e o outro vazado (`.btn-outline`)**.

3. **PALETA & TIPOGRAFIA:**
   - 100% Light Mode.
   - Primária: Índigo `#4F46E5`, Secundária/Destaque: Teal `#0D9488`.
   - Fontes: `Geist` (Sans base), `GeistMono` (dados/telemetria/código), `GeistPixel` (logo, títulos de impacto e badges de acento).

---

## 3. Infraestrutura & Boas Práticas

| Item | Regra |
|---|---|
| **Deploy** | Cloudflare Pages automático via push na branch `main` do repositório `substratodigital/lguedes`. |
| **Build** | Sempre rodar `cd site; npm.cmd run build` antes de qualquer commit. O build estático deve gerar 6 rotas sem erros. |
| **PowerShell** | Usar sempre **`npm.cmd`** (o PowerShell bloqueia scripts `.ps1` por padrão). |
| **Sanity CMS** | Restrito **exclusivamente à seção de artigos/publicações** (`Publicacoes.astro`). Possui fallback estático em `src/data/publicacoes.ts` que nunca deve ser quebrado. Nunca commitar pasta `cms/.sanity/`. |
| **Assets brutos** | Pastas `fotosbrutas/` e `referencias/` não são versionadas. |

---

## 4. Próximos Passos Sugeridos para Sessões Futuras

1. **Validação visual com o cliente:**
   - Coletar feedback do Prof. Dr. Luís Guedes sobre os textos e argumentos das páginas de consultoria.
   - Conferir se os números da bio (ex: 30+ anos, 40+ clientes, 19 prêmios) permanecem atualizados.
2. **Integração do formulário:**
   - Conferir se o webhook/endpoint de envio de e-mail do formulário de contato (`cf-form`) está configurado no ambiente de produção da Cloudflare.
3. **SEO & Metadados:**
   - Avaliar a inclusão de OpenGraph tags customizadas para as 4 novas páginas de consultoria.
