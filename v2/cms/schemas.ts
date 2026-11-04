export const artigoPeriodicoSchema = {
  name: 'artigoPeriodico',
  title: 'Artigo em Periódico',
  type: 'document',
  fields: [
    {
      name: 'ano',
      title: 'Ano de Publicação',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1990).max(2035),
    },
    {
      name: 'titulo',
      title: 'Título do Artigo',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'periodico',
      title: 'Nome do Periódico / Revista Científica',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'url',
      title: 'Link para o Artigo (opcional)',
      type: 'url',
    },
  ],
  orderings: [
    {
      title: 'Mais recentes primeiro',
      name: 'anoDesc',
      by: [{ field: 'ano', direction: 'desc' }],
    },
  ],
};

export const congressoSchema = {
  name: 'congresso',
  title: 'Congresso / Conferência',
  type: 'document',
  fields: [
    {
      name: 'ano',
      title: 'Ano',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'titulo',
      title: 'Título do Trabalho',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'evento',
      title: 'Nome do Evento / Cidade',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
  ],
};

export const livroSchema = {
  name: 'livro',
  title: 'Livro Publicado',
  type: 'document',
  fields: [
    {
      name: 'ano',
      title: 'Ano',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'titulo',
      title: 'Título do Livro',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'editora',
      title: 'Editora e Detalhes',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'url',
      title: 'Link para Compra (ex: Amazon)',
      type: 'url',
    },
  ],
};

export const capituloSchema = {
  name: 'capitulo',
  title: 'Capítulo de Livro',
  type: 'document',
  fields: [
    {
      name: 'ano',
      title: 'Ano',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'titulo',
      title: 'Título do Capítulo',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'livro',
      title: 'Livro / Coletânea',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'editora',
      title: 'Editora',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
  ],
};

export const premioSchema = {
  name: 'premio',
  title: 'Prêmio / Reconhecimento',
  type: 'document',
  fields: [
    {
      name: 'ano',
      title: 'Ano',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'premio',
      title: 'Nome do Prêmio',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'concedido',
      title: 'Instituição que Concedeu',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
  ],
};

export const midiaSchema = {
  name: 'midia',
  title: 'Na Mídia / Entrevistas',
  type: 'document',
  fields: [
    {
      name: 'ano',
      title: 'Ano',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'titulo',
      title: 'Título da Matéria / Entrevista',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'tipo',
      title: 'Tipo (ex: Entrevista, Mesa redonda, Artigo)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'url',
      title: 'Link para Matéria (se houver)',
      type: 'url',
    },
  ],
};

export const artigoOpiniaoSchema = {
  name: 'artigoOpiniao',
  title: 'Artigo de Opinião (IstoÉ Dinheiro)',
  type: 'document',
  fields: [
    {
      name: 'titulo',
      title: 'Título do Artigo de Opinião',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
  ],
};

export const linkBioSchema = {
  name: 'linkBio',
  title: 'Links da Bio (Instagram)',
  type: 'document',
  fields: [
    {
      name: 'titulo',
      title: 'Título do Link',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subtitulo',
      title: 'Subtítulo / Descrição Curta (opcional)',
      type: 'string',
    },
    {
      name: 'url',
      title: 'URL de Destino',
      description: 'Pode ser link externo (https://...) ou página do site (/consultoria/...)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'categoria',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Artigo / Publicação', value: 'Artigo' },
          { title: 'Consultoria', value: 'Consultoria' },
          { title: 'Palestra', value: 'Palestra' },
          { title: 'Newsletter', value: 'Newsletter' },
          { title: 'WhatsApp / Contato', value: 'WhatsApp' },
          { title: 'Geral', value: 'Geral' },
        ],
      },
      initialValue: 'Geral',
    },
    {
      name: 'tagDestaque',
      title: 'Tag de Destaque (opcional)',
      description: 'Ex: NOVO, DESTAQUE, EDIÇÃO DA SEMANA',
      type: 'string',
    },
    {
      name: 'destaque',
      title: 'Card em Destaque?',
      description: 'Aplica visual evidenciado com gradiente e borda iluminada',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'imagem',
      title: 'Thumbnail / Imagem do Link (opcional)',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'ativo',
      title: 'Link Ativo?',
      description: 'Desative para ocultar temporariamente sem precisar apagar',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'ordem',
      title: 'Ordem de Exibição',
      description: 'Menor número aparece primeiro (ex: 1, 2, 3...)',
      type: 'number',
      initialValue: 1,
    },
  ],
  orderings: [
    {
      title: 'Ordem manual',
      name: 'ordemAsc',
      by: [{ field: 'ordem', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'titulo',
      subtitle: 'subtitulo',
      media: 'imagem',
      ativo: 'ativo',
    },
    prepare({ title, subtitle, media, ativo }: any) {
      return {
        title: `${ativo === false ? '⛔ [Inativo] ' : ''}${title || 'Sem título'}`,
        subtitle,
        media,
      };
    },
  },
};

export const schemaTypes = [
  artigoPeriodicoSchema,
  congressoSchema,
  livroSchema,
  capituloSchema,
  premioSchema,
  midiaSchema,
  artigoOpiniaoSchema,
  linkBioSchema,
];
