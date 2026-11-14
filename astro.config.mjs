import { defineConfig } from 'astro/config';

// En GitHub Pages el sitio vive en /urborn/; en Netlify o con dominio propio vive en la raíz.
// El workflow de Pages define SITE_URL y BASE_PATH. Sin ellas se compila para la raíz.
export default defineConfig({
  site: process.env.SITE_URL,
  base: process.env.BASE_PATH ?? '/',
});
