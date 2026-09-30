# YDY Professional Construction — landing page (demo)

Static Astro site. Mobile-first, zero framework JS (one small enhancement script).

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # → dist/ (static, deploy anywhere)
```

## Structure

```
src/site/          ← everything YDY-specific
  config.ts        content, contact, lead settings, demo/production mode
  theme.css        colors + fonts (design tokens)
  assets/          images (auto-optimized to AVIF/WebP at build)
src/components/    brand-agnostic sections; read only from src/site
src/scripts/       dialog, lightbox, reveal, demo notices
mockup/            original visual direction
```

## Demo mode (current)

`site.mode = 'demo'` in `src/site/config.ts`:

- Estimate form opens and can be filled, but **nothing is sent or stored** — submit shows a demo notice.
- WhatsApp buttons show a notice instead of opening a chat.
- No phone/email links are rendered. Page is `noindex`.
- Gallery and hero images are marked **Concept image** until `verified: true`.

## Going live

1. Set `mode: 'production'`.
2. Fill `contact.whatsapp` / `contact.phone` / `contact.email` with verified values.
3. Set `lead.endpoint` to the form handler (Formspree, CRM webhook, …). The form POSTs multipart
   data: `name, phone, projectType, location, message, photos[]`.
4. Replace images in `src/site/assets/` with YDY's own project photos and set `verified: true`
   (optionally add `location`).
5. Set the live domain in `astro.config.mjs` (`site`) and `seo.url`.
