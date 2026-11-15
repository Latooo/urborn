// Datos de la marca que se repiten en varias partes del sitio.
// Los textos de manifiesto, significado y universo son los que entregó el cliente, sin cambios.

export const marca = {
  nombre: 'URBORN',
  lema: 'we were never made to fit in.',
  categoria: 'Underground streetwear',
  descripcion: 'URBORN, underground streetwear. Camisetas estampadas de la colección The Origin.',
  concepto: 'La identidad de quienes no necesitan encajar para encontrar su lugar.',
};

export const redes = {
  whatsapp: 'https://wa.me/573138615047',
  instagram: 'https://www.instagram.com/urborn_',
  tiktok: 'https://www.tiktok.com/@urborndesign',
};

export const manifiesto = {
  titulo: 'We were never made to fit in.',
  puntos: [
    {
      titulo: 'We come from the concrete.',
      texto: 'From the streets, from the shadows, from everything that makes us different.',
    },
    { titulo: "We don't follow the noise.", texto: 'We observe. We adapt. We evolve.' },
    { titulo: 'We create our own identity.', texto: 'No permission. No expectations. No limits.' },
  ],
  cierre: 'Born different. Built underground.',
};

// URBORN = URBAN + BORN.
export const significado = [
  { palabra: 'Urban', texto: 'representa la ciudad, las calles, la arquitectura y la cultura underground.' },
  { palabra: 'Born', texto: 'representa el nacimiento, la transformación y la construcción de una identidad.' },
];

// The URBORN Universe: los capítulos de la marca, en orden. Solo el primero tiene colección publicada.
export const universo = [
  { nombre: 'Origin', texto: 'El nacimiento. De dónde venimos.', publicado: true },
  { nombre: 'Instinct', texto: 'La identidad. Quiénes somos.', publicado: false },
  { nombre: 'After Dark', texto: 'La cultura. Dónde pertenecemos.', publicado: false },
  { nombre: 'Evolution', texto: 'La transformación. Hacia dónde vamos.', publicado: false },
  { nombre: 'Unknown', texto: 'Lo que todavía no hemos descubierto.', publicado: false },
];

// Invitación a hacer parte de la marca (pedido del cliente). Es a donde lleva la R de la barra.
// El botón abre el WhatsApp de la marca con el mensaje ya escrito.
export const unete = {
  titulo: 'Haz parte de URBORN',
  texto: 'Si quieres ser modelo o vestir nuestra marca, escríbenos y te contamos cómo.',
  boton: 'Más información por WhatsApp',
  mensaje: 'Hola URBORN, quiero más información para hacer parte de la marca.',
};
