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

export const schemaTypes = [
  artigoPeriodicoSchema,
  congressoSchema,
  livroSchema,
  capituloSchema,
  premioSchema,
  midiaSchema,
  artigoOpiniaoSchema,
];
