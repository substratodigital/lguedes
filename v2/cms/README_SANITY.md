# Sanity Studio — Gestão da Seção Conteúdo (Guedes.AI)

Este diretório contém os schemas tipados para o **Sanity Studio**, responsável pela gestão exclusiva da seção **Conteúdo** do site do Professor Luís Guedes.

## Por que essa solução é à prova de falhas?
1. **Campos fechados e validados:** O professor preenche apenas formulários limpos (ex: Ano, Título, Veículo/Periódico, Link). Não há editor HTML que possa desconfigurar as fontes, cores ou espaçamentos.
2. **Dupla Autenticação (2FA):** O professor faz login via **Google Workspace / Gmail**, herdando diretamente a autenticação em 2 etapas (SMS, Google Prompt, YubiKey ou Authenticator) já ativa na conta Google dele.
3. **Deploy automático:** Ao clicar em *Publish*, o Sanity dispara um Webhook para a Vercel, que recompila o site estático em segundos.

---

## Estrutura de Schemas disponíveis
- `artigoPeriodico`: Artigos em periódicos científicos (ano, título, periódico, link opcional).
- `congresso`: Publicações e apresentações em congressos acadêmicos (ano, título, evento).
- `livro`: Livros autorais destacados (ano, título, editora, link da Amazon).
- `capitulo`: Capítulos de livros (ano, título, livro, editora).
- `premio`: Prêmios e reconhecimentos didáticos (ano, prêmio, instituição concedente).
- `midia`: Entrevistas, matérias e mesas redondas na imprensa (ano, título, tipo, link).
- `artigoOpiniao`: Colunas de opinião (ex: Revista IstoÉ Dinheiro).

---

## Como iniciar o Sanity Studio
1. Acesse https://www.sanity.io e crie um projeto gratuito associado ao domínio `guedes.ai` ou e-mail do professor.
2. Anote o `projectId` e o `dataset` (geralmente `production`).
3. Para rodar o Studio localmente ou hospedar gratuitamente no subdomínio Sanity (ex: `guedes.sanity.studio`):
   ```bash
   npx sanity init --bare
   ```
4. Adicione os schemas deste diretório no `sanity.config.ts`.
