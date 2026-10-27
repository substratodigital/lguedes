# Relatório de Marco: Lançamento V2 (Guedes.AI)

**Data do Marco:** 27 de Outubro de 2026  
**Status do Projeto:** ✅ Em Produção (No Ar)  
**URL de Produção:** [https://www.lguedes.com.br](https://www.lguedes.com.br)  
**Painel do Professor (CMS):** [https://guedes-ai.sanity.studio](https://guedes-ai.sanity.studio)  
**Repositório Oficial:** [https://github.com/substratodigital/lguedes](https://github.com/substratodigital/lguedes)

---

## 1. Resumo Executivo da Migração (V1 ➔ V2)

A versão V1 (React SPA + Three.js/R3F + Framer Motion) sofria com gargalos graves de processamento em computadores e celulares devido ao loop contínuo de renderização 3D a 60fps mesmo fora da viewport e bundles JavaScript volumosos.

A **Versão V2** foi completamente reconstruída do zero com arquitetura estática moderna:
- **Framework:** Astro (Zero JavaScript client-side desnecessário, SSG estático).
- **Estilo:** 100% Vanilla CSS estruturado (sem Tailwind na V2), tokens HSL refinados, dot-grid e tipografia Geist.
- **Tema:** **100% Light Mode** editorial tech premium (removido toggle de dark mode).
- **Animações:** GSAP 3 + ScrollTrigger com aceleração por hardware e performance ultraleve.
- **Hero:** WebGL ASCII Shader com desativação automática fora da tela (0% consumo de CPU/GPU em repouso).
- **Performance:** Tempo de build de ~30s na Cloudflare Pages; carregamento quase instantâneo para o usuário final.

---

## 2. Componentes e Decisões de Design Implementadas

1. **Navegação (`Nav.astro`):**
   - Header fixo com efeito blur sutil, troca de idioma PT/EN e menu mobile animado com GSAP.
   - Ícone oficial do LinkedIn via SVG inline.
2. **Hero (`Hero.astro` + `hero-ascii.ts`):**
   - Retrato editorial com shader ASCII de alta fidelidade e títulos com animação letra por letra (*stagger*).
3. **Palestras (`Palestras.astro`):**
   - Restaurado o layout da versão original com seletor de abas lateral, barras de destaque coloridas e tópicos em cards destacados.
4. **Trajetória & Depoimentos (`Trajetoria.astro` & `Depoimentos.astro`):**
   - **Sem barras de rolagem horizontais.**
   - Transformados em carrosséis infinitos e contínuos via GSAP com suporte a pausa no hover e arraste (drag).
5. **Serviços / Soluções (`Solucoes.astro`):**
   - Cards com hover dinâmico.
   - **Regra Estrita Aplicada:** Remoção total de números arbitrários (*"NUNCA numerar nada sem pedido explícito"*).
6. **Conteúdo / Publicações (`Publicacoes.astro`):**
   - 6 abas dinâmicas com animações GSAP de carregamento por tag (*Científicas, Livros, Prêmios, Mídia, Acadêmicas, Opinião*).
   - Botões "Ver mais" integrados para listas longas.
7. **Footer Claro & Contato (`ContatoFooter.astro`):**
   - Fundo claro com foto formal do professor (`guedes-formal.webp`), revelação interativa em ASCII, formulário validado e assinatura tipográfica `GUEDES.AI`.
8. **Ícones (`Icon.astro`):**
   - 100% integrados à biblioteca **Lucide** (*line stroke*, cor única), eliminando emojis e ícones fora do padrão.

---

## 3. Gestão de Conteúdo (Sanity Headless CMS)

- **Projeto Sanity:** `84rosfy5`
- **Dataset:** `production`
- **Sanity Studio Online:** [https://guedes-ai.sanity.studio](https://guedes-ai.sanity.studio)
- **Acesso do Professor:** Login direto com conta Google (`lguedes.sp@gmail.com`) com 2FA nativo.
- **Schemas Estruturados e Tipados:**
  1. `artigoPeriodico` (Ano, Título, Periódico, Link)
  2. `congresso` (Ano, Título, Evento/Cidade)
  3. `livro` (Ano, Título, Editora, Link)
  4. `capitulo` (Ano, Título, Livro, Editora)
  5. `premio` (Ano, Prêmio, Instituição Concedente)
  6. `midia` (Ano, Título, Tipo, Link)
  7. `artigoOpiniao` (Título - Coluna IstoÉ Dinheiro)
- **Mecanismo de Proteção (Fallback):**
  - Implementado em `v2/site/src/lib/sanity.ts`.
  - Enquanto o banco na nuvem estiver vazio, o site exibe todo o acervo histórico estático existente, garantindo que o site nunca fique em branco.

---

## 4. Infraestrutura & Segurança

- **Hospedagem:** Cloudflare Pages (Plano Free permanente com largura de banda ilimitada).
- **Domínio Ativo:** `www.lguedes.com.br` e `lguedes.com.br` vinculados com certificado SSL/TLS gerenciado pela Cloudflare.
- **Repositório Git Limpo:** 
  - Excluídos todos os arquivos legados da V1 e mídias brutas pesadas (>1GB).
  - Arquivos `.env` protegidos no `.gitignore`.
  - Zero segredos, senhas ou tokens expostos.

---

## 5. Próximos Passos (Fase 2 / Ponto de Partida)

1. **Configurar o Webhook de Deploy Automático:**
   - Criar o Deploy Hook no Cloudflare Pages e cadastrar em `sanity.io/manage/project/84rosfy5/api` para compilações automáticas ao clicar em *Publish*.
2. **Formulário de Contato:**
   - Conectar o envio do formulário do footer a um serviço transacional (ex: Resend, Formspree ou Cloudflare Worker).
3. **Povoamento do Sanity (Opcional):**
   - Caso desejado, rodar script para migrar o acervo histórico estático para dentro do Sanity Studio.
