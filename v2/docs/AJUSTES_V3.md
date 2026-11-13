# Registro de Ajustes Implementados — V3 (`https://lguedes.com.br/`)

**Data da sessão:** 13/11/2026  
**Commit de produção (`origin/main`):** `451655e` — `feat(v3): aplica ajustes da reuniao V3 (hero dots, mini bio + lattes, consultoria estrategica, publicacoes e sync Sanity em tempo real)`

---

## 1. Correção Definitiva do Sanity CMS (Livros, Artigos e Publicações)

### Diagnóstico do problema
1. O livro **"Prompts para Contabilidade"** (2025, E-book) estava publicado no Sanity Studio (`84rosfy5` / dataset `production`, `_id: a41eee87-5c39-421d-a7e8-2ccf79629ba3`), mas a página `https://lguedes.com.br/` buscava dados do Sanity apenas no momento do build estático (SSG) com `useCdn: true`.
2. Quando havia apenas 1 livro cadastrado no Sanity, a expressão anterior `res?.livros?.length ? res.livros : LIVROS` substituía toda a lista estática em vez de mesclar os registros.
3. Os demais 150 itens do site ainda não estavam cadastrados no dataset `production` do Sanity Studio.

### Soluções implementadas
- **Sincronização em Tempo Real no Navegador (`Publicacoes.astro`)**:
  - Adicionada a função `refreshPublicacoesFromSanity()` no cliente, que consulta diretamente a API do Sanity (`useCdn: false`) ao abrir a página e insere imediatamente qualquer novo livro, artigo científico ou entrevista publicado no Sanity Studio, sem precisar aguardar novo build/deploy.
- **Merge Inteligente no Build (`v2/site/src/lib/sanity.ts`)**:
  - Alterado `useCdn: false` para garantir dados frescos em todo build.
  - Criadas as funções `mergeWithStatic()` e `mergeStrings()` para combinar os documentos vindos do Sanity com o acervo estático sem perder nenhum registro.
- **População Completa do Sanity Studio (`84rosfy5/production`)**:
  - Sincronizados **151 documentos** no Sanity (`artigoPeriodico`, `congresso`, `livro`, `capitulo`, `premio`, `midia`, `artigoOpiniao`), preservando o documento original de *"Prompts para Contabilidade"*.
- **Evolução dos Schemas (`v2/cms/schemas.ts`)**:
  - Adicionado campo de upload de **Imagem da Capa (`capa`)** em `livroSchema`.
  - Adicionado campo de **URL (`url`)** em `congressoSchema` e `capituloSchema`.

---

## 2. Nova Hero Section (Retrato em Point-Cloud / Dots + Tipografia Executiva)

- **Shader WebGL Point-Cloud / Halftone Dots (`v2/site/src/scripts/hero-ascii.ts`)**:
  - Substituído o shader escuro de caracteres ASCII por uma matriz de **pontos circulares de alta definição** inspirada nas referências `v3-ajustes/primeiros ajustes/ref_hero-01.jpg` a `ref_hero-04.jpeg`.
  - Curva de luminância recalibrada (`pow(rawLum, 0.78)` + ganho de meios-tons faciais) para deixar o rosto do Prof. Luís Guedes mais claro, nítido e imediatamente reconhecível.
  - Halo orgânico de partículas nas bordas e interação suave com o cursor.
- **Tipografia do Nome "Luís Guedes" (`v2/site/src/components/Hero.astro`)**:
  - Removida a fonte pixelada (`GeistPixel` / `.font-pixel`) do título principal `Luís Guedes`, substituída pela tipografia executiva limpa (`Geist`, `font-weight: 700`).
- **Novo Posicionamento e CTAs (`Hero.astro` + `translations.ts`)**:
  - Removida a menção a ESG.
  - Adicionados os chips dos 4 pilares: **Estratégia · IA · Transformação Organizacional · Execução**.
  - Subtítulo atualizado: *"Apoio empresas e suas lideranças a transformar mudanças estratégicas e tecnológicas em decisões, prioridades, capacidades organizacionais, modelos de gestão e execução inteligente."*
  - Botões pareados com mesma largura e altura: **`Converse sobre um desafio`** e **`Consultoria Estratégica`**.

---

## 3. Seção Sobre / Bio (`Mini Bio` + `Currículo Lattes` Lado a Lado)

- **Botões Pareados (`v2/site/src/components/Bio.astro`)**:
  - O botão de abertura do modal foi renomeado de `+ BIO COMPLETA` para **`Mini Bio`**.
  - Ao lado dele foi posicionado o botão **`Currículo Lattes`** (`http://lattes.cnpq.br/3044172197355296`), ambos com **exatamente a mesma largura e altura** (`width: 220px; height: 3.1rem`), lado a lado no desktop.
- **Posicionamento e Callout de Alta Complexidade (`Bio.astro` + `translations.ts`)**:
  - Nova citação em destaque: *"Estratégia e tecnologia criam valor sustentável quando a organização as executa de forma inteligente e humana."*
  - Novo bloco **"Experiência em ambientes de alta complexidade"**: *"Minha prática combina projetos em grandes empresas e organizações públicas de alta complexidade. Essa experiência é particularmente relevante para organizações reguladas, intensivas em tecnologia ou com múltiplos stakeholders, nas quais estratégia, governança e execução precisam avançar simultaneamente."*
  - Texto do modal da `Mini Bio` revisado contemplando os 2 livros publicados e a atuação na FIA Business School, IstoÉ Dinheiro, Fast Company Brasil e ABNT.

---

## 4. Reposicionamento da Consultoria Estratégica (`Consultoria.astro` + `consultoria.ts`)

- **Proposta de Valor Central**: foco no setor privado como mercado prioritário e experiência no setor público como prova de capacidade em ambientes regulados e de alta complexidade.
- **3 Territórios Principais**:
  1. **Estratégia & Execução**: Planejamento estratégico da intenção à execução técnica, governança da execução e *Strategy Execution Sprint*.
  2. **IA & Transformação**: *AI Adoption & Value Diagnostic*, portfólio de casos de uso, business case e acompanhamento da geração de valor, governança e *operating model* de IA + programa executivo **"Da experimentação ao valor"** em parceria com a **FIA Business School**.
  3. **Organização & Liderança**: Modelo de gestão, governança da decisão, incentivos, papéis e responsabilidades, governança corporativa e compliance, capacidades organizacionais e desenvolvimento de lideranças.
- **6 Formas de Intervenção**: Diagnóstico & Advisory, Sprint, Projeto Estruturante, Programa Executivo, Workshop, Guidance & Operação Assistida.
- **Como Comprar & Como Atuamos**:
  - Explicação clara de entrada modular (*"Nem todo problema exige começar por um grande projeto..."*).
  - Trilha de atuação: `Diagnóstico → Estruturação → Implementação → Transferência de conhecimento para as equipes`.
  - Trilha de contratação: `Executive Session → Workshop → Diagnóstico & Advisory → Sprint → Projeto → Operação Assistida`.
- **Experiência Selecionada em Consultoria (3 Mini-Cases)**:
  - Cases executivos nos 3 territórios (*Estratégia & Execução*, *IA & Transformação* e *Organização & Liderança*) apresentando Tipo de Problema, Desafios e Especificidades, Projeto Realizado e Resultados Obtidos.
- **Práticas Adjacentes (`v2/site/src/components/Solucoes.astro`)**:
  - Mentoria para Executivos, Palestras Corporativas & Internacionais, Programas Executivos (Parceria FIA Business School) e *Research as a Service & Coprodução* separados da taxonomia central de consultoria, com CTA **`Converse sobre um desafio`**.

---

## 5. Atualização Completa de Publicações e Conteúdo (`publicacoes.ts` + `Publicacoes.astro`)

- **Artigos em Periódicos**:
  - Adicionado o artigo de 2025 na *Project Design Management*: *"Risks and negative impacts of using AI in interactive service processes: A taxonomy proposal"* (com link externo).
- **Congressos e Conferências**:
  - Adicionados os 6 novos registros de congressos (21º Congresso Brasileiro de Contabilidade CFC 2025 em Natal/RN, 2 artigos no IAMOT 2025 em Montreal/Canadá, XXVII SEMEAD 2024 USP, SUMMIT ESG 2023 com link para o YouTube e Congresso Brasileiro Online de Administração 2021).
- **Livros & Capítulos**:
  - Layout em grid de 2 colunas com capas editoriais estilizadas (`.featured-book`) para **"Prompts para Contabilidade"** (2025, E-book) e **"Criatividade, Modelos Mentais e Inovação"** (2018, Editora Senac, ISBN 9788539621453).
  - Adicionado o capítulo **"IA e o papel da liderança"** (*In: O futuro dos negócios*, com link para a Livraria da Travessa) e atualizados ISBNs e coautores dos outros 4 capítulos.
- **Na Mídia / Entrevistas**:
  - Substituídos os itens antigos sem link pelas **29 entrevistas e matérias com links diretos** (Estadão/Broadcast, Poder360, IstoÉ Dinheiro, CNN Brasil, Correio Braziliense, Diário do Comércio, Veja Negócios, etc.).
- **Atividades Acadêmicas**:
  - Adicionados os 3 cards de métricas em destaque:
    - **61 trabalhos orientados** (Mestrado Profissional, TCC de Graduação e MBA).
    - **Patente INPI `BR512016000933-0`** (*Programa de Computador — Sistema de Avaliação GRI*, em parceria com o IGEFE).
    - **116 apresentações realizadas** (Palestras e conferências no Brasil, EUA, Egito, Argentina e Canadá).
- **Artigos de Opinião & Revistas**:
  - Adicionado bloco em destaque com links para a coluna na **Fast Company Brasil**, artigo n'**O Especialista (Safra)** e **Project Design Management**, seguido pelas colunas na *IstoÉ Dinheiro* (sem numeração artificial).
- **Nova Aba "O que estou lendo"**:
  - Adicionada a 7ª aba na seção de Conteúdo com leituras atuais e notas comentadas pelo professor.

---

## 6. Arquivos Modificados no Repositório (`v2/`)

- `v2/cms/schemas.ts`
- `v2/site/src/scripts/hero-ascii.ts`
- `v2/site/src/components/Hero.astro`
- `v2/site/src/components/Bio.astro`
- `v2/site/src/components/Consultoria.astro`
- `v2/site/src/components/Solucoes.astro`
- `v2/site/src/components/Publicacoes.astro`
- `v2/site/src/components/Nav.astro`
- `v2/site/src/data/consultoria.ts`
- `v2/site/src/data/publicacoes.ts`
- `v2/site/src/i18n/index.ts`
- `v2/site/src/i18n/translations.ts`
- `v2/site/src/lib/sanity.ts`
