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
import { BIO_LINKS_FALLBACK, type BioLink } from '../data/links';

const projectId = import.meta.env.SANITY_PROJECT_ID || '84rosfy5';
const dataset = import.meta.env.SANITY_DATASET || 'production';
const apiVersion = import.meta.env.SANITY_API_VERSION || '2024-01-01';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  // useCdn: false garante que o build sempre reflita imediatamente documentos recém-publicados
  useCdn: false,
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

function normKey(s: string | undefined | null): string {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

/**
 * Mescla itens vindos do Sanity com o acervo estático local:
 * - Itens novos do Sanity entram automaticamente.
 * - Caso um item no Sanity tenha o mesmo título de um estático, o do Sanity prevalece.
 * - Mantém ordenação decrescente por ano.
 */
function mergeWithStatic<T extends { ano?: number }>(
  sanityItems: T[] | undefined | null,
  staticItems: T[],
  keyFn: (item: T) => string
): T[] {
  if (!Array.isArray(sanityItems) || sanityItems.length === 0) return staticItems;
  const seen = new Map<string, T>();
  for (const item of sanityItems) {
    const k = normKey(keyFn(item));
    if (k) seen.set(k, item);
  }
  for (const item of staticItems) {
    const k = normKey(keyFn(item));
    if (k && !seen.has(k)) {
      seen.set(k, item);
    }
  }
  return Array.from(seen.values()).sort((a, b) => (Number(b.ano) || 0) - (Number(a.ano) || 0));
}

function mergeStrings(sanityList: string[] | undefined | null, staticList: string[]): string[] {
  if (!Array.isArray(sanityList) || sanityList.length === 0) return staticList;
  const seen = new Set<string>();
  const out: string[] = [];
  for (const s of [...sanityList, ...staticList]) {
    if (!s) continue;
    const k = normKey(s);
    if (!seen.has(k)) {
      seen.add(k);
      out.push(s);
    }
  }
  return out;
}

export async function getPublicacoesData(): Promise<PublicacoesData> {
  try {
    const query = `{
      "artigos": *[_type == "artigoPeriodico"] | order(ano desc, _createdAt desc) {
        ano,
        titulo,
        periodico,
        url
      },
      "congressos": *[_type == "congresso"] | order(ano desc, _createdAt desc) {
        ano,
        titulo,
        evento,
        url
      },
      "livros": *[_type == "livro"] | order(ano desc, _createdAt desc) {
        ano,
        titulo,
        editora,
        url,
        "capaUrl": capa.asset->url
      },
      "capitulos": *[_type == "capitulo"] | order(ano desc, _createdAt desc) {
        ano,
        titulo,
        livro,
        editora,
        url
      },
      "premios": *[_type == "premio"] | order(ano desc, _createdAt desc) {
        ano,
        premio,
        concedido
      },
      "midia": *[_type == "midia"] | order(ano desc, _createdAt desc) {
        ano,
        titulo,
        tipo,
        url
      },
      "artigosOpiniao": *[_type == "artigoOpiniao"] | order(_createdAt desc).titulo
    }`;

    const res = await sanityClient.fetch(query);

    return {
      artigos: mergeWithStatic<ArtigoPeriodico>(res?.artigos, ARTIGOS_PERIODICOS, (x) => x.titulo),
      congressos: mergeWithStatic<Congresso>(res?.congressos, CONGRESSOS, (x) => x.titulo),
      livros: mergeWithStatic<Livro>(res?.livros, LIVROS, (x) => x.titulo),
      capitulos: mergeWithStatic<Capitulo>(res?.capitulos, CAPITULOS, (x) => x.titulo),
      premios: mergeWithStatic<Premio>(res?.premios, PREMIOS, (x) => `${x.ano}-${x.premio}`),
      midia: mergeWithStatic<Midia>(res?.midia, MIDIA, (x) => x.titulo),
      artigosOpiniao: mergeStrings(res?.artigosOpiniao, ARTIGOS_OPINIAO),
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

export async function getBioLinksData(): Promise<BioLink[]> {
  try {
    const query = `*[_type == "linkBio" && ativo != false] | order(ordem asc, _createdAt desc) {
      "id": _id,
      titulo,
      subtitulo,
      url,
      categoria,
      tagDestaque,
      destaque,
      "imagemUrl": imagem.asset->url,
      ativo,
      ordem
    }`;
    const res = await sanityClient.fetch(query);
    return res && res.length > 0 ? res : BIO_LINKS_FALLBACK;
  } catch (err) {
    console.warn('[Sanity] Falha ao buscar links da bio. Usando fallback local.', err);
    return BIO_LINKS_FALLBACK;
  }
}
