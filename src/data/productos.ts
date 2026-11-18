import type { ImageMetadata } from 'astro';
import siluetaProximo from '../assets/img/prendas/proximo-drop.png';
import { redes } from './sitio';

export interface Producto {
  codigo: string;
  nombre: string;
  tipo: 'camiseta' | 'crop top';
  /** Precio en pesos colombianos, sin puntos ni símbolo. */
  precio: number;
  frente: ImageMetadata;
  espalda: ImageMetadata;
  tallas: string[];
  descripcion: string;
  /** Es la prenda que sale en la foto de campaña. */
  enCampana?: boolean;
}

// Las fotos se toman por nombre de archivo: src/assets/img/prendas/<código>-frente.png y <código>-espalda.png.
// Salen de los archivos del cliente con scripts de recorte; todas comparten lienzo y ancho de prenda.
const fotos = import.meta.glob<{ default: ImageMetadata }>('../assets/img/prendas/*.png', { eager: true });

function foto(codigo: string, lado: 'frente' | 'espalda'): ImageMetadata {
  const archivo = fotos[`../assets/img/prendas/${codigo}-${lado}.png`];
  if (!archivo) throw new Error(`Falta la foto ${codigo}-${lado}.png en src/assets/img/prendas/`);
  return archivo.default;
}

// PROVISIONAL: el cliente no ha confirmado nombres, precios ni tallas. Los códigos siguen el de la
// primera prenda, que lleva «urb.000» estampado; el precio es el del diseño inicial de la página.
const PRECIO_PROVISIONAL = 90000;
const TALLAS_PROVISIONALES = ['S', 'M', 'L', 'XL'];

// Las descripciones solo dicen lo que se ve estampado en cada prenda.
const prendas: Pick<Producto, 'codigo' | 'tipo' | 'descripcion' | 'enCampana'>[] = [
  {
    codigo: '000',
    tipo: 'camiseta',
    enCampana: true,
    descripcion:
      'Camiseta negra. Al frente lleva «urb.000 the origin, est. MMXXVI» en el pecho. ' +
      'En la espalda, el logo de URBORN con el lema «we were never made to fit in.», el cuervo y la frase «born from the unknown.».',
  },
  {
    codigo: '001',
    tipo: 'camiseta',
    descripcion:
      'Camiseta negra. Al frente, «A[R]T» en el pecho con el lema «we were never made to fit in.». ' +
      'En la espalda, la mirada del ave y la frase «Everything begins somewhere».',
  },
  {
    codigo: '002',
    tipo: 'crop top',
    descripcion:
      'Crop top negro. Al frente, el logo de URBORN con la frase «born from the unknown.». ' +
      'En la espalda, el cuervo y el lema «we were never made to fit in.».',
  },
  {
    codigo: '003',
    tipo: 'camiseta',
    descripcion:
      'Camiseta blanca. Al frente, «RBRN» en rojo con la frase «born from the unknown.». ' +
      'En la espalda, las alas negras con URBORN en rojo y el lema «we were never made to fit in.».',
  },
  {
    codigo: '004',
    tipo: 'crop top',
    descripcion:
      'Crop top blanco. Al frente, el logo de URBORN en rojo con la frase «born from the unknown.». ' +
      'En la espalda, las alas negras con URBORN en rojo y el lema «we were never made to fit in.».',
  },
];

const NOMBRE_TIPO = { camiseta: 'Camiseta', 'crop top': 'Crop top' } as const;

export const coleccion = {
  nombre: 'The Origin',
  productos: prendas.map(
    (prenda): Producto => ({
      ...prenda,
      nombre: `${NOMBRE_TIPO[prenda.tipo]} ${prenda.codigo}`,
      precio: PRECIO_PROVISIONAL,
      frente: foto(prenda.codigo, 'frente'),
      espalda: foto(prenda.codigo, 'espalda'),
      tallas: TALLAS_PROVISIONALES,
    }),
  ),
};

/** La tarjeta del siguiente drop: todavía no se muestra la prenda, solo la silueta con «???». */
export const proximoDrop = {
  titulo: 'Próximo drop',
  aviso: 'Próximamente',
  imagen: siluetaProximo,
};

export type ProximoDrop = typeof proximoDrop;

/**
 * El cliente pidió lanzar sin precios: mientras esté en false, en su lugar se ve «???» (ver Precio.astro)
 * y la portada no menciona precio. Para mostrarlos, cambiar a true.
 */
export const PRECIOS_VISIBLES = false;

const pesos = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 });

export function formatoPrecio(valor: number): string {
  return `$${pesos.format(valor)}`;
}

/** Texto que llega escrito al chat de WhatsApp. La talla se agrega cuando la persona la elige. */
export function mensajePedido(producto: Producto, talla?: string, enlace?: string): string {
  const articulo = producto.tipo === 'camiseta' ? 'la' : 'el';
  const partes = [`Hola URBORN, quiero pedir ${articulo} ${producto.nombre} (${coleccion.nombre})`];
  if (talla) partes.push(`talla ${talla}`);
  return partes.join(', ') + '.' + (enlace ? ` ${enlace}` : '');
}

export function enlaceWhatsapp(mensaje: string): string {
  return `${redes.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}
