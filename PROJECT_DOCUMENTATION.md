# Maharishi Center for Leadership

## About

Public marketing website for the Maharishi Center for Leadership executive development programme. It presents the programme, benefits, science, testimonials, blogs, and consultation/contact options.

## Project details

- **Year:** 2026
- **Live site:** https://www.maharishileadershipcenter.com/
- **Repository:** https://github.com/maharishileadership-bit/Maharishi
- **Primary email:** maharishileadership@gmail.com
- **Client phone:** 19142824874
- **Project document / submissions sheet:** [Google Sheet](https://docs.google.com/spreadsheets/d/1BgTkTDM3JMbteYMRlVOl58ekXv4rLZ6i_-VuhDiYweQ/edit)

## Installation and run

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Production check:

```bash
npm run build
npm run start
```

Useful command:

```bash
npm run lint
```

## Features and platforms

- Responsive landing page with programme, benefits, science, heritage, and testimonial sections.
- Blog listing and dynamic blog detail pages.
- Contact/inquiry form at `POST /api/contact-inquiry`.
- Calendly 30-minute consultation booking.
- SheetDB stores form submissions when configured.
- SMTP sends internal notifications and an automatic acknowledgement email.
- Rate limiting and honeypot protection reduce contact-form abuse.

## Tech stack

- Next.js 16.2.4 with App Router
- React 19.2.4 and TypeScript
- Tailwind CSS 4
- Framer Motion, Swiper, Lenis, and Lucide React
- Nodemailer for SMTP email
- SheetDB for optional form storage

## Project architecture

```text
app/
  page.tsx                 Home page
  contact/page.tsx         Contact page
  blog/page.tsx            Blog index
  blog/[slug]/page.tsx     Blog detail pages
  api/contact-inquiry/     Contact form server route
  components/              Reusable sections and page components
  lib/                     Site, blog, and Calendly helpers
data/                      Navigation, contact, benefits, and blog data
public/                    Images, logos, icons, and static assets
```

Most content is code/data driven; there is no application database in the repository.

## Environment details

Create `.env.local` locally or configure the same variables in Vercel. Never commit real secrets.

```env
NEXT_PUBLIC_SITE_URL=https://www.maharishileadershipcenter.com
SHEETDB_API_URL=https://sheetdb.io/api/v1/<sheetdb-id>
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=<smtp-account-email>
SMTP_APP_PASSWORD=<gmail-app-password>
CONTACT_NOTIFY_TO=<notification-email>
```

`SHEETDB_API_URL` and SMTP variables are optional individually, but at least one contact-service integration must be configured for submissions to succeed. The current route also has fixed notification recipients in code; update those recipients in `app/api/contact-inquiry/route.ts` if ownership changes.

## Database / data storage

There is no traditional database. Contact submissions can be stored in SheetDB, backed by the connected Google Sheet. Static site and blog content live in `data/` and component files.

## Hosting and domain

- **Hosting:** Vercel
- **Domain:** GoDaddy, with delegate access
- **Domain:** `maharishileadershipcenter.com`
- Configure the production environment variables in Vercel and connect the GitHub repository for deployments.

## Account access

Account ownership and passwords are managed manually by the project owner. Do not store passwords in this document or the repository.

- GitHub/deployment email: `maharishileadership@gmail.com`
- Delegate/access email: `rishabh@arevei.com`
- Domain provider: GoDaddy
- Hosting provider: Vercel

Before handover, verify GitHub, Vercel, GoDaddy, Google Sheet/SheetDB, Gmail SMTP app password, Calendly, and analytics access as applicable.

## Project initialisation

The project was initialised as a Next.js App Router application and extended with reusable sections, static content data, optimized public assets, blog routes, Calendly integration, and the contact inquiry API.
