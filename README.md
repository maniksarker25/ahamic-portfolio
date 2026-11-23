# Ahamic Solutions — Next.js 16

This project was migrated from a Vite + React Router SPA to **Next.js 16** (App Router).

## What changed

- **Routing**: `react-router-dom` (`BrowserRouter`, `Routes`, `Route`) replaced by the Next.js App Router file-system routing under `app/`.
  - `/` → `app/page.tsx`
  - `/about` → `app/about/page.tsx`
  - `/services` → `app/services/page.tsx`
  - `/services/:slug` → `app/services/[slug]/page.tsx` (server component, async `params`, `generateStaticParams` for full static generation)
  - `/portfolio` → `app/portfolio/page.tsx`
  - `/portfolio/:slug` → `app/portfolio/[slug]/page.tsx` (server component, async `params`, `generateStaticParams`)
  - `/pricing` → `app/pricing/page.tsx`
  - `/contact` → `app/contact/page.tsx`
  - `/book` → `app/book/page.tsx`
  - `/blog` → `app/blog/page.tsx`
  - `/careers` → `app/careers/page.tsx`
  - `/legal/:doc` → `app/legal/[doc]/page.tsx` (server component, async `params`, `generateStaticParams`)
  - `/thank-you` → `app/thank-you/page.tsx`
  - `*` (404) → `app/not-found.tsx`
- **`<Link to="...">`** → **`<Link href="...">`** using `next/link`.
- **`useNavigate()`** → **`useRouter()`** from `next/navigation` (`navigate(path)` → `router.push(path)`).
- **`useParams()`** → dynamic routes now receive `params` (a `Promise` in Next 16) directly as a page prop, so pages are server components — no client hook needed.
- **`useLocation()`** → **`usePathname()`** from `next/navigation`.
- The old `App.tsx` + `Layout.tsx` (BrowserRouter + page-transition wrapper) became `app/layout.tsx` (root layout) plus a small client component `components/layout/PageTransition.tsx` that keeps the original `framer-motion` fade/slide transition between route changes.
- Any component using hooks, `framer-motion`, or event handlers is marked `'use client'`; purely presentational components remain Server Components for a smaller client bundle.
- `src/index.css` → `app/globals.css` (unchanged Tailwind + custom CSS).
- Vite/`react-router-dom` dependencies removed; `next`, updated `react`/`react-dom` (v19) added.

## Getting started

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Forms (contact, booking, newsletter)

Submissions are emailed to the team by a server action (`app/actions/forms.ts`) using [Resend](https://resend.com).
Copy `.env.example` to `.env.local` (and add the same variables on your hosting provider):

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | API key from resend.com |
| `CONTACT_TO_EMAIL` | no | Inbox that receives submissions (defaults to `SITE.email` in `constants/site.ts`) |
| `CONTACT_FROM_EMAIL` | no | Sender on a domain verified in Resend, e.g. `Ahamic Website <hello@ahamicsolutions.com>` |

Without `RESEND_API_KEY` the forms show visitors an error with the email address to write to, and the server logs that the message was not delivered — nothing is silently lost.

## Editing content

Most copy lives in `constants/site.ts` (services, projects, stats, FAQs, pricing, contact details). Images are registered with their dimensions in `constants/images.ts`. The hero mosaic's stat cards read from `STATS`, so they always match the Stats section.

## Checks

```bash
npx tsc --noEmit   # types
npm run lint       # ESLint (eslint.config.mjs)
npm run build      # production build
```

## Build

```bash
npm run build
npm run start
```

All static pages (including every service, portfolio, and legal-doc detail page) are pre-rendered at build time.
