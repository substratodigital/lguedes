import { translations } from './translations';

export type Lang = 'pt' | 'en';
export const LANGS: Lang[] = ['pt', 'en'];

/** Retorna o dicionário do idioma, com fallback para PT em chaves ausentes. */
export function useT(lang: Lang) {
  const base = translations.pt as any;
  const cur = (translations as any)[lang] ?? base;
  return new Proxy(cur, {
    get(target, section: string) {
      const s = target[section];
      const b = base[section];
      if (s && b && typeof s === 'object' && !Array.isArray(s)) return { ...b, ...s };
      return s ?? b;
    },
  }) as typeof translations.pt;
}

export const homePath = (lang: Lang) => (lang === 'pt' ? '/' : `/${lang}/`);

export const SITE = {
  name: 'Luís Guedes',
  url: 'https://guedes.ai',
  whatsapp: 'https://wa.me/5511999587672',
  linkedin: 'https://linkedin.com/in/lguedes',
  email: 'lguedes.sp@gmail.com',
};
