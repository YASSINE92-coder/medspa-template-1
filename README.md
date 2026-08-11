# medspa-template-1

Med-spa website template #1 for **MedSpa Scale** (EPIC-WEB-001).
Fictional demo spa: **Lumen Skin Studio**, Austin TX.

## Stack
Next.js (App Router) · TypeScript · Tailwind v4 · motion (Framer Motion) · Embla · Vercel

## The content-schema pattern
All business content lives in one typed file: [`src/content.ts`](src/content.ts).
Components never hardcode business text. Swap the spa's name + phone there and
they update across the whole site.

## Run locally
```bash
npm install
npm run dev
```

## Verify
```bash
npx tsc --noEmit && npm run lint && npm run build
```

## New client site from this template
(Full guide lands with v1 — target: under 10 minutes.)
1. Duplicate the repo
2. Fill `src/content.ts` with the client's content
3. Replace images in `/public/images`
4. Adjust tokens in `src/app/globals.css` if the client wants another palette
5. Deploy to Vercel
