import type { Metadata } from 'next';
import { SITE } from '../constants/site';

type PageMetaInput = {
  title: string;
  description: string;
  /** Path of the page, e.g. `/about`. Used for the canonical URL and og:url. */
  path: string;
  /** Exclude the page from search results (thank-you pages etc.). */
  noIndex?: boolean;
};

/** Per-page metadata with a canonical URL and matching Open Graph / Twitter tags. */
export function pageMetadata({ title, description, path, noIndex }: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${SITE.name}`, description, url: path },
    twitter: { title: `${title} | ${SITE.name}`, description },
    ...(noIndex ? { robots: { index: false, follow: true } } : {})
  };
}
