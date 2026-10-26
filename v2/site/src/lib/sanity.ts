import { createClient } from '@sanity/client';
import {
  ARTIGOS_PERIODICOS,
  CONGRESSOS,
  LIVROS,
  CAPITULOS,
  PREMIOS,
  MIDIA,
  ARTIGOS_OPINIAO,
  type ArtigoPeriodico,
  type Congresso,
  type Livro,
  type Capitulo,
  type Premio,
  type Midia,
} from '../data/publicacoes';

const projectId = import.meta.env.SANITY_PROJECT_ID || '84rosfy5';
const dataset = import.meta.env.SANITY_DATASET || 'production';
const apiVersion = import.meta.env.SANITY_API_VERSION || '2024-01-01';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

export interface PublicacoesData {
  artigos: ArtigoPeriodico[];
  congressos: Congresso[];
  livros: Livro[];
  capitulos: Capitulo[];
  premios: Premio[];
  midia: Midia[];
  artigosOpiniao: string[];
}

export async function getPublicacoesData(): Promise<PublicacoesData> {
  try {
    const query = `{
      "artigos": *[_type == "artigoPeriodico"] | order(ano desc) {
        ano,
        titulo,
        periodico,
        url
      },
      "congressos": *[_type == "congresso"] | order(ano desc) {
        ano,
        titulo,
        evento
      },
      "livros": *[_type == "livro"] | order(ano desc) {
        ano,
        titulo,
        editora,
        url
      },
      "capitulos": *[_type == "capitulo"] | order(ano desc) {
        ano,
        titulo,
        livro,
        editora
      },
      "premios": *[_type == "premio"] | order(ano desc) {
        ano,
        premio,
        concedido
      },
      "midia": *[_type == "midia"] | order(ano desc) {
        ano,
        titulo,
        tipo,
        url
      },
      "artigosOpiniao": *[_type == "artigoOpiniao"].titulo
    }`;

    const res = await sanityClient.fetch(query);

    return {
      artigos: res?.artigos?.length ? res.artigos : ARTIGOS_PERIODICOS,
      congressos: res?.congressos?.length ? res.congressos : CONGRESSOS,
      livros: res?.livros?.length ? res.livros : LIVROS,
      capitulos: res?.capitulos?.length ? res.capitulos : CAPITULOS,
      premios: res?.premios?.length ? res.premios : PREMIOS,
      midia: res?.midia?.length ? res.midia : MIDIA,
      artigosOpiniao: res?.artigosOpiniao?.length ? res.artigosOpiniao : ARTIGOS_OPINIAO,
    };
  } catch (err) {
    console.warn('[Sanity] Falha ao buscar dados ou projeto sem conexão ativa. Usando dados estáticos locais.', err);
    return {
      artigos: ARTIGOS_PERIODICOS,
      congressos: CONGRESSOS,
      livros: LIVROS,
      capitulos: CAPITULOS,
      premios: PREMIOS,
      midia: MIDIA,
      artigosOpiniao: ARTIGOS_OPINIAO,
    };
  }
}
