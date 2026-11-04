export interface BioLink {
  id: string;
  titulo: string;
  subtitulo?: string;
  url: string;
  categoria?: 'Artigo' | 'Consultoria' | 'Palestra' | 'Newsletter' | 'WhatsApp' | 'Geral';
  tagDestaque?: string;
  destaque?: boolean;
  imagemUrl?: string;
  ativo?: boolean;
  ordem?: number;
}

export const BIO_PROFILE = {
  nome: 'Prof. Dr. Luís Guedes',
  titulo: 'Pós-Doutor em IA pela FEA/USP',
  bio: 'Especialista em inteligência artificial, inovação, estratégia corporativa e ESG.',
  avatar: '/img/guedes-formal.webp',
  redes: {
    instagram: 'https://www.instagram.com/',
    linkedin: 'https://linkedin.com/in/lguedes',
    whatsapp: 'https://wa.me/5511999587672?text=Ol%C3%A1%2C%20Prof.%20Guedes!%20Vim%20pelo%20Instagram.',
    site: 'https://www.lguedes.com.br',
  },
};

export const BIO_LINKS_FALLBACK: BioLink[] = [
  {
    id: 'newsletter',
    titulo: 'Newsletter do Guedes no LinkedIn',
    subtitulo: 'Reflexões mensais sobre IA, inovação e o futuro do trabalho. Sem hype.',
    url: 'https://www.linkedin.com/newsletters/newsletter-do-guedes-7186097313407258624/',
    categoria: 'Newsletter',
    tagDestaque: 'GRATUITA',
    destaque: true,
    ordem: 1,
  },
  {
    id: 'consultoria-complexidade',
    titulo: 'Consultoria: Complexidade Organizacional',
    subtitulo: 'Estratégia, governança, arquitetura e liderança para organizações em transformação.',
    url: '/consultoria/complexidade-organizacional',
    categoria: 'Consultoria',
    tagDestaque: 'PORTFÓLIO',
    destaque: false,
    ordem: 2,
  },
  {
    id: 'consultoria-eficiencia',
    titulo: 'Consultoria: Eficiência e IA Aplicada',
    subtitulo: 'Inteligência de negócios, governança de dados, automação e gestão de riscos.',
    url: '/consultoria/eficiencia-e-inteligencia',
    categoria: 'Consultoria',
    tagDestaque: 'PORTFÓLIO',
    destaque: false,
    ordem: 3,
  },
  {
    id: 'artigo-istoe',
    titulo: 'Coluna Semanal na IstoÉ Dinheiro',
    subtitulo: 'Artigos de opinião e análises críticas sobre o impacto da IA nos negócios.',
    url: 'https://istoedinheiro.com.br/autor/luis-guedes/',
    categoria: 'Artigo',
    tagDestaque: 'ARTIGO',
    destaque: false,
    ordem: 4,
  },
  {
    id: 'palestras',
    titulo: 'Palestras e Mini-cursos Executivos',
    subtitulo: 'IA 360, Aceleração da IA nas Organizações e Jornada de Transformação.',
    url: '/#palestras',
    categoria: 'Palestra',
    destaque: false,
    ordem: 5,
  },
  {
    id: 'whatsapp-contato',
    titulo: 'Falar Diretamente no WhatsApp',
    subtitulo: 'Agendamento de palestras, consultoria estratégica e mentoria executiva.',
    url: 'https://wa.me/5511999999999?text=Ol%C3%A1%2C%20Prof.%20Guedes!%20Gostaria%20de%20saber%20mais%20sobre%20seus%20servi%C3%A7os.',
    categoria: 'WhatsApp',
    tagDestaque: 'DIRETO',
    destaque: false,
    ordem: 6,
  },
];
