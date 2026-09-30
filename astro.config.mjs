import { defineConfig } from 'astro/config';

export default defineConfig({
  // Set to the live domain at launch (used for canonical/OG URLs).
  site: 'https://example.com',
  compressHTML: true,
  build: { inlineStylesheets: 'always' },
  image: { responsiveStyles: false },
});
