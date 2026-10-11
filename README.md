# KES Energy Northwest website

Next.js 16 (App Router, Cache Components) + Tailwind CSS v4. Statically prerendered, deploys to Vercel with zero config.

## Pages

| Route | What it is |
|---|---|
| `/` | One-page site: hero, solutions, why solar, how it works, areas, quote form, careers band, FAQ |
| `/careers` | Open positions |
| `/careers/[slug]` | Job details + application form (Google for Jobs `JobPosting` structured data) |
| `/privacy` | POPIA privacy notice (draft: client to review) |

## How the forms work

There is no backend or database. The quote and job application forms build a WhatsApp message and open a chat with the
business number (set in `lib/site.ts`). The user presses send in WhatsApp, and job applicants attach their CV there.

## Editing content

- **Business details** (name, WhatsApp number, towns, taglines): `lib/site.ts`
- **Jobs**: `lib/jobs.ts`. Add an object to post a job. The page, sitemap and structured data update automatically.
  A job shows as closed (and drops out of Google for Jobs) after its `validThrough` date.
- **FAQ**: `lib/faq.ts`
- **Logo**: `components/logo.tsx` is a placeholder wordmark. Replace it with the client's vector logo.

## Develop

```bash
npm install
npm run dev
```

## Deploy

Import the repo in Vercel. Once a custom domain is connected, set `NEXT_PUBLIC_SITE_URL` (see `.env.example`).
Preview deployments are automatically blocked from indexing in `robots.txt`.
After launch: submit `/sitemap.xml` in Google Search Console and test the job page with Google's Rich Results Test.
