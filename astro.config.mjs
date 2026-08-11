// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages: https://mattomadsen.github.io/folketsmedie-arkiv/
// Change base to '/' if using a custom domain at the root.
export default defineConfig({
  site: 'https://mattomadsen.github.io',
  base: '/folketsmedie-arkiv',
  trailingSlash: 'always',
});
