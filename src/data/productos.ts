import type { ImageMetadata } from 'astro';
import camisetaFrente from '../assets/img/camiseta-origin-frente.png';

export interface Producto {
  codigo: string;
  nombre: string;
  /** Precio en pesos colombianos, sin puntos ni símbolo. */
  precio: number;
  imagen: ImageMetadata;
}

// Lista tal como viene en el diseño del cliente (incluido el salto de 001 a 003).
// Todas usan la misma imagen hasta que lleguen las fotos de cada referencia.
export const coleccion = {
  nombre: 'The Origin',
  productos: ['000', '001', '003', '004', '005', '006'].map(
    (codigo): Producto => ({
      codigo,
      nombre: `Camiseta ${codigo}`,
      precio: 90000,
      imagen: camisetaFrente,
    }),
  ),
};

const pesos = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 });

export function formatoPrecio(valor: number): string {
  return `$${pesos.format(valor)}`;
}
