# URBORN

Sitio web estático de URBORN, marca de ropa (por ahora camisetas estampadas).

## Estructura

- `site/` — lo que se publica. HTML/CSS/JS e imágenes listas para web.
  - `site/assets/brand/` — logos en blanco con fondo transparente.
  - `site/assets/img/` — fotos recortadas (hero, banner, camiseta frente y espalda).
- `referencia/cliente/` — archivos originales que envió el cliente, incluido el diseño de la página (`mockup-web.jpg`). No se publican.
- `.github/workflows/pages.yml` — despliegue automático.

## Despliegue

Cada push a `main` publica la carpeta `site/` en GitHub Pages:
https://latooo.github.io/urborn/

Las rutas dentro del sitio son relativas, así que el mismo contenido sirve en Netlify
apuntando el directorio de publicación a `site`.

## Estado

Fase 0 lista: repositorio, archivos del cliente organizados y despliegue funcionando con una
página provisional. La construcción del sitio empieza al aprobar el plan.
