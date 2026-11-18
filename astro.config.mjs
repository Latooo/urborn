import { defineConfig } from 'astro/config';

// En GitHub Pages el sitio vive en /urborn/; en Netlify o con dominio propio vive en la raíz.
// El workflow de Pages define SITE_URL y BASE_PATH. Sin ellas se compila para la raíz.
// En Netlify la dirección sale sola de URL, que Netlify define al compilar (también si luego hay dominio propio).
export default defineConfig({
  site: process.env.SITE_URL ?? process.env.URL,
  base: process.env.BASE_PATH ?? '/',
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      // AVIF con menos esfuerzo de compresión: casi el mismo peso y la compilación tarda cinco veces menos.
      config: { avif: { effort: 2 } },
    },
  },
});
