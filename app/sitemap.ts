import type { MetadataRoute } from 'next';
import { SITE, SERVICES, PROJECTS } from '../constants/site';

type Entry = MetadataRoute.Sitemap[number];

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, changeFrequency: Entry['changeFrequency'] = 'monthly'): Entry => ({
    url: `${SITE.url}${path}`,
    changeFrequency,
    priority
  });

  return [
  page('/', 1.0, 'weekly'),
  page('/services', 0.9),
  page('/portfolio', 0.9),
  page('/about', 0.8),
  page('/pricing', 0.8),
  page('/contact', 0.8),
  page('/book', 0.7),
  page('/blog', 0.6, 'weekly'),
  page('/careers', 0.5),
  ...SERVICES.map((s) => page(`/services/${s.slug}`, 0.8)),
  ...PROJECTS.map((p) => page(`/portfolio/${p.slug}`, 0.7)),
  ...['privacy', 'terms', 'cookies'].map((doc) => page(`/legal/${doc}`, 0.2, 'yearly'))];

}
