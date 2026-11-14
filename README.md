# URBORN

Sitio web estático de URBORN, marca de ropa (por ahora camisetas estampadas). Hecho con Astro.

Versión de prueba: https://latooo.github.io/urborn/

## Cómo correrlo

Requiere Node 22.

```
npm install
npm run dev      # servidor local en http://localhost:4321
npm run build    # genera el sitio en dist/
npm run preview  # sirve dist/ para revisarlo
```

## Estructura

- `src/pages/index.astro` — el inicio.
- `src/components/` — secciones del inicio: barra superior, hero con la franja del lema, colección, banner y pie de página.
- `src/data/sitio.ts` — lema y enlaces de redes y WhatsApp.
- `src/data/productos.ts` — lista de camisetas (nombre, precio, imagen). Agregar o cambiar productos se hace aquí.
- `src/assets/` — logos y fotos. Astro genera las versiones optimizadas al compilar.
- `public/` — favicon.
- `referencia/cliente/` — archivos originales que envió el cliente, incluido el diseño de la página (`mockup-web.jpg`). No se publican.

## Despliegue

Cada push a `main` compila y publica en GitHub Pages (`.github/workflows/pages.yml`).

El sitio usa rutas con base configurable: el workflow define `BASE_PATH=/urborn/` para Pages. Sin esa
variable se compila para la raíz, que es lo que necesita Netlify (comando `npm run build`, carpeta `dist`).

## Estado

- Fase 0, montaje: lista.
- Fase 1, inicio según el diseño del cliente: en revisión. La versión celular y el pie de página son propuesta,
  el diseño no los traía. Los íconos de la R y la i tienen destino provisional.
- Pendiente: ficha por camiseta y pedido por WhatsApp (fase 2), contenido real y pulido (fase 3), Netlify y dominio (fase 4).
