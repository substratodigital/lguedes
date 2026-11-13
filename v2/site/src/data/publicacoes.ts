export interface ArtigoPeriodico {
  ano: number;
  titulo: string;
  periodico: string;
  url: string | null;
}

export interface Congresso {
  ano: number;
  titulo: string;
  evento: string;
  url?: string | null;
}

export interface Livro {
  ano: number;
  titulo: string;
  editora: string;
  url: string | null;
  tipo?: string;
  capaUrl?: string | null;
}

export interface Capitulo {
  ano: number;
  titulo: string;
  livro: string;
  editora: string;
  url?: string | null;
}

export interface Premio {
  ano: number;
  premio: string;
  concedido: string;
}

export interface Midia {
  ano: number;
  titulo: string;
  tipo: string;
  url: string | null;
}

export interface TextoRevista {
  titulo: string;
  veiculo: string;
  url: string;
}

export interface LeituraAtual {
  titulo: string;
  autor: string;
  nota: string;
  tag: string;
}

export const ARTIGOS_PERIODICOS: ArtigoPeriodico[] = [
  {
    ano: 2025,
    titulo: "Utilização de inteligência artificial para identificação de riscos: uma abordagem conceitual",
    periodico: "Project Design Management",
    url: "https://projectdesignmanagement.com.br/produto/utilizacao-de-inteligencia-artificial-para-identificacao-de-riscos-uma-abordagem-conceitual/",
  },
  {
    ano: 2024,
    titulo: "Artificial intelligence adoption in public organizations: a case study",
    periodico: "Future Studies Research Journal – Future, v. 16, p. e860-26",
    url: "https://www.revistafuture.org/FSRJ/article/view/860",
  },
  {
    ano: 2024,
    titulo: "Barreiras à adoção de IA em organizações do setor público brasileiro",
    periodico: "Cadernos EBAPE.BR",
    url: null,
  },
  {
    ano: 2019,
    titulo: "Uma discussão teórica acerca dos fatores que influenciam a sobrevivência dos clusters de negócios",
    periodico: "Revista Eletrônica de Estratégia & Negócios, v. 11, p. 3-22",
    url: "https://portaldeperiodicos.animaeducacao.com.br/index.php/EeN/article/view/4927",
  },
  {
    ano: 2019,
    titulo: "The importance of the atmosphere of the environment in Brazilian physical retail in 2030",
    periodico: "Revista de Administração da UFSM, v. 12, p. 1278-1292",
    url: null,
  },
  {
    ano: 2018,
    titulo: "Technology roadmapping: A methodological proposition to refine Delphi results",
    periodico: "Technological Forecasting and Social Change, v. 126, p. 194-206",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S0040162516306734?via%3Dihub",
  },
  {
    ano: 2017,
    titulo: "O mapeamento de uma cadeia extrativista na Amazônia: Arapaima Gigas em Reservas de Desenvolvimento Sustentável",
    periodico: "RGSA (ANPAD), v. 11, p. 02",
    url: "https://rgsa.openaccesspublications.org/rgsa/article/view/1222",
  },
  {
    ano: 2015,
    titulo: "Designers at work: An introductory study on the practice of Design Thinking in Brazil",
    periodico: "Business Management Review (BMR), v. 4, p. 397-407",
    url: null,
  },
  {
    ano: 2010,
    titulo: "La Importancia De La Tecnología De Búsqueda En La Web, La Innovación Y El Modelo De Negocios, Para Explicar El Éxito De Google",
    periodico: "Espacios (Caracas), v. 31, p. 4-8",
    url: null,
  },
  {
    ano: 2009,
    titulo: "Uma proposta de modelo preditivo para o crescimento da telefonia celular no Brasil",
    periodico: "Future Studies Research Journal, v. 01, p. 28-47",
    url: "https://www.revistafuture.org/FSRJ/article/view/2",
  },
  {
    ano: 2007,
    titulo: "Modelos de desenvolvimento organizacional: construindo uma abordagem integrada",
    periodico: "Cadernos Camilliani, v. 8, p. 73-83",
    url: null,
  },
];

export const CONGRESSOS: Congresso[] = [
  {
    ano: 2025,
    titulo: "O futuro da profissão contábil",
    evento: "Conexão Contábil Nacional (CFC, Natal/RN)",
  },
  {
    ano: 2025,
    titulo: "AI-driven agricultural innovations for food security: Opportunities and challenges in a changing global landscape",
    evento: "IAMOT — Technology Management for Intelligent, Open and Responsible Organizations and Ecosystems, Montreal/CAN",
  },
  {
    ano: 2025,
    titulo: "AI in Public Services: A framework for effective adoption and management",
    evento: "IAMOT — Technology Management for Intelligent, Open and Responsible Organizations and Ecosystems, Montreal/CAN",
  },
  {
    ano: 2024,
    titulo: "Gestão da inovação",
    evento: "SEMEAD — FEA/USP, São Paulo",
  },
  {
    ano: 2023,
    titulo: "ESG na indústria",
    evento: "SUMMIT ESG 2023",
    url: "https://www.youtube.com/watch?v=fcS3XNZz4q4",
  },
  {
    ano: 2022,
    titulo: "Understanding innovation adoption differences between US and Brazil: A comparative study on original equipment Manufacturer",
    evento: "XXV SEMEAD – USP, São Paulo",
  },
  {
    ano: 2021,
    titulo: "Novos padrões da inovação e competitividade",
    evento: "Congresso Brasileiro Online de Administração — USP",
  },
  {
    ano: 2021,
    titulo: "Maior que a soma das partes: mapeando a cadeia de valor da maior empresa pública de saneamento básico do mundo",
    evento: "XXIV SEMEAD – USP, São Paulo",
  },
  {
    ano: 2021,
    titulo: "Measuring what matters: establishing performance metrics for the largest public maintenance operation in Latin America",
    evento: "Triple Helix Conference 2021, São Paulo",
  },
  {
    ano: 2020,
    titulo: "Gestão de risco na produção de soja com biotecnologia",
    evento: "XXIII Semead, São Paulo",
  },
  {
    ano: 2017,
    titulo: "O mapeamento de uma cadeia extrativista na Amazônia: Arapaima Gigas em Reservas de Desenvolvimento Sustentável",
    evento: "XLI Encontro da ANPAD, São Paulo",
  },
  {
    ano: 2017,
    titulo: "Inovação no Ensino de Administração: A aplicação de metodologias educacionais ativas na USP",
    evento: "XLI Encontro da ANPAD, São Paulo",
  },
  {
    ano: 2016,
    titulo: "Using Delphi as a technology roadmap designing tool",
    evento: "25th IAMOT, Orlando/FL",
  },
  {
    ano: 2016,
    titulo: "Finding the appropriate level of open innovation: Framework and application",
    evento: "25th IAMOT, Orlando/FL",
  },
  {
    ano: 2016,
    titulo: "Long-Term R&D-Based consortia: Paths to integrate basic research with company strategy",
    evento: "25th IAMOT, Orlando/FL",
  },
  {
    ano: 2016,
    titulo: "Práticas de Gestão de Talentos nas Organizações Contemporâneas",
    evento: "EnANPAD, Costa do Sauípe",
  },
  {
    ano: 2016,
    titulo: "Gestão da mudança na mitigação do impacto cultural: uma análise em fusões e aquisições",
    evento: "XIX Semead – FEA/USP, São Paulo",
  },
  {
    ano: 2016,
    titulo: "Ambidestria Organizacional: O Caso do Centro de Medicina Diagnóstica Fleury",
    evento: "XIX SemeAd – FEA/USP, São Paulo",
  },
  {
    ano: 2016,
    titulo: "Relatórios de sustentabilidade: análise crítica sobre o processo de elaboração e seus resultados",
    evento: "Redlas 2016, São Paulo",
  },
  {
    ano: 2016,
    titulo: "A Avaliação dos Resultados Intangíveis dos Projetos de P&D e Inovação – Setor Elétrico",
    evento: "V SINGEP, São Paulo",
  },
  {
    ano: 2014,
    titulo: "Business Model Innovation: AB InBev Case",
    evento: "IAMOT 2014, Washington",
  },
  {
    ano: 2014,
    titulo: "Technology Forecasting Techniques to Reduce Weight in Shock Absorbers",
    evento: "IAMOT 2014, Washington",
  },
  {
    ano: 2014,
    titulo: "Measures that Matter: Strategically Tracking Innovation Initiatives",
    evento: "23rd IAMOT, Washington",
  },
  {
    ano: 2014,
    titulo: "Estudo introdutório sobre a prática do Design Thinking por empresas de consultoria",
    evento: "EnANPAD 2014, Rio de Janeiro",
  },
  {
    ano: 2013,
    titulo: "Contributions to global R&D coordination study: Main influencing factors and the outline of a coordination support system",
    evento: "IAMOT 2013, Porto Alegre",
  },
  {
    ano: 2013,
    titulo: "Seja a Mudança que você quer ver no Mundo: Práticas Inovadoras em Gestão de Pessoas",
    evento: "VI Congresso CONSAD de Gestão Pública, Brasília",
  },
  {
    ano: 2013,
    titulo: "A Interação de Culturas Organizacionais e seus Desdobramentos em Projetos de Consultoria: Um Estudo de Caso",
    evento: "XVI SEMEAD – FEA/USP, São Paulo",
  },
  {
    ano: 2013,
    titulo: "Inovação na Organização Ambidestra: Estudo de caso em um centro de medicina diagnóstica",
    evento: "SIMPOI 2013, São Paulo",
  },
  {
    ano: 2012,
    titulo: "The Presence of an Innovative Culture Across the Company and Differences Among Functional Areas",
    evento: "IAMOT 2012, Massachusetts",
  },
  {
    ano: 2011,
    titulo: "Innovative Culture and Product Development Success at Cristália: A Brazilian High Technology Company of the Pharmaceutical Sector",
    evento: "IAMOT 2011, Miami Beach",
  },
  {
    ano: 2011,
    titulo: "Impact of R&D Internationalization on the Coordination of New Product Development Activities: the 3M Dust Suppressant Project Case",
    evento: "IAMOT 2011, Miami Beach",
  },
  {
    ano: 2010,
    titulo: "Global R&D Coordination Assessment: 3M Case",
    evento: "19th IAMOT, Cairo",
  },
  {
    ano: 2010,
    titulo: "Competitive Technology Intelligence Maturity Level Assessment: conceptual framework and application",
    evento: "19th IAMOT, Cairo",
  },
  {
    ano: 2009,
    titulo: "Internationalization of R&D at 3M focusing on Wind Energy Business: Conceptual Model and Application",
    evento: "18th IAMOT, Miami",
  },
  {
    ano: 2009,
    titulo: "The organizational environment relevance to adopt an innovation: the e-learning use by employees",
    evento: "18th IAMOT, Miami",
  },
  {
    ano: 2008,
    titulo: "Adoção Organizacional de Inovações: Um Estudo sobre a Decisão de Adotar a Tecnologia de Celulares de Terceira Geração",
    evento: "XI Semead, São Paulo",
  },
  {
    ano: 2007,
    titulo: "E-Surveys: Vantagens e Limitações dos Questionários Eletrônicos via Internet no Contexto da Pesquisa Científica",
    evento: "SemeAd – FEA/USP, São Paulo",
  },
  {
    ano: 2007,
    titulo: "e-Learning Scorecard: Proposta para Avaliação de Cursos On-Line",
    evento: "Congresso Internacional de Educação a Distância, Curitiba",
  },
  {
    ano: 2006,
    titulo: "O Caso Fleury: Alinhamento Estratégico da Tecnologia da Informação",
    evento: "SIMPOI 2006, São Paulo",
  },
];

export const LIVROS: Livro[] = [
  {
    ano: 2025,
    titulo: "Prompts para Contabilidade",
    editora: "E-book",
    url: null,
    tipo: "E-book",
  },
  {
    ano: 2018,
    titulo: "Criatividade, Modelos Mentais e Inovação",
    editora: "Editora Senac · ISBN 9788539621453 · 273p.",
    url: "https://www.amazon.com.br/Criatividade-modelos-mentais-inova%C3%A7%C3%A3o-Universit%C3%A1ria-ebook/dp/B07H8R5J27",
    tipo: "Livro",
  },
];

export const CAPITULOS: Capitulo[] = [
  {
    ano: 2025,
    titulo: "IA e o papel da liderança",
    livro: "O futuro dos negócios: inteligência artificial como ferramenta de transformação",
    editora: "Livraria da Travessa",
    url: "https://www.travessa.com.br/ProdutoAmp.aspx?CodArtigo=7943e0ac-c550-4ab5-8660-b0a7b8bc0ce8",
  },
  {
    ano: 2023,
    titulo: "Faça a coisa certa: elaborando uma estratégia para negócios sustentáveis (p. 29-44)",
    livro: "ESG – Environmental, Social and Governance (Coord. Luis Carlos Szymonowicz; Yun Ki Lee; Rui Aurélio de Lacerda Badaró; Paulo Perrotti)",
    editora: "Arraes Editores · ISBN 9786559292455",
    url: null,
  },
  {
    ano: 2014,
    titulo: "Innovation in Services: The Case of Fleury, a Diagnostic Medical Center (p. 211-232)",
    livro: "Managing Consumer Services (Baglieri, Enzo; Karmarkar, Uday)",
    editora: "Springer International Publishing, Switzerland · ISBN 3319042882",
    url: null,
  },
  {
    ano: 2013,
    titulo: "Práticas inovadoras em Gestão de Pessoas: um estudo de caso no setor de saúde (p. 319-341)",
    livro: "Contribuições para a Gestão de Pessoas na Administração Pública (Janny, H; Bassoti, I; Santos, T)",
    editora: "ISBN 9788588377073",
    url: null,
  },
  {
    ano: 2012,
    titulo: "Lições Aprendidas com o Sucesso do Google (p. 20-51)",
    livro: "Como vencer a concorrência de forma lucrativa: Ensinamentos do Google, Intel, Sap, Cielo, Man, Wahler, Petrobrás e outras empresas",
    editora: "Editora Atlas · ISBN 9788522470860",
    url: null,
  },
];

export const PREMIOS: Premio[] = [
  { ano: 2020, premio: "Patrono da Turma de Graduação", concedido: "FIA Business School" },
  { ano: 2019, premio: "Outstanding Academic Performance Award – MBA Gestão de Negócios, Inovação e Empreendedorismo T33", concedido: "FIA Business School" },
  { ano: 2019, premio: "Paraninfo da Turma 9 de Graduação em Administração de Empresas", concedido: "FIA Business School" },
  { ano: 2018, premio: "Outstanding Academic Performance Award – MBA Gestão de Negócios, Inovação e Empreendedorismo", concedido: "FIA Business School" },
  { ano: 2017, premio: "Outstanding Academic Performance Award – Graduação Administração de Empresas T6", concedido: "FIA Business School" },
  { ano: 2017, premio: "Best Professor Award – MBA Executivo Internacional T46", concedido: "FIA Business School" },
  { ano: 2017, premio: "Outstanding Academic Performance Award – CapExecutivo T10", concedido: "FIA Business School" },
  { ano: 2016, premio: "Paraninfo", concedido: "FIA Business School" },
  { ano: 2015, premio: "Professor homenageado – Desempenho Acadêmico", concedido: "FIA Business School" },
  { ano: 2015, premio: "Melhor Desempenho Acadêmico", concedido: "MBA Conhecimento, Tecnologia e Inovação (classe de 2015)" },
  { ano: 2015, premio: "Paraninfo", concedido: "FIA Business School" },
  { ano: 2014, premio: "Melhor Professor do Curso", concedido: "Fiat-Chrysler Executive Master (class 2014)" },
  { ano: 2013, premio: "Melhor trabalho do congresso (track Cultura Organizacional)", concedido: "XVI Semead – Universidade de São Paulo" },
  { ano: 2013, premio: "Finalista do Prêmio Mário Covas de Inovação no Setor Público", concedido: "Estado de São Paulo" },
  { ano: 2012, premio: "Melhor Professor do Curso", concedido: "MBA Conhecimento, Tecnologia e Inovação" },
  { ano: 2004, premio: "Latin America MootCorp", concedido: "MootCorp" },
  { ano: 2004, premio: "Dissertação aprovada com Mérito Acadêmico", concedido: "Fundação Getúlio Vargas" },
];

export const MIDIA: Midia[] = [
  {
    ano: 2026,
    titulo: "Do planejamento à Execução",
    tipo: "Instagram · Entrevista",
    url: "https://www.instagram.com/p/DTQIvA3ibRQ/?img_index=5&igsh=c293dzJhbDg2bWt5",
  },
  {
    ano: 2026,
    titulo: "IA consegue escalar campanhas, mas a publicidade ainda testa seus limites",
    tipo: "Propmark",
    url: "https://propmark.com.br/ia-consegue-escalar-campanhas-mas-a-publicidade-ainda-testa-seus-limites/",
  },
  {
    ano: 2026,
    titulo: "Invasões de IA são fruto da vulnerabilidade técnica e da governança dos sistemas",
    tipo: "O Brasilianista",
    url: "https://obrasilianista.com.br/yulia/invasoes-ia-vulnerabilidade-tecnica-governanca-sistemas/",
  },
  {
    ano: 2026,
    titulo: "Piauí mira soberania digital, mas governança e humores políticos são desafios",
    tipo: "Investindo Por Aí",
    url: "https://investindoporai.com.br/piaui-mira-soberania-digital-mas-governanca-e-humores-politicos-sao-desafios",
  },
  {
    ano: 2025,
    titulo: "Com avanço da automação e da IA, soft skills viram diferencial estratégico",
    tipo: "Viva",
    url: "https://viva.com.br/carreira-e-educacao/com-avanco-da-automacao-e-da-ia-soft-skills-viram-diferencial-estrategico.html",
  },
  {
    ano: 2025,
    titulo: "Era Trump 2.0: o impacto da volta de Donald Trump no Brasil e o futuro da IA",
    tipo: "Consumidor Moderno",
    url: "https://consumidormoderno.com.br/donald-trump-ia-brasil/",
  },
  {
    ano: 2025,
    titulo: "Especialistas explicam os motivos que levaram o ChatGPT a ficar mais 'mal-humorado' após atualização",
    tipo: "IA Brasil Notícias",
    url: "https://iabrasilnoticias.com.br/especialistas-explicam-os-motivos-que-levaram-o-chatgpt-a-ficar-mais-mal-humorado-apos-atualizacao",
  },
  {
    ano: 2025,
    titulo: "O ano das big techs: como as empresas de tecnologia assumiram o protagonismo global em 2025",
    tipo: "Época Negócios",
    url: "https://epocanegocios.globo.com/tecnologia/noticia/2025/12/o-ano-das-big-techs-como-as-empresas-de-tecnologia-assumiram-o-protagonismo-global-em-2025.ghtml",
  },
  {
    ano: 2025,
    titulo: "Queda da Cloudflare Reacende Alerta sobre Concentração da Infraestrutura da Web",
    tipo: "Forbes Tech",
    url: "https://forbes.com.br/forbes-tech/2025/11/queda-da-cloudflare-reacende-alerta-sobre-concentracao-da-infraestrutura-da-web/",
  },
  {
    ano: 2024,
    titulo: "Cogna e Mackenzie fazem aliança para pós-graduação digital",
    tipo: "Valor Econômico",
    url: "https://valor.globo.com/empresas/noticia/2024/04/04/cogna-e-mackenzie-fazem-alianca-para-pos-graduacao-digital.ghtml",
  },
  {
    ano: 2024,
    titulo: "Como a Nvidia atropelou gigantes para se tornar uma das empresas mais valiosas do mundo",
    tipo: "Inteligência Financeira",
    url: "https://inteligenciafinanceira.com.br/mercado-financeiro/negocios/nvidia-atropelou-gigantes/",
  },
  {
    ano: 2024,
    titulo: "Duas décadas de interação nas redes sociais: o que há para comemorar",
    tipo: "Propmark",
    url: "https://www.propmarkdigital.com.br/edicao-de-15-de-janeiro-de-2024/68598054/15",
  },
  {
    ano: 2024,
    titulo: "Em Davos, CEO da Telefônica (VIVT3) pede por desregulamentação na Europa para mais competitividade tecnológica",
    tipo: "Suno Notícias",
    url: "https://www.suno.com.br/noticias/telefonica-vivt3-ceo-pede-desregulamentacao-tecnologia-cpf/",
  },
  {
    ano: 2024,
    titulo: "Legislação sobre Inteligência Artificial na UE pode servir de modelo para o Brasil",
    tipo: "InvesTalk BB",
    url: "https://investalk.bb.com.br/noticia/legislacao-sobre-inteligencia-artificial-na-ue-pode-servir-de-modelo-para-o-brasil",
  },
  {
    ano: 2024,
    titulo: "Avanço da tecnologia tem mudado a profissão, o mercado de trabalho e o perfil dos profissionais",
    tipo: "Revista RBA",
    url: "https://revistarba.org.br/avanco-da-tecnologia-tem-mudado-a-profissao-o-mercado-de-trabalho-e-o-perfil-dos-profissionais/",
  },
  {
    ano: 2023,
    titulo: "Em quais ações o ChatGPT investiria na Bolsa brasileira?",
    tipo: "UOL Economia · Suno",
    url: "https://economia.uol.com.br/mais/suno/noticias/2023/02/22/em-quais-acoes-o-chatgpt-investiria-na-bolsa-brasileira.htm",
  },
  {
    ano: 2023,
    titulo: "Escolas devem usar ChatGPT para potencializar aquisição de conhecimento, diz especialista",
    tipo: "Estadão Educação",
    url: "https://www.estadao.com.br/educacao/escolas-devem-usar-chatgpt-para-potencializar-aquisicao-de-conhecimento-diz-especialista/",
  },
  {
    ano: 2023,
    titulo: "Gestão errática de Musk no Twitter abre espaço para concorrentes; conheça os principais",
    tipo: "IstoÉ Dinheiro",
    url: "https://istoedinheiro.com.br/gestao-erratica-de-musk-no-twitter-abre-espaco-para-concorrentes-conheca-os-principais/",
  },
  {
    ano: 2023,
    titulo: "Hype da vez: ChatGPT é o novo metaverso?",
    tipo: "Forbes Tech",
    url: "https://forbes.com.br/forbes-tech/2023/02/chatgpt-e-o-novo-metaverso-quanto-tempo-dura-o-hype/",
  },
  {
    ano: 2022,
    titulo: "ESG? Dicas para o investidor fugir do greenwashing",
    tipo: "TC News",
    url: "https://tc.com.br/noticias/mercados/esg-dicas-para-o-investidor-fugir-do-greenwashing",
  },
  {
    ano: 2022,
    titulo: "Greenwashing - Avaliação de riscos e prevenção",
    tipo: "CBN · FIACast",
    url: "https://audioglobo.globo.com/cbn/podcast/feed/891/fiacast",
  },
  {
    ano: 2022,
    titulo: "Medir o desempenho das empresas é o caminho para aprimorar ESG, dizem especialistas",
    tipo: "Estadão Economia",
    url: "https://economia.estadao.com.br/noticias/negocios,summit-esg-2022-desempenho-empresas,70004097714",
  },
  {
    ano: 2022,
    titulo: "Momento ESG - O dilema em torno dos riscos ESG nas empresas brasileiras",
    tipo: "YouTube · Painel",
    url: "https://youtu.be/Yvz8lS6J56k",
  },
  {
    ano: 2022,
    titulo: "Os percalços do mundo ESG",
    tipo: "PlenaMata",
    url: "https://plenamata.eco/2022/07/08/os-percalcos-do-mundo-esg/",
  },
  {
    ano: 2021,
    titulo: "Em crise, indústria brasileira busca caminhos para se reinventar",
    tipo: "Época Negócios",
    url: "https://epocanegocios.globo.com/360/noticia/2021/10/em-crise-industria-brasileira-busca-caminhos-para-se-reinventar.html",
  },
  {
    ano: 2020,
    titulo: "Todos querem inovação, mas como aprender a fazer isso no seu trabalho?",
    tipo: "UOL Economia",
    url: "https://economia.uol.com.br/empregos-e-carreiras/noticias/redacao/2020/03/05/inovacao-todos-querem-como-aprender-trabalho.htm",
  },
  {
    ano: 2019,
    titulo: "Adoção de inteligência artificial por empresas maduras envolve papel ativo de líderes",
    tipo: "InfoMoney · UM Brasil",
    url: "https://www.infomoney.com.br/colunistas/um-brasil/adocao-de-inteligencia-artificial-por-empresas-maduras-envolve-papel-ativo-de-lideres/",
  },
  {
    ano: 2019,
    titulo: "Como estimular o intraempreendedorismo dentro da sua empresa",
    tipo: "Época Negócios",
    url: "https://epocanegocios.globo.com/Empresa/noticia/2019/08/como-estimular-o-intraempreendedorismo-dentro-da-sua-empresa.html",
  },
  {
    ano: 2019,
    titulo: "Presente e futuro das cidades inteligentes",
    tipo: "Rádio Eldorado · Estadão",
    url: "https://eldorado.estadao.com.br/audios/programas/start/start-eldorado-presente-e-futuro-das-cidades-inteligentes",
  },
];

export const TEXTOS_REVISTAS: TextoRevista[] = [
  {
    titulo: "Coluna de Luís Guedes na Fast Company Brasil",
    veiculo: "Fast Company Brasil",
    url: "https://fastcompanybrasil.com/autor/luis-guedes/",
  },
  {
    titulo: "Humanoides mais próximos do que nunca",
    veiculo: "O Especialista · Safra",
    url: "https://oespecialista.safra.com.br/opinioes/humanoides-mais-proximos-do-que-nunca/",
  },
  {
    titulo: "Utilização de inteligência artificial para identificação de riscos: uma abordagem conceitual",
    veiculo: "Project Design Management",
    url: "https://projectdesignmanagement.com.br/produto/utilizacao-de-inteligencia-artificial-para-identificacao-de-riscos-uma-abordagem-conceitual/",
  },
];

export const ARTIGOS_OPINIAO: string[] = [
  "Humanoides mais próximos do que nunca (O Especialista · Safra)",
  "Agente Smith, é você? A ascensão dos agentes de Inteligência Artificial",
  "Sua empresa deve ter um Centro de Excelência em Inovação?",
  "Marketing para produtos inovadores",
  "Do risco nuclear ao risco da IA",
  "Criativos, tenazes, estudiosos e generosos",
  "Criptografia pós-quântica",
  "A ambição embriaga mais do que a glória",
  "Indústria Verde: de tendência à prioridade",
  "Computação neuromórfica: o início da jornada das máquinas pensantes",
  "Aprendizado como legado",
  "CrIAtividade",
  "Hiperconexão: faça valer a pena",
  "A arte Zen de estabelecer métricas para inovação",
  "Breve ensaio sobre o paradoxo da escolha",
  "Não é somente sobre os dados",
  "Nem tudo precisa ser útil",
  "Robôs que respeitam: ética na era da IA",
  "Resultados em vez de entregas",
  "Reimaginando o conceito de sucesso",
  "O marketing nos tempos acelerados pela IA",
  "Estratégia é outra coisa",
  "Manifesto do aprendizado pela vida toda",
  "O futuro já chegou e ele é colaborativo",
  "As contradições de uma cultura inovadora",
  "Empresas digitalmente inteligentes",
  "A indústria de IA que temos e a que precisamos",
  "Seu próximo computador será invisível!",
  "Inovações radicais e os custos afundados",
  "Um bravo mundo novo",
  "Deep learning: o que fazer na fronteira da inteligência artificial",
  "Bem-vindos à era da computação em exaescala",
  "Mais de 70 anos de pesquisa sobre lançamento de novos produtos",
  "Humanos primeiro, por favor",
  "Uma universidade para chamar de sua",
  "O criativo à beira do abismo",
  "Governo aumentado pela IA: quatro pontos relevantes",
  "A simplicidade vem depois de muito esforço",
  "Escolha seus clientes, escolha seu futuro",
  "Liderança, aprendizado e IA: superando Dunning-Kruger",
  "Bioinspiração",
  "Transformação digital: uma odisseia moderna",
  "O que a Computação Quântica pode nos ensinar sobre inovações radicais",
  "A disciplina da criatividade",
  "Estratégias para proteger seu futuro profissional dos avanços da IA",
  "Computação de borda: você ainda vai ouvir falar muito sobre isso!",
  "Como a inteligência artificial generativa vai mudar o seu trabalho no futuro",
  "A ciência que move o agro e alimenta milhões",
  "O resultado da inovação",
];

export const LEITURAS_ATUAIS: LeituraAtual[] = [
  {
    titulo: "Co-Intelligence: Living and Working with AI",
    autor: "Ethan Mollick",
    tag: "IA & Liderança",
    nota: "Referência prática sobre como organizações e líderes podem integrar inteligência artificial no trabalho humano com discernimento e criação de valor.",
  },
  {
    titulo: "Good Strategy Bad Strategy",
    autor: "Richard Rumelt",
    tag: "Estratégia & Execução",
    nota: "Um clássico indispensável sobre a diferença entre metas abstratas e o verdadeiro núcleo de uma estratégia: diagnóstico claro, política orientadora e ações coerentes.",
  },
  {
    titulo: "Power and Prediction: The Disruptive Economics of Artificial Intelligence",
    autor: "Ajay Agrawal, Joshua Gans & Avi Goldfarb",
    tag: "Transformação Organizacional",
    nota: "Analisa como a IA deixa de ser apenas uma solução pontual para redesenhar sistemas de decisão, modelos de gestão e arquiteturas organizacionais inteiras.",
  },
];
