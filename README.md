# Steeple Lofts

Marketing site for Steeple Lofts, an apartment building at 3801 Spring Garden
St in University City, Philadelphia. Live at
[www.steepleapartments.com](https://www.steepleapartments.com). Built and
maintained by [Brandon Smith](https://www.brandons.sh) for Madison Parke.

## What it does

- Home with drone footage of the building, About, Gallery, Neighborhood.
- Availability: the AppFolio listing widget embedded in a same-origin iframe
  so its script stays isolated from the page.
- Contact: an inquiry form that emails leasing through
  [Resend](https://resend.com) and copies the sender.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Resend.
Hosted on Vercel; `main` deploys to production.

## Development

Requires Node 20.9 or newer.

```bash
cp .env.example .env.local   # then set RESEND_API_KEY
npm install
npm run dev                  # http://localhost:3000
```

Checks:

```bash
npm run lint
npm run build
```

## Environment

| Variable         | Purpose                                             |
| ---------------- | --------------------------------------------------- |
| `RESEND_API_KEY` | Sends the contact form. Without it the form returns 503. |

Set it in Vercel under Project Settings → Environment Variables (Production
and Preview).

## Contact form protection

`src/app/api/contact/route.ts` validates every field server-side (length caps,
email shape, ISO move-in date), escapes everything it puts in the email,
rate-limits to 5 submissions per IP per 15 minutes, and silently drops
submissions that fill the hidden honeypot field or arrive under two seconds
after the form was opened.

## Security headers, SEO

`next.config.ts` sets `X-Frame-Options`, `X-Content-Type-Options`,
`Referrer-Policy` and `Permissions-Policy` on every route. `robots.txt`,
`sitemap.xml` and the Open Graph image are generated from `src/app/`.
