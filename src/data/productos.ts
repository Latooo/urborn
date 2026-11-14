import type { ImageMetadata } from 'astro';
import camisetaFrente from '../assets/img/camiseta-origin-frente.png';
import camisetaEspalda from '../assets/img/camiseta-origin-espalda.png';
import { redes } from './sitio';

export interface Producto {
  codigo: string;
  nombre: string;
  /** Precio en pesos colombianos, sin puntos ni símbolo. */
  precio: number;
  frente: ImageMetadata;
  espalda: ImageMetadata;
  tallas: string[];
  descripcion: string;
}

// PROVISIONAL: el cliente no ha confirmado tallas ni datos de la prenda.
const TALLAS_PROVISIONALES = ['S', 'M', 'L', 'XL'];
const DESCRIPCION =
  'Camiseta negra estampada de la colección The Origin. Al frente lleva un estampado pequeño en el pecho. ' +
  'En la espalda, el logo de URBORN, el cuervo y el lema «we were never made to fit in.».';

// Lista tal como viene en el diseño del cliente (incluido el salto de 001 a 003).
// Todas usan la misma imagen hasta que lleguen las fotos de cada referencia.
export const coleccion = {
  nombre: 'The Origin',
  productos: ['000', '001', '003', '004', '005', '006'].map(
    (codigo): Producto => ({
      codigo,
      nombre: `Camiseta ${codigo}`,
      precio: 90000,
      frente: camisetaFrente,
      espalda: camisetaEspalda,
      tallas: TALLAS_PROVISIONALES,
      descripcion: DESCRIPCION,
    }),
  ),
};

const pesos = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 });

export function formatoPrecio(valor: number): string {
  return `$${pesos.format(valor)}`;
}

/** Texto que llega escrito al chat de WhatsApp. La talla se agrega cuando la persona la elige. */
export function mensajePedido(producto: Producto, talla?: string, enlace?: string): string {
  const partes = [`Hola URBORN, quiero pedir la ${producto.nombre} (${coleccion.nombre})`];
  if (talla) partes.push(`talla ${talla}`);
  return partes.join(', ') + '.' + (enlace ? ` ${enlace}` : '');
}

export function enlaceWhatsapp(mensaje: string): string {
  return `${redes.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}
