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
- `src/pages/camiseta/[codigo].astro` — la página de cada camiseta (`/camiseta/000/`...): frente y espalda, precio, tallas y botón de pedido por WhatsApp con el mensaje ya escrito; debajo, la foto de campaña y las demás camisetas.
- `src/components/` — secciones del inicio: animación de entrada, barra superior, hero con la franja del lema, colección, banner y pie de página. `Tarjeta.astro` es la tarjeta de una camiseta y se usa en el inicio y en cada ficha.
- `src/data/sitio.ts` — lema y enlaces de redes y WhatsApp.
- `src/data/productos.ts` — lista de camisetas (nombre, precio, tallas, descripción, imágenes) y el texto del pedido. Agregar o cambiar productos se hace aquí.
- `src/lib/rutas.ts` — arma las rutas internas para que sirvan en Pages y en Netlify.
- `src/assets/` — logos y fotos. Astro genera las versiones optimizadas al compilar.
- `public/` — favicon.
- `referencia/cliente/` — archivos originales que envió el cliente, incluido el diseño de la página (`mockup-web.jpg`). No se publican.

## Animaciones

Todo es CSS, sin librerías. El único JavaScript es el que decide qué aparece al hacer scroll y el que pone la talla en el enlace de WhatsApp.

- Entrada con el logo (`Intro.astro`): solo en el inicio y una vez por visita. Dura cerca de 1 s, para que el titular se lea antes de 1,2 s.
- Apariciones al hacer scroll: se marca con `data-revelar` lo que debe entrar animado.
- Movimiento ligado al scroll en el hero y el banner: solo en navegadores que lo soportan; en los demás queda quieto.
- Al entrar a una camiseta, la prenda viaja de una página a la otra (transiciones de vista del navegador).
- Con "reducir movimiento" activado en el sistema no se anima nada.

## Revisión de diseño

El sitio se revisó con la skill tasteskill (linter de código e inspector en navegador a 1440, 768 y 390 px).
El inicio y la ficha pasan sin fallos. Cambios que salieron de esa revisión y se apartan un poco del diseño del cliente:

- Frase de apoyo y botón "Ver la colección" en la portada (`Hero.astro`).
- La barra superior usa un color plano en vez del degradado suave del diseño, y comparte márgenes con el contenido.
- La escala de texto se redujo a cuatro tamaños más el titular (`--t-*` en `src/styles/global.css`).

## Despliegue

Cada push a `main` compila y publica en GitHub Pages (`.github/workflows/pages.yml`).

El sitio usa rutas con base configurable: el workflow define `BASE_PATH=/urborn/` para Pages. Sin esa
variable se compila para la raíz, que es lo que necesita Netlify (comando `npm run build`, carpeta `dist`).

## Estado

- Fase 0, montaje: lista.
- Fase 1, inicio según el diseño del cliente: en revisión. La versión celular y el pie de página son propuesta,
  el diseño no los traía. Los íconos de la R y la i tienen destino provisional.
- Fase 2, página por camiseta y pedido por WhatsApp: en revisión. Las tallas (S, M, L, XL) y la descripción son
  provisionales hasta que el cliente confirme; están marcadas en `src/data/productos.ts`.
- Las fotos del hero, el banner y la camiseta se ampliaron al doble y se limpiaron con Real-ESRGAN a partir de lo
  que envió el cliente (los originales están en `referencia/cliente/`). Cuando lleguen los archivos en alta,
  se reemplazan en `src/assets/img/` con el mismo nombre.
- Pendiente: contenido real y pulido (fase 3), Netlify y dominio (fase 4).
