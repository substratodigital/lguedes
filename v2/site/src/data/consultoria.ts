import type { Lang } from '../i18n';

export interface ConsultoriaProduct {
  id: string;
  num: string;
  title: string;
  tag: string;
  desc: string;
  challenge: string;
  deliverables: string[];
  impact: string;
  diagram:
    | 'diagnostico'
    | 'planejamento'
    | 'estrutura'
    | 'governanca'
    | 'macroprocessos'
    | 'maturidade'
    | 'mudanca'
    | 'lideranca'
    | 'riscos'
    | 'premiacao'
    | 'processos'
    | 'insights'
    | 'contratos'
    | 'comunicacao'
    | 'carreira';
}

export interface ConsultoriaOffer {
  slug: string;
  num: string;
  axisLabel: string;
  shortTitle: string;
  title: string;
  subtitle: string;
  cardSummary: string;
  accent: string;
  href: string;
  heroThesis: string;
  heroQuote: string;
  stats: { value: string; label: string }[];
  pillars: { num: string; title: string; desc: string }[];
  products: ConsultoriaProduct[];
}

export const CONSULTORIA_DATA: Record<Lang, {
  eyebrow: string;
  h2: string;
  lead: string;
  cardCta: string;
  solutionsCountLabel: string;
  backHomeLabel: string;
  otherOfferEyebrow: string;
  otherOfferCta: string;
  challengeLabel: string;
  deliverablesLabel: string;
  impactLabel: string;
  talkToSpecialistLabel: string;
  railLabel: string;
  methodEyebrow: string;
  methodTitle: string;
  methodLead: string;
  portfolioEyebrow: string;
  portfolioTitle: string;
  offers: [ConsultoriaOffer, ConsultoriaOffer];
}> = {
  pt: {
    eyebrow: 'PORTFÓLIO DE CONSULTORIA',
    h2: 'Arquitetura estratégica e inteligência aplicada para decisões de alto impacto',
    lead: 'Mais de 30 projetos conduzidos junto a grandes corporações e órgãos públicos, combinando o rigor científico da FEA/USP e a chancela metodológica FIA com execução pragmática orientada a valor.',
    cardCta: 'Explorar soluções e entregáveis',
    solutionsCountLabel: 'produtos especializados',
    backHomeLabel: 'Voltar para o início',
    otherOfferEyebrow: 'EXPLORAR O OUTRO EIXO DE CONSULTORIA',
    otherOfferCta: 'Conhecer esta frente',
    challengeLabel: 'Quando acionar',
    deliverablesLabel: 'Entregáveis centrais',
    impactLabel: 'Captura de valor',
    talkToSpecialistLabel: 'Solicitar diagnóstico desta solução',
    railLabel: 'Soluções',
    methodEyebrow: 'MÉTODO DE ATUAÇÃO',
    methodTitle: 'Estratégia que sobrevive ao encontro com a operação.',
    methodLead: 'Cada projeto nasce da leitura rigorosa da realidade institucional, sem pacotes de prateleira — unindo ciência de gestão, desenho organizacional e governança executiva.',
    portfolioEyebrow: 'DESTRINCHANDO AS SOLUÇÕES',
    portfolioTitle: 'Escopo, argumentos e entregáveis por produto',
    offers: [
      {
        slug: 'complexidade-organizacional',
        num: '01',
        axisLabel: 'EIXO 01 · ESTRATÉGIA, GOVERNANÇA & ARQUITETURA',
        shortTitle: 'Complexidade Organizacional',
        title: 'Produtos que enfrentam a complexidade crescente das organizações',
        subtitle: 'Diagnóstico estratégico, direcionamento institucional, redesign de estrutura, governança, cadeia de valor e desenvolvimento da liderança para organizações em transformação.',
        cardSummary: 'Do diagnóstico de ambiente externo e interno ao redesenho de estruturas, modelos de governança, cadeia de valor e formação de lideranças capazes de sustentar o crescimento.',
        accent: '#4F46E5',
        href: '/consultoria/complexidade-organizacional',
        heroThesis: 'À medida que as organizações crescem ou enfrentam transições de mercado, o maior risco não está apenas na concorrência externa — mas na fricção interna entre estratégia, estrutura, processos decisórios e capacidade gerencial. Este portfólio organiza as escolhas institucionais e cria a arquitetura necessária para que a estratégia aconteça na prática.',
        heroQuote: 'Organizações complexas não precisam de relatórios mais longos; precisam de clareza sobre o que parar, o que continuar e o que iniciar — com governança que sustente cada escolha.',
        stats: [
          { value: '08', label: 'Produtos modulares e integrados' },
          { value: '30+', label: 'Anos de experiência executiva e acadêmica' },
          { value: '40+', label: 'Organizações públicas e privadas atendidas' },
          { value: 'FIA / USP', label: 'Rigor metodológico e científico' },
        ],
        pillars: [
          {
            num: '01',
            title: 'Leitura Estruturada de Cenário',
            desc: 'Separação entre ruído operacional e causas estruturais, cruzando ambiente competitivo, maturidade interna e forças reais da instituição.',
          },
          {
            num: '02',
            title: 'Coerência entre Estratégia e Desenho',
            desc: 'Alinhamento entre ambição estratégica, macroprocessos, cadeia de valor, estrutura organizacional e ritos de tomada de decisão.',
          },
          {
            num: '03',
            title: 'Tração Liderada pelas Pessoas',
            desc: 'Tradução das escolhas estratégicas em agenda de mudança clara e desenvolvimento das competências gerenciais necessárias para executá-la.',
          },
        ],
        products: [
          {
            id: 'diagnosticos-estrategicos',
            num: '1.1',
            title: 'Diagnósticos estratégicos',
            tag: 'Leitura de Cenário & Posicionamento',
            desc: 'Relatório de análise do ambiente externo e das condições internas, com síntese de oportunidades, ameaças, forças e fragilidades. Entrega uma leitura estruturada dos desafios e das escolhas que a organização precisa enfrentar.',
            challenge: 'Quando a liderança percebe sinais de desaceleração, mudança regulatória/tecnológica ou desalinhamento interno, mas precisa de uma base analítica isenta antes de comprometer capital e energia.',
            deliverables: [
              'Relatório executivo de ambiente externo (mercado, regulação, tecnologia e vetores competitivos)',
              'Avaliação aprofundada das condições internas, capacidades e gargalos estruturais',
              'Matriz integrada de oportunidades, ameaças, forças e fragilidades (SWOT/TOWS executiva)',
              'Mapa estruturado dos dilemas estratégicos e das escolhas críticas para o conselho/diretoria',
            ],
            impact: 'Elimina pontos cegos na alta gestão e estabelece consenso executivo sobre os verdadeiros desafios prioritários da organização.',
            diagram: 'diagnostico',
          },
          {
            id: 'planejamento-estrategico',
            num: '1.2',
            title: 'Planejamento estratégico',
            tag: 'Direcionamento & Execução',
            desc: 'Elaboração do documento de direcionamento com prioridades, objetivos estratégicos e iniciativas. Inclui orientação para desdobramento, acompanhamento e revisão do plano, conectando escolhas institucionais à execução.',
            challenge: 'Para organizações que precisam transformar ambição de longo prazo em escolhas claras, metas mensuráveis e rotinas de desdobramento que não morram na gaveta.',
            deliverables: [
              'Documento mestre de Direcionamento Estratégico (visão, prioridades e teses de crescimento)',
              'Mapa de objetivos estratégicos, indicadores-chave (KPIs/OKRs) e metas plurianuais',
              'Portfólio priorizado de iniciativas estratégicas com responsáveis e marcos críticos',
              'Guia de desdobramento, ritos de acompanhamento e sistemática de revisão periódica do plano',
            ],
            impact: 'Conecta o nível institucional ao chão de execução, garantindo foco na alocação de recursos e disciplina no acompanhamento de resultados.',
            diagram: 'planejamento',
          },
          {
            id: 'revisao-estrutura-organizacional',
            num: '1.3',
            title: 'Revisão da estrutura organizacional',
            tag: 'Redesign & Interfaces',
            desc: 'Proposta de redesign organizacional, acompanhada da definição revisada de atribuições, responsabilidades e interfaces entre unidades. Explicita como a estrutura pode apoiar a estratégia e melhorar a coordenação.',
            challenge: 'Quando o crescimento gerou silos, sombreamento de funções, lentidão decisória ou uma estrutura herdada do passado que já não reflete a estratégia atual.',
            deliverables: [
              'Arquitetura e proposta completa de redesign organizacional (macro e microestrutura)',
              'Caderno revisado de atribuições, mandatos e responsabilidades por unidade/diretoria',
              'Mapeamento explícito das interfaces críticas e acordos de cooperação entre áreas',
              'Plano de transição assistida para implantação segura da nova estrutura',
            ],
            impact: 'Reduz o atrito interdepartamental, elimina retrabalho por sobreposição de escopo e devolve agilidade à coordenação executiva.',
            diagram: 'estrutura',
          },
          {
            id: 'modelos-gestao-governanca',
            num: '1.4',
            title: 'Novos modelos de gestão e governança',
            tag: 'Decisão & Accountability',
            desc: 'Processo de análise profundo que culmina em um documento com decisão revisitada de instâncias decisórias, responsabilidades, mecanismos de coordenação e rotinas de gestão e monitoramento. Organiza a tomada de decisão, a prestação de contas e a supervisão dos resultados.',
            challenge: 'Ideal para empresas familiares em profissionalização, grupos empresariais em expansão ou instituições públicas que precisam destravar a tomada de decisão e fortalecer a prestação de contas.',
            deliverables: [
              'Arquitetura das instâncias decisórias (conselhos, comitês, diretorias e alçadas)',
              'Matriz de responsabilidades decisórias (RACI/RAPID) e mecanismos de coordenação',
              'Calendário e desenho das rotinas de gestão, monitoramento de performance e ritos executivos',
              'Protocolos de prestação de contas (accountability) e supervisão estratégica de resultados',
            ],
            impact: 'Garante decisões mais rápidas, rastreáveis e seguras na camada certa da organização, liberando o C-level de microdecisões operacionais.',
            diagram: 'governanca',
          },
          {
            id: 'macroprocessos-cadeia-valor',
            num: '1.5',
            title: 'Mapeamento de macroprocessos organizacionais e revisão da cadeia de valor',
            tag: 'Arquitetura de Valor',
            desc: 'Mapa dos macroprocessos finalísticos, de apoio e de gestão, com descrição de suas principais interfaces e redesign da cadeia de valor da organização. Oferece uma visão integrada de como as áreas contribuem para a geração de valor.',
            challenge: 'Quando as áreas operam de forma fragmentada sem clareza de ponta a ponta sobre como o valor é produzido, suportado e entregue ao cliente ou cidadão.',
            deliverables: [
              'Redesign da Cadeia de Valor integrada da organização',
              'Mapa completo dos macroprocessos finalísticos (core), de gestão e de suporte',
              'Especificação das interfaces de entrada/saída, níveis de serviço e handoffs entre áreas',
              'Matriz de contribuição de cada macroprocesso para os objetivos estratégicos do negócio',
            ],
            impact: 'Cria visão sistêmica transversal, permitindo enxergar gargalos ocultos nas fronteiras entre diretorias e orientar investimentos de tecnologia e IA.',
            diagram: 'macroprocessos',
          },
          {
            id: 'avaliacoes-maturidade-institucional',
            num: '1.6',
            title: 'Avaliações de maturidade institucional',
            tag: 'Métricas de Capacidade',
            desc: 'Instrumento de avaliação e relatório de resultados por dimensão ou macroprocesso. Identifica capacidades existentes, lacunas e prioridades para orientar o desenvolvimento institucional.',
            challenge: 'Para organizações que precisam medir objetivamente seu estágio atual de evolução em gestão, inovação, governança ou transformação digital/IA frente a referenciais de excelência.',
            deliverables: [
              'Instrumento proprietário e customizado de avaliação de maturidade por dimensão/macroprocesso',
              'Relatório analítico com scores detalhados, radares comparativos e evidências coletadas',
              'Mapeamento de capacidades instaladas versus lacunas críticas (gap analysis)',
              'Roadmap priorizado de evolução institucional em ondas de curto, médio e longo prazo',
            ],
            impact: 'Substitui percepções subjetivas por uma linha de base mensurável, permitindo acompanhar a evolução da maturidade organizacional ao longo do tempo.',
            diagram: 'maturidade',
          },
          {
            id: 'sinteses-prioridades-mudanca',
            num: '1.7',
            title: 'Sínteses de prioridades de mudança',
            tag: 'Foco & Agenda Executiva',
            desc: 'Documento executivo que consolida ações a parar, continuar e iniciar. Traduz os achados do diagnóstico em uma agenda de mudança com prioridades claras para a liderança.',
            challenge: 'Quando a organização sofre de "fadiga de projetos" — dezenas de iniciativas simultâneas competindo por atenção, sem clareza do que deve ser descontinuado para abrir espaço ao novo.',
            deliverables: [
              'Matriz Executiva Parar / Continuar / Iniciar (Stop, Start, Continue) validada com a liderança',
              'Tradução direta dos achados diagnósticos em alavancas práticas de transformação',
              'Agenda executiva de mudança sequenciada por impacto, urgência e capacidade de absorção',
              'Guia de comunicação executiva para alinhamento de gestores e equipes em torno das escolhas',
            ],
            impact: 'Gera alívio organizacional imediato ao cortar iniciativas de baixo retorno e concentrar toda a energia executiva nas alavancas que realmente movem o ponteiro.',
            diagram: 'mudanca',
          },
          {
            id: 'programas-desenvolvimento-gerencial',
            num: '1.8',
            title: 'Programas de desenvolvimento gerencial',
            tag: 'Capacidades & Liderança',
            desc: 'Estrutura do programa, objetivos de aprendizagem, conteúdos e atividades voltadas aos desafios dos gestores. Apoia o desenvolvimento de capacidades para coordenar equipes, liderar mudanças e executar a estratégia.',
            challenge: 'Nenhuma estratégia ou nova estrutura sobrevive se os gestores continuarem operando com o modelo mental anterior. Desenhado para preparar líderes para os desafios reais do negócio.',
            deliverables: [
              'Arquitetura pedagógica customizada e objetivos de aprendizagem conectados à estratégia',
              'Curadoria de conteúdos, cases aplicados, oficinas práticas e dinâmicas de resolução de problemas',
              'Condução de módulos executivos com rigor acadêmico (padrão FIA/USP) e aplicação imediata',
              'Projetos aplicados voltados a coordenar equipes, liderar mudanças e sustentar a execução',
            ],
            impact: 'Eleva a barra da liderança intermediária e executiva, criando repertório comum e autonomia para conduzir mudanças complexas.',
            diagram: 'lideranca',
          },
        ],
      },
      {
        slug: 'eficiencia-e-inteligencia',
        num: '02',
        axisLabel: 'EIXO 02 · EFICIÊNCIA OPERACIONAL, RISCOS & IA',
        shortTitle: 'Eficiência Operacional & Inteligência',
        title: 'Produtos que ampliam a eficiência operacional e a inteligência aplicada aos negócios',
        subtitle: 'Mapeamento de riscos, redesenho de processos, ciência de dados e aprendizado de máquina, gestão inteligente de contratos, metodologias de avaliação FIA e evolução de pessoas.',
        cardSummary: 'Aplicação direta de redesenho de processos, estatística avançada, machine learning, automação contratual, gestão de riscos e alinhamento de incentivos para capturar eficiência real.',
        accent: '#0D9488',
        href: '/consultoria/eficiencia-e-inteligencia',
        heroThesis: 'A verdadeira fronteira da competitividade contemporânea está na combinação entre processos enxutos, mitigação rigorosa de riscos e uso inteligente de dados e Inteligência Artificial sobre a operação real. Este eixo reúne soluções desenhadas para eliminar retrabalho, descobrir padrões ocultos nos dados e alinhar pessoas, contratos e incentivos à geração de resultado.',
        heroQuote: 'A primeira fronteira da inteligência aplicada aos negócios não é o hype tecnológico: é a capacidade de transformar dados operacionais, processos e contratos em decisões mais precisas todos os dias.',
        stats: [
          { value: '07', label: 'Soluções de impacto operacional direto' },
          { value: 'ML & IA', label: 'Estatística avançada e aprendizado de máquina' },
          { value: 'Chancela FIA', label: 'Metodologias transparentes e reconhecidas' },
          { value: 'End-to-End', label: 'Da análise AS-IS à automação e captura' },
        ],
        pillars: [
          {
            num: '01',
            title: 'Processos e Riscos sob Controle',
            desc: 'Visibilidade completa sobre vulnerabilidades operacionais e eliminação de gargalos, retrabalhos e fricções entre áreas.',
          },
          {
            num: '02',
            title: 'Ciência de Dados & Automação Inteligente',
            desc: 'Uso de estatística avançada, machine learning e automação na gestão de contratos e operações para capturar oportunidades invisíveis a olho nu.',
          },
          {
            num: '03',
            title: 'Engajamento, Mérito e Carreira',
            desc: 'Alinhamento de comunicação interna, metodologias de avaliação/premiação e planos de cargos e salários financeiramente sustentáveis.',
          },
        ],
        products: [
          {
            id: 'mapeamento-riscos-contingencia',
            num: '2.1',
            title: 'Mapeamento de riscos e elaboração de planos de contingência',
            tag: 'Resiliência & Mitigação',
            desc: 'Elaboração de planos de mapeamento de riscos operacionais e corporativos, integrando ferramentas de análise, visitas a campo e entrevistas, seguindo as melhores práticas internacionais. Elaboração circunstanciada de planos de contingência e interlocução em alto nível com a liderança para sua consecução.',
            challenge: 'Para operações críticas que não podem parar e lideranças que precisam antecipar vulnerabilidades operacionais, regulatórias, reputacionais ou de fornecimento antes que se tornem crises.',
            deliverables: [
              'Inventário e matriz de riscos operacionais e corporativos (probabilidade × severidade × velocidade)',
              'Diagnóstico em campo com entrevistas estruturadas e aplicação de frameworks internacionais',
              'Planos circunstanciados de contingência, resposta rápida e continuidade de negócios',
              'Protocolos de governança de crise e interlocução direta com a alta liderança para implantação',
            ],
            impact: 'Protege o valor da organização, reduz drasticamente o tempo de resposta a incidentes e fortalece a confiança de conselhos, reguladores e investidores.',
            diagram: 'riscos',
          },
          {
            id: 'metodologias-avaliacao-premiacao',
            num: '2.2',
            title: 'Metodologias de avaliação e premiação',
            tag: 'Chancela FIA & Reconhecimento',
            desc: 'Elaboração e implementação de metodologia de premiações, com critérios, regras de pontuação, instrumentos de julgamento e forma de consolidação dos resultados. Associado à marca FIA, torna a avaliação ainda mais consistente, transparente e relevante para o mercado.',
            challenge: 'Para entidades setoriais, grandes empresas e instituições que desejam criar ou elevar o rigor técnico, a isenção e o prestígio de seus prêmios corporativos, rankings ou certificações.',
            deliverables: [
              'Desenho completo da arquitetura metodológica, dimensões avaliadas e pesos ponderados',
              'Regulamento técnico, regras de pontuação e blindagem contra vieses de avaliação',
              'Instrumentos de coleta, baremas de julgamento e algoritmos de consolidação dos resultados',
              'Associação técnica à marca FIA, agregando credibilidade acadêmica e transparência ao mercado',
            ],
            impact: 'Transforma premiações e avaliações em referências incontestáveis de mercado, auditáveis, transparentes e de alto valor institucional.',
            diagram: 'premiacao',
          },
          {
            id: 'revisao-processos-negocio',
            num: '2.3',
            title: 'Revisão de processos de negócio',
            tag: 'AS-IS → TO-BE & Produtividade',
            desc: 'Análise do AS-IS (mapeamento quando necessário) e redesenho de processos com vistas ao aumento da eficiência operacional, aumento da qualidade, diminuição de retrabalho e aumento da interlocução entre as áreas.',
            challenge: 'Quando os custos operacionais crescem mais rápido que a receita, prazos internos atrasam e equipes gastam energia excessiva corrigindo erros ou aguardando aprovações.',
            deliverables: [
              'Mapeamento cirúrgico do estado atual (AS-IS) focado nos pontos críticos de atrito e desperdício',
              'Redesenho de processos (TO-BE) orientado a fluidez, qualidade, automação e ganho de tempo',
              'Padrões operacionais, SLAs internos e mecanismos claros de passagem de bastão entre áreas',
              'Plano de implantação com indicadores de eficiência, redução de retrabalho e ganho de qualidade',
            ],
            impact: 'Libera capacidade produtiva imediata, reduz custos de não-qualidade e acelera o ciclo de entrega ponta a ponta.',
            diagram: 'processos',
          },
          {
            id: 'insights-dados-operacao',
            num: '2.4',
            title: 'Insights a partir dos dados de operação',
            tag: 'Estatística Avançada & Machine Learning',
            desc: 'Análise de dados da operação e, por meio de técnicas sofisticadas de estatística e aprendizado de máquina, busca por padrões, erros sistemáticos e oportunidades não evidentes para o negócio. Vendas, operação, gestão de metas e equipes compõem conjunto de dados típicos para os quais essa análise é indicada.',
            challenge: 'Muitas organizações sentam sobre montanhas de dados de vendas, operação e metas, mas usam apenas dashboards descritivos passados — deixando escapar anomalias e alavancas ocultas de resultado.',
            deliverables: [
              'Modelagem exploratória e inferencial sobre bases históricas de vendas, operação, metas e equipes',
              'Aplicação de algoritmos de aprendizado de máquina (clustering, regressão, detecção de anomalias)',
              'Identificação de erros sistemáticos, vazamentos de margem e padrões ocultos de alta performance',
              'Caderno executivo de insights acionáveis com estimativa de retorno financeiro e operacional',
            ],
            impact: 'Converte dados brutos já existentes na empresa em vantagens competitivas reais, corrigindo distorções sistemáticas e revelando novas fontes de receita e eficiência.',
            diagram: 'insights',
          },
          {
            id: 'gestao-inteligente-contratos',
            num: '2.5',
            title: 'Gestão inteligente de contratos',
            tag: 'Automação, Integridade & SLAs',
            desc: 'Automatização inteligente de monitoramento de performance e rotinas de gestão administrativa de contratos, com análise consolidada de integridade, monitoramento de prazos e compromissos.',
            challenge: 'Grandes carteiras de contratos frequentemente sofrem com perda de prazos, reajustes mal aplicados, descumprimento silencioso de SLAs e alto custo administrativo manual.',
            deliverables: [
              'Diagnóstico da carteira contratual e desenho de fluxos automatizados de gestão administrativa',
              'Implementação de rotinas inteligentes de monitoramento de performance física e financeira',
              'Painel consolidado de integridade contratual, alertas de vencimento, garantias e obrigações',
              'Padronização de indicadores de nível de serviço (SLAs) e gatilhos de governança contratual',
            ],
            impact: 'Mitiga riscos financeiros e jurídicos, evita vazamento de caixa em contratos complexos e reduz drasticamente o esforço manual de fiscalização.',
            diagram: 'contratos',
          },
          {
            id: 'revisao-comunicacao-interna',
            num: '2.6',
            title: 'Revisão de planos de comunicação interna',
            tag: 'Engajamento & Alinhamento Estratégico',
            desc: 'Análise dos padrões, processos, tecnologia e instrumentos de comunicação interna e revisão desses componentes vis-à-vis os resultados que se vêm obtendo de engajamento, sobretudo, e de integração com a estratégia corporativa.',
            challenge: 'Quando a comunicação interna produz alto volume de mensagens, mas baixo engajamento real e pouca compreensão das prioridades estratégicas pelas equipes na ponta.',
            deliverables: [
              'Auditoria completa de canais, padrões, processos, ritos e tecnologias de comunicação interna',
              'Diagnóstico de eficácia comunicacional cruzado com indicadores de clima, engajamento e cultura',
              'Novo Plano Diretor de Comunicação Interna conectado diretamente à estratégia corporativa',
              'Arquitetura editorial, matriz de públicos/canais e métricas de mensuração de impacto',
            ],
            impact: 'Transforma a comunicação interna de um canal informativo operacional em uma alavanca estratégica de engajamento, coesão cultural e execução.',
            diagram: 'comunicacao',
          },
          {
            id: 'revisao-cargos-salarios',
            num: '2.7',
            title: 'Revisão de planos de cargos e salários',
            tag: 'Carreira, Estratégia & Viabilidade',
            desc: 'Revisão do plano de cargos e salários, com análise profunda da estratégia e temas emergentes visando elaborar um modelo de evolução na carreira profissional dos times que seja ao mesmo tempo estimulante para as pessoas, estratégico para a organização e financeiramente viável.',
            challenge: 'Estruturas de cargos defasadas frente às novas funções digitais/IA, distorções salariais internas ou trilhas de carreira rígidas que causam perda de talentos-chave ou pressão insustentável na folha.',
            deliverables: [
              'Análise estratégica da arquitetura de cargos frente ao futuro do negócio e temas emergentes',
              'Desenho de trilhas de evolução profissional (Y/W, especialista e gestão) claras e estimulantes',
              'Estrutura salarial equilibrada (equidade interna, competitividade externa e sustentabilidade)',
              'Modelagem de impacto financeiro na folha e regras claras de enquadramento, mérito e promoção',
            ],
            impact: 'Atrai e retém talentos de alta performance com perspectivas reais de evolução, garantindo total previsibilidade e viabilidade financeira para a organização.',
            diagram: 'carreira',
          },
        ],
      },
    ],
  },

  en: {
    eyebrow: 'CONSULTING PORTFOLIO',
    h2: 'Strategic architecture and applied intelligence for high-impact decisions',
    lead: 'Over 30 consulting engagements delivered for major corporations and public institutions, combining FEA/USP scientific rigor and FIA methodological excellence with pragmatic, value-driven execution.',
    cardCta: 'Explore solutions & deliverables',
    solutionsCountLabel: 'specialized products',
    backHomeLabel: 'Back to home',
    otherOfferEyebrow: 'EXPLORE THE OTHER CONSULTING AXIS',
    otherOfferCta: 'Discover this practice',
    challengeLabel: 'When to engage',
    deliverablesLabel: 'Core deliverables',
    impactLabel: 'Value capture',
    talkToSpecialistLabel: 'Request a diagnostic for this solution',
    railLabel: 'Solutions',
    methodEyebrow: 'ENGAGEMENT METHOD',
    methodTitle: 'Strategy that survives contact with operations.',
    methodLead: 'Every engagement starts with a rigorous diagnosis of institutional reality—never off-the-shelf templates—uniting management science, organizational design, and executive governance.',
    portfolioEyebrow: 'UNPACKING THE SOLUTIONS',
    portfolioTitle: 'Scope, rationale, and deliverables by product',
    offers: [
      {
        slug: 'organizational-complexity',
        num: '01',
        axisLabel: 'AXIS 01 · STRATEGY, GOVERNANCE & ARCHITECTURE',
        shortTitle: 'Organizational Complexity',
        title: 'Products that address the growing complexity of organizations',
        subtitle: 'Strategic diagnostics, institutional direction, organizational redesign, governance models, value chain mapping, and leadership development for transforming organizations.',
        cardSummary: 'From external and internal strategic diagnostics to organizational redesign, governance models, value-chain architecture, and leadership development.',
        accent: '#4F46E5',
        href: '/en/consulting/organizational-complexity',
        heroThesis: 'As organizations scale or navigate market transitions, the greatest risk is rarely external competition alone—it is internal friction between strategy, structure, decision-making rights, and managerial capability. This portfolio structures institutional choices and builds the architecture required to make strategy happen.',
        heroQuote: 'Complex organizations do not need longer reports; they need clarity on what to stop, continue, and start—backed by governance that sustains every choice.',
        stats: [
          { value: '08', label: 'Modular & integrated products' },
          { value: '30+', label: 'Years of executive & academic experience' },
          { value: '40+', label: 'Public and private organizations served' },
          { value: 'FIA / USP', label: 'Methodological & scientific rigor' },
        ],
        pillars: [
          {
            num: '01',
            title: 'Structured Scenario Reading',
            desc: 'Separating operational noise from structural root causes by crossing competitive landscape, internal maturity, and institutional strengths.',
          },
          {
            num: '02',
            title: 'Strategy-to-Design Coherence',
            desc: 'Aligning strategic ambition, macroprocesses, value chain, organizational structure, and decision-making rituals.',
          },
          {
            num: '03',
            title: 'People-Led Traction',
            desc: 'Translating strategic choices into a clear change agenda and building the managerial capabilities required to execute it.',
          },
        ],
        products: [
          {
            id: 'strategic-diagnostics',
            num: '1.1',
            title: 'Strategic diagnostics',
            tag: 'Scenario Reading & Positioning',
            desc: 'Analytical report covering the external environment and internal conditions, synthesizing opportunities, threats, strengths, and weaknesses. Delivers a structured reading of the challenges and choices the organization must face.',
            challenge: 'When leadership senses slowdown signals, regulatory/technological shifts, or internal misalignment, and needs an unbiased analytical foundation before committing capital.',
            deliverables: [
              'Executive report on the external environment (market, regulation, technology, and competitive vectors)',
              'In-depth assessment of internal conditions, capabilities, and structural bottlenecks',
              'Integrated synthesis of opportunities, threats, strengths, and weaknesses',
              'Structured map of strategic dilemmas and critical choices for the board and C-suite',
            ],
            impact: 'Eliminates blind spots at the top and builds executive consensus around the organization’s true priority challenges.',
            diagram: 'diagnostico',
          },
          {
            id: 'strategic-planning',
            num: '1.2',
            title: 'Strategic planning',
            tag: 'Direction & Execution',
            desc: 'Development of the strategic direction document with priorities, strategic objectives, and initiatives. Includes guidance for deployment, monitoring, and plan review, connecting institutional choices to execution.',
            challenge: 'For organizations that need to turn long-term ambition into clear choices, measurable targets, and deployment routines that drive daily execution.',
            deliverables: [
              'Master Strategic Direction document (vision, priorities, and growth theses)',
              'Strategic objectives map, key performance indicators (KPIs/OKRs), and multi-year targets',
              'Prioritized portfolio of strategic initiatives with clear ownership and milestones',
              'Deployment playbook, tracking cadences, and periodic plan review system',
            ],
            impact: 'Connects institutional ambition to front-line execution, ensuring disciplined resource allocation and performance tracking.',
            diagram: 'planejamento',
          },
          {
            id: 'organizational-structure-review',
            num: '1.3',
            title: 'Organizational structure review',
            tag: 'Redesign & Interfaces',
            desc: 'Organizational redesign proposal accompanied by a revised definition of roles, responsibilities, and cross-unit interfaces. Clarifies how structure can support strategy and improve coordination.',
            challenge: 'When growth has created silos, overlapping mandates, slow decision-making, or a legacy structure that no longer serves current strategy.',
            deliverables: [
              'Complete organizational redesign proposal (macro and micro-structure)',
              'Revised charter of mandates, attributions, and responsibilities across units',
              'Explicit mapping of critical cross-unit interfaces and collaboration protocols',
              'Assisted transition roadmap for safe implementation of the new structure',
            ],
            impact: 'Reduces cross-departmental friction, eliminates scope duplication, and restores executive coordination speed.',
            diagram: 'estrutura',
          },
          {
            id: 'management-governance-models',
            num: '1.4',
            title: 'New management and governance models',
            tag: 'Decision Rights & Accountability',
            desc: 'Deep analytical process culminating in a revisited architecture of decision-making bodies, responsibilities, coordination mechanisms, and management/monitoring routines. Organizes decision-making, accountability, and results oversight.',
            challenge: 'Ideal for growing enterprise groups, professionalizing family businesses, or public institutions seeking faster decision-making and stronger accountability.',
            deliverables: [
              'Architecture of decision-making bodies (boards, committees, executive forums, and authorities)',
              'Decision-rights matrix (RACI/RAPID) and cross-functional coordination mechanisms',
              'Management cadence calendar, performance monitoring rituals, and governance protocols',
              'Accountability and results-supervision frameworks for executive leadership',
            ],
            impact: 'Ensures faster, traceable decisions at the right organizational layer while freeing the C-level from operational bottlenecks.',
            diagram: 'governanca',
          },
          {
            id: 'macroprocesses-value-chain',
            num: '1.5',
            title: 'Organizational macroprocess mapping and value chain review',
            tag: 'Value Architecture',
            desc: 'Map of core, support, and management macroprocesses, detailing key interfaces and redesigning the organization’s value chain. Provides an integrated view of how every area contributes to value creation.',
            challenge: 'When departments operate in fragments without end-to-end clarity on how value is created, supported, and delivered to clients or citizens.',
            deliverables: [
              'Redesigned integrated organizational Value Chain',
              'Complete blueprint of core, management, and support macroprocesses',
              'Specification of input/output interfaces, service levels, and cross-area handoffs',
              'Contribution matrix linking each macroprocess to strategic business objectives',
            ],
            impact: 'Creates a cross-functional systemic view, uncovering hidden boundary bottlenecks and guiding technology and AI investments.',
            diagram: 'macroprocessos',
          },
          {
            id: 'institutional-maturity-assessments',
            num: '1.6',
            title: 'Institutional maturity assessments',
            tag: 'Capability Metrics',
            desc: 'Assessment instrument and results report by dimension or macroprocess. Identifies existing capabilities, gaps, and priorities to guide institutional development.',
            challenge: 'For organizations that need an objective baseline of their current maturity in management, innovation, governance, or digital/AI readiness.',
            deliverables: [
              'Custom maturity assessment instrument structured by dimension or macroprocess',
              'Analytical report with detailed scoring, comparative radar charts, and evidence base',
              'Installed capabilities vs. critical gap analysis',
              'Prioritized institutional evolution roadmap across short-, medium-, and long-term waves',
            ],
            impact: 'Replaces subjective impressions with a measurable baseline to track institutional evolution over time.',
            diagram: 'maturidade',
          },
          {
            id: 'change-priority-syntheses',
            num: '1.7',
            title: 'Change priority syntheses',
            tag: 'Focus & Executive Agenda',
            desc: 'Executive document consolidating actions to stop, continue, and start. Translates diagnostic findings into a change agenda with clear priorities for leadership.',
            challenge: 'When an organization suffers from initiative overload—dozens of competing projects with no clarity on what must be stopped to make room for strategic priorities.',
            deliverables: [
              'Executive Stop / Continue / Start matrix validated with senior leadership',
              'Direct translation of diagnostic findings into practical transformation levers',
              'Sequenced executive change agenda balanced by impact, urgency, and absorption capacity',
              'Executive communication guide to align managers and teams around key choices',
            ],
            impact: 'Delivers immediate organizational relief by cutting low-return initiatives and focusing executive energy on high-leverage moves.',
            diagram: 'mudanca',
          },
          {
            id: 'management-development-programs',
            num: '1.8',
            title: 'Management development programs',
            tag: 'Capabilities & Leadership',
            desc: 'Program structure, learning objectives, content, and activities tailored to managers’ real challenges. Supports capability building to coordinate teams, lead change, and execute strategy.',
            challenge: 'No strategy or new structure survives if managers keep operating with yesterday’s mindset. Designed to equip leaders for real business challenges.',
            deliverables: [
              'Custom learning architecture and objectives directly tied to corporate strategy',
              'Curated content, applied case studies, hands-on workshops, and problem-solving labs',
              'Executive modules delivered with academic rigor (FIA/USP standard) and practical focus',
              'Applied action projects focused on team coordination, change leadership, and execution',
            ],
            impact: 'Raises the bar across middle and senior leadership, building shared vocabulary and autonomy to lead complex change.',
            diagram: 'lideranca',
          },
        ],
      },
      {
        slug: 'operational-efficiency-and-ai',
        num: '02',
        axisLabel: 'AXIS 02 · OPERATIONAL EFFICIENCY, RISK & AI',
        shortTitle: 'Operational Efficiency & Intelligence',
        title: 'Products that expand operational efficiency and applied business intelligence',
        subtitle: 'Risk mapping, business process redesign, data science and machine learning insights, smart contract management, FIA evaluation methodologies, and career architecture.',
        cardSummary: 'Direct application of process redesign, advanced statistics, machine learning, smart contract monitoring, risk management, and incentive alignment.',
        accent: '#0D9488',
        href: '/en/consulting/operational-efficiency-and-ai',
        heroThesis: 'The true frontier of modern competitiveness lies in combining lean processes, rigorous risk mitigation, and the intelligent use of data and Artificial Intelligence across real operations. This axis brings together solutions designed to eliminate rework, uncover hidden patterns in operational data, and align people, contracts, and incentives with business performance.',
        heroQuote: 'The first frontier of applied business intelligence is not technological hype: it is the ability to turn operational data, processes, and contracts into sharper decisions every day.',
        stats: [
          { value: '07', label: 'Direct operational impact solutions' },
          { value: 'ML & AI', label: 'Advanced statistics & machine learning' },
          { value: 'FIA Seal', label: 'Transparent, market-recognized methodologies' },
          { value: 'End-to-End', label: 'From AS-IS analysis to automation & capture' },
        ],
        pillars: [
          {
            num: '01',
            title: 'Processes & Risks Under Control',
            desc: 'Full visibility into operational vulnerabilities and elimination of bottlenecks, rework, and cross-area friction.',
          },
          {
            num: '02',
            title: 'Data Science & Smart Automation',
            desc: 'Applying advanced statistics, machine learning, and intelligent automation to contracts and operations to capture hidden value.',
          },
          {
            num: '03',
            title: 'Engagement, Merit & Career',
            desc: 'Aligning internal communication, evaluation/award methodologies, and financially sustainable career and compensation plans.',
          },
        ],
        products: [
          {
            id: 'risk-mapping-contingency-plans',
            num: '2.1',
            title: 'Risk mapping and contingency planning',
            tag: 'Resilience & Mitigation',
            desc: 'Development of operational and corporate risk mapping plans, integrating analytical tools, field visits, and interviews following international best practices. Detailed contingency planning and high-level engagement with leadership for execution.',
            challenge: 'For mission-critical operations and leadership teams that need to anticipate operational, regulatory, reputational, or supply vulnerabilities before they escalate.',
            deliverables: [
              'Operational and corporate risk inventory and matrix (likelihood × severity × velocity)',
              'Field diagnostics with structured interviews and international best-practice frameworks',
              'Detailed contingency, rapid-response, and business-continuity plans',
              'Crisis governance protocols and senior leadership alignment for execution',
            ],
            impact: 'Protects enterprise value, dramatically reduces incident response times, and strengthens board, regulator, and investor confidence.',
            diagram: 'riscos',
          },
          {
            id: 'evaluation-award-methodologies',
            num: '2.2',
            title: 'Evaluation and award methodologies',
            tag: 'FIA Endorsement & Recognition',
            desc: 'Design and implementation of award methodologies, including criteria, scoring rules, judging instruments, and results consolidation. Associated with the FIA brand, making evaluations even more consistent, transparent, and market-relevant.',
            challenge: 'For industry associations, major corporations, and institutions seeking technical rigor, impartiality, and prestige for their awards, rankings, or certifications.',
            deliverables: [
              'Complete methodological architecture, evaluation dimensions, and weighting systems',
              'Technical bylaws, scoring rules, and anti-bias safeguards',
              'Data collection instruments, judging rubrics, and score consolidation algorithms',
              'Technical association with the FIA brand, adding academic credibility and market trust',
            ],
            impact: 'Transforms corporate awards and evaluations into auditable, transparent, and prestigious market benchmarks.',
            diagram: 'premiacao',
          },
          {
            id: 'business-process-review',
            num: '2.3',
            title: 'Business process review',
            tag: 'AS-IS → TO-BE & Productivity',
            desc: 'AS-IS analysis (mapping where needed) and process redesign aimed at increasing operational efficiency, improving quality, reducing rework, and enhancing cross-functional coordination.',
            challenge: 'When operational costs grow faster than revenue, internal lead times lag, and teams spend excessive energy fixing errors or waiting on approvals.',
            deliverables: [
              'Targeted AS-IS mapping focused on critical friction points and waste',
              'TO-BE process redesign oriented toward flow, quality, automation, and speed',
              'Operational standards, internal SLAs, and clear cross-functional handoff protocols',
              'Implementation roadmap with efficiency, rework-reduction, and quality metrics',
            ],
            impact: 'Unlocks immediate productive capacity, reduces non-quality costs, and accelerates end-to-end delivery cycles.',
            diagram: 'processos',
          },
          {
            id: 'operational-data-insights',
            num: '2.4',
            title: 'Insights from operational data',
            tag: 'Advanced Statistics & Machine Learning',
            desc: 'Analysis of operational data using sophisticated statistical and machine learning techniques to uncover patterns, systematic errors, and non-obvious business opportunities across sales, operations, targets, and team performance datasets.',
            challenge: 'Many organizations sit on rich sales, operations, and target datasets but rely solely on backward-looking dashboards—missing systematic anomalies and hidden value levers.',
            deliverables: [
              'Exploratory and inferential modeling across historical sales, operations, target, and team datasets',
              'Application of machine learning algorithms (clustering, regression, anomaly detection)',
              'Identification of systematic errors, margin leakage, and hidden high-performance patterns',
              'Executive playbook of actionable insights with estimated financial and operational return',
            ],
            impact: 'Turns existing raw data into tangible competitive advantage, correcting systematic distortions and unlocking new efficiency and revenue sources.',
            diagram: 'insights',
          },
          {
            id: 'smart-contract-management',
            num: '2.5',
            title: 'Smart contract management',
            tag: 'Automation, Integrity & SLAs',
            desc: 'Intelligent automation of performance monitoring and administrative contract management routines, with consolidated integrity analysis and tracking of deadlines and commitments.',
            challenge: 'Large contract portfolios often suffer from missed deadlines, misapplied adjustments, silent SLA breaches, and heavy manual administrative overhead.',
            deliverables: [
              'Contract portfolio diagnostic and automated administrative workflow design',
              'Intelligent routines for physical and financial performance monitoring',
              'Consolidated contract integrity dashboard, expiration alerts, guarantees, and obligations',
              'Standardized SLA metrics and automated contract governance triggers',
            ],
            impact: 'Mitigates financial and legal exposure, prevents cash leakage across complex contracts, and sharply reduces manual oversight effort.',
            diagram: 'contratos',
          },
          {
            id: 'internal-communication-review',
            num: '2.6',
            title: 'Internal communication plan review',
            tag: 'Engagement & Strategic Alignment',
            desc: 'Analysis of internal communication patterns, processes, technology, and instruments, reviewing them against engagement outcomes and integration with corporate strategy.',
            challenge: 'When internal communication generates high message volume but low genuine engagement and weak front-line understanding of strategic priorities.',
            deliverables: [
              'Comprehensive audit of internal communication channels, rituals, processes, and tools',
              'Communication effectiveness diagnostic crossed with climate and engagement indicators',
              'Redesigned Internal Communication Master Plan directly linked to corporate strategy',
              'Editorial architecture, audience/channel matrix, and impact measurement metrics',
            ],
            impact: 'Transforms internal communication from an operational bulletin board into a strategic lever for engagement, cultural cohesion, and execution.',
            diagram: 'comunicacao',
          },
          {
            id: 'job-compensation-plan-review',
            num: '2.7',
            title: 'Job and compensation plan review',
            tag: 'Career, Strategy & Viability',
            desc: 'In-depth review of job and compensation plans aligned with corporate strategy and emerging themes to build a career progression model that is motivating for people, strategic for the organization, and financially viable.',
            challenge: 'Outdated job architectures facing new digital/AI roles, internal pay distortions, or rigid career paths that cause talent attrition or unsustainable payroll pressure.',
            deliverables: [
              'Strategic job architecture review aligned with future business needs and emerging themes',
              'Clear, motivating career progression tracks (specialist, management, W/Y pathways)',
              'Balanced compensation structure (internal equity, external competitiveness, financial viability)',
              'Payroll financial modeling and clear rules for placement, merit, and promotion',
            ],
            impact: 'Attracts and retains high-performing talent with clear growth horizons while ensuring full financial predictability and sustainability.',
            diagram: 'carreira',
          },
        ],
      },
    ],
  },
};

