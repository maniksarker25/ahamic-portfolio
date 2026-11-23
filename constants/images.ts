/**
 * Every image used by the site, with its intrinsic size so `next/image`
 * can reserve space (no layout shift) and serve resized AVIF/WebP versions.
 */
export type SiteImage = { src: string; width: number; height: number };

export const IMAGES = {
  TEAM_COLLABORATION: { src: '/ahamic_team_collaboration.jpg', width: 1376, height: 768 },
  TEAM_DEV: { src: '/team_dev_1.jpg', width: 896, height: 1200 },
  TEAM_DESIGNER: { src: '/team_dev_2.jpg', width: 896, height: 1200 },
  TEAM_PAIR: { src: '/team_dev_3.jpg', width: 896, height: 1200 },
  PROJECT_SAAS: { src: '/ahamic_light_dashboard.jpg', width: 1376, height: 768 },
  PROJECT_PAYMENTS: { src: '/80b80db9-5472-4e5c-91e1-09bfcef8ccc4.jpg', width: 1200, height: 896 },
  PROJECT_HEALTHCARE: { src: '/f4326ad9-4fb9-488e-9fcd-c2dffa3c2af8.jpg', width: 1200, height: 896 },
  PROJECT_LOGISTICS: { src: '/1fa0da71-de38-41c2-b608-577a61facba6.jpg', width: 1200, height: 896 },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof IMAGES;
