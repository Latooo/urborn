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
- `src/components/` — secciones del inicio: animación de entrada, barra superior, hero con la franja del lema, colección, figura (banner), manifiesto, significado del nombre, universo de colecciones y pie de página. `Tarjeta.astro` es la tarjeta de una camiseta y se usa en el inicio y en cada ficha.
- `src/data/sitio.ts` — lema, enlaces de redes y WhatsApp, y los textos de marca: manifiesto, significado (URBAN + BORN) y los capítulos del universo.
- `src/data/productos.ts` — lista de camisetas (nombre, precio, tallas, descripción, imágenes) y el texto del pedido. Agregar o cambiar productos se hace aquí.
- `src/lib/rutas.ts` — arma las rutas internas para que sirvan en Pages y en Netlify.
- `src/assets/` — logos y fotos. Astro genera las versiones optimizadas al compilar.
- `public/` — favicon.
- `referencia/cliente/` — archivos originales que envió el cliente, incluido el diseño de la página (`mockup-web.jpg`). No se publican.

## Marca

Sale de la guía que entregó el cliente. Los valores están en `src/styles/global.css`.

- Paleta: Black `#111214`, Asphalt `#292B2F`, Concrete `#777777`, Bone `#D6D2C9`. Blood `#641F29` queda reservado
  como acento para colecciones puntuales y hoy no se usa.
- Tipografía: Anton para titulares e Inter para texto (las dos se sirven desde el propio sitio, con Fontsource).
- Las camisetas van sobre Asphalt y Bone, no sobre Black: la prenda es negra y sobre el negro de marca se pierde.
- Logos e isotipo en Bone. Al banner se le subieron los negros al Black de marca para que se funda con la página.
- El manifiesto va en inglés, tal como lo entregó el cliente. El ícono de la i de la barra lleva a esa sección.
- En el universo solo Origin tiene colección publicada; los otros cuatro capítulos aparecen con el nombre atenuado.
- Pendiente de la guía: tipografía experimental, texturas (concreto, fotocopia, grano) y símbolos propios.

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
- El texto corrido va en el color pleno (Bone o Black); el gris se deja para precios y notas.

## Despliegue

Cada push a `main` compila y publica en GitHub Pages (`.github/workflows/pages.yml`).

El sitio usa rutas con base configurable: el workflow define `BASE_PATH=/urborn/` para Pages. Sin esa
variable se compila para la raíz, que es lo que necesita Netlify (comando `npm run build`, carpeta `dist`).

## Estado

- Fase 0, montaje: lista.
- Fase 1, inicio según el diseño del cliente: en revisión. La versión celular y el pie de página son propuesta,
  el diseño no los traía. El ícono de la R tiene destino provisional (sube al comienzo).
- Fase 2, página por camiseta y pedido por WhatsApp: en revisión. Las tallas (S, M, L, XL) y la descripción son
  provisionales hasta que el cliente confirme; están marcadas en `src/data/productos.ts`.
- Las fotos del hero, el banner y la camiseta se ampliaron al doble y se limpiaron con Real-ESRGAN a partir de lo
  que envió el cliente (los originales están en `referencia/cliente/`). Cuando lleguen los archivos en alta,
  se reemplazan en `src/assets/img/` con el mismo nombre.
- Identidad de marca (paleta, tipografías, manifiesto, significado y universo): aplicada, en revisión.
- Pendiente: contenido real y pulido (fase 3), Netlify y dominio (fase 4).
