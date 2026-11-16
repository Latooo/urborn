# URBORN

Sitio web estático de URBORN, marca de ropa (por ahora camisetas y crop tops estampados). Hecho con Astro.

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

- `src/pages/index.astro` — el inicio: portada, colección, banner de la figura y la frase de la marca con el paso al manifiesto.
- `src/pages/marca.astro` — la página de la marca (`/marca/`): manifiesto, significado del nombre, universo de colecciones y la invitación a hacer parte de la marca (`#unete`). Se llega por la i de la barra y por el botón "Leer el manifiesto" del inicio; la R de la barra lleva directo a la invitación.
- `src/pages/prenda/[codigo].astro` — la página de cada prenda (`/prenda/000/`...): frente y espalda, precio, tallas y botón de pedido por WhatsApp con el mensaje ya escrito; debajo, las demás prendas. La foto de campaña solo sale en la prenda que aparece en ella.
- `src/components/` — las secciones. Del inicio: animación de entrada, hero con la franja del lema, colección, figura (banner) y cierre con la frase. De la página de marca: manifiesto, significado, universo e invitación (`Unete.astro`). Compartidos: barra superior, pie de página, `Tarjeta.astro` (la tarjeta de una prenda y la del próximo drop) y `Campana.astro` (la foto de campaña, en la ficha y junto a la invitación).
- `src/data/sitio.ts` — lema, enlaces de redes y WhatsApp, y los textos de marca: manifiesto, significado (URBAN + BORN), los capítulos del universo y la invitación (con el mensaje que llega escrito a WhatsApp).
- `src/lib/iconos.ts` — trazos de íconos que se usan en más de un sitio.
- `src/components/FotoPrenda.astro` — foto de una prenda: sale en AVIF (guarda el color a resolución completa, así el rojo
  de los estampados queda nítido) con WebP de respaldo. El `sizes` de cada uso debe cubrir el ancho real de la prenda:
  si se queda corto, el navegador amplía una imagen más pequeña y se ve borrosa.
- `src/data/productos.ts` — lista de prendas (tipo, tono, precio, tallas, descripción), la tarjeta del próximo drop y el texto del pedido. Agregar o cambiar productos se hace aquí.
- `src/assets/img/prendas/` — frente y espalda de cada prenda (`<código>-frente.png`, `<código>-espalda.png`), recortadas de los archivos del cliente y todas en el mismo lienzo, más la silueta del próximo drop.
  Los mockups del cliente vienen calcados (vectorizados): contorno ondulado y tela con manchas planas. Al recortarlos
  se suaviza el contorno y el sombreado de la tela, sin tocar los estampados (se comprobó que no cambian). Para agregar una prenda: sus dos imágenes aquí y una entrada en `productos.ts`.
- `src/lib/rutas.ts` — arma las rutas internas para que sirvan en Pages y en Netlify.
- `src/assets/` — logos y fotos. Astro genera las versiones optimizadas al compilar.
- `public/` — favicon.
- `referencia/cliente/` — archivos originales que envió el cliente, incluido el diseño de la página (`mockup-web.jpg`). No se publican.

## Marca

Sale de la guía que entregó el cliente. Los valores están en `src/styles/global.css`.

- Paleta: Black `#111214`, Asphalt `#292B2F`, Concrete `#777777`, Bone `#D6D2C9`. Blood `#641F29` queda reservado
  como acento para colecciones puntuales y hoy no se usa.
- Tipografía: Anton para titulares e Inter para texto (las dos se sirven desde el propio sitio, con Fontsource).
- Todas las prendas van sobre Bone, en la colección y en la ficha, como en la tienda de referencia (Mattelsa):
  la colección es un solo campo de color. En la ficha, la prenda va sobre Bone y los datos sobre Asphalt.
- El próximo drop es una tarjeta más de la colección: la silueta con «???» y el aviso «Próximamente». No lleva a ninguna página.
- Logos e isotipo en Bone. Al banner se le subieron los negros al Black de marca para que se funda con la página.
- El manifiesto va en inglés, tal como lo entregó el cliente.
- El inicio solo muestra la frase del manifiesto; el texto completo de marca vive en `/marca/` para no cargar el inicio de texto. El ícono de la i de la barra lleva a esa página.
- En el universo solo Origin tiene colección publicada, por eso muestra su camiseta y el enlace; los otros cuatro capítulos aparecen con el nombre atenuado.
- Pendiente de la guía: tipografía experimental, texturas (concreto, fotocopia, grano) y símbolos propios.

## Animaciones

Todo es CSS, sin librerías. El único JavaScript es el que decide qué aparece al hacer scroll y el que pone la talla en el enlace de WhatsApp.

- Entrada con el logo (`Intro.astro`): solo en el inicio y una vez por visita. Dura cerca de 1 s, para que el titular se lea antes de 1,2 s.
- Apariciones al hacer scroll: se marca con `data-revelar` lo que debe entrar animado.
- Movimiento ligado al scroll en el hero y el banner: solo en navegadores que lo soportan; en los demás queda quieto.
- Al entrar a una prenda, la imagen viaja de una página a la otra (transiciones de vista del navegador). Lo mismo hace la frase del inicio al abrir el manifiesto.
- Con "reducir movimiento" activado en el sistema no se anima nada.

## Revisión de diseño

El sitio se revisó con la skill tasteskill (linter de código e inspector en navegador a 1440, 768 y 390 px).
El inicio, la ficha y la página de marca pasan sin fallos. Cambios que salieron de esa revisión y se apartan un poco del diseño del cliente:

- Frase de apoyo y botón "Ver la colección" en la portada (`Hero.astro`).
- La barra superior usa un color plano en vez del degradado suave del diseño, y comparte márgenes con el contenido.
- La escala de texto se redujo a cuatro tamaños más el titular (`--t-*` en `src/styles/global.css`).
- El texto corrido va en el color pleno (Bone o Black); el gris se deja para precios y notas.
- La frase del cierre del inicio va sobre Bone, para que el final no sea un tramo largo de negro.

## Despliegue

Cada push a `main` compila y publica en GitHub Pages (`.github/workflows/pages.yml`).

El sitio usa rutas con base configurable: el workflow define `BASE_PATH=/urborn/` para Pages. Sin esa
variable se compila para la raíz, que es lo que necesita Netlify (comando `npm run build`, carpeta `dist`).

## Estado

- Fase 0, montaje: lista.
- Fase 1, inicio según el diseño del cliente: en revisión. La versión celular y el pie de página son propuesta,
  el diseño no los traía. El ícono de la R lleva a la invitación a hacer parte de la marca (`/marca/#unete`), que pidió el cliente; su botón abre WhatsApp.
- Fase 2, página por prenda y pedido por WhatsApp: en revisión. La colección ya tiene las cinco prendas reales del cliente
  (tres camisetas y dos crop tops) y la tarjeta del próximo drop. Nombres, códigos (salvo el 000, que viene estampado),
  precio ($90.000 para todas) y tallas (S, M, L, XL) son provisionales hasta que el cliente confirme; están marcados en `src/data/productos.ts`.
- Las fotos del hero y el banner se ampliaron al doble y se limpiaron con Real-ESRGAN a partir de lo
  que envió el cliente (los originales están en `referencia/cliente/`). Cuando lleguen los archivos en alta,
  se reemplazan en `src/assets/img/` con el mismo nombre. Las prendas ya salen de archivos en alta (8000 px);
  esos originales no se guardan en el repositorio porque es público y son los artes de estampado.
- Identidad de marca (paleta, tipografías y página de marca con manifiesto, significado y universo): aplicada, en revisión.
  La página de marca repite las fotos que hay (banner, campaña y camiseta) hasta que lleguen más.
- Pendiente: contenido real y pulido (fase 3), Netlify y dominio (fase 4).
